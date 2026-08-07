import crypto from 'node:crypto';
import type { Context } from 'hono';
import { setCookie, deleteCookie } from 'hono/cookie';
import User from '@/models/user.model.js';
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
} from '@/validators/auth.validator.js';
import { comparePassword, hashPassword } from '@/utils/password.js';
import { generateToken } from '@/utils/jwt.js';
import { sendEmail } from '@/utils/send-email.js';
import { forgotPasswordTemplate } from '@/utils/email-template.js';

export const registerUser = async (c: Context) => {
  try {
    const body = await c.req.json();
    const result = registerSchema.safeParse(body);
    if (!result.success) {
      return c.json(
        {
          success: false,
          message: result.error.issues[0]?.message ?? 'Invalid data.',
        },
        400
      );
    }
    const { name, email, password } = result.data;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return c.json({ success: false, message: 'Email already exists.' }, 409);
    }
    const hashedPassword = await hashPassword(password);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = generateToken({
      userId: user._id.toString(),
      role: user.role,
    });
    setCookie(c, 'token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
    return c.json(
      {
        success: true,
        message: 'User registered successfully.',
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      201
    );
  } catch (error) {
    console.error('Error occurred while creating new user:', error);
    return c.json({ success: false, message: 'Something went wrong.' }, 500);
  }
};

export const loginUser = async (c: Context) => {
  try {
    const body = await c.req.json();
    const result = loginSchema.safeParse(body);
    if (!result.success) {
      return c.json(
        {
          success: false,
          message: result.error.issues[0]?.message ?? 'Invalid data.',
        },
        400
      );
    }
    const { email, password } = result.data;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return c.json(
        { success: false, message: 'Invalid email or password.' },
        401
      );
    }
    const isPasswordMatched = await comparePassword(password, user.password);
    if (!isPasswordMatched) {
      return c.json(
        { success: false, message: 'Invalid email or password.' },
        401
      );
    }
    user.lastLoginAt = new Date();
    await user.save();
    const token = generateToken({
      userId: user._id.toString(),
      role: user.role,
    });
    setCookie(c, 'token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
    return c.json({
      success: true,
      message: 'Login successful.',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error occurred while logging in user:', error);
    return c.json({ success: false, message: 'Something went wrong.' }, 500);
  }
};

export const logoutUser = async (c: Context) => {
  try {
    deleteCookie(c, 'token', { path: '/' });
    return c.json({ success: true, message: 'Logout successful.' });
  } catch (error) {
    console.error('Error occurred while logging out user:', error);
    return c.json({ success: false, message: 'Something went wrong.' }, 500);
  }
};

export const getUser = async (c: Context) => {
  try {
    const authUser = c.get('user');
    const user = await User.findById(authUser._id).select(
      '-password -passwordResetToken -passwordResetExpires'
    );
    if (!user) {
      return c.json({ success: false, message: 'User not found.' }, 404);
    }
    return c.json({
      success: true,
      message: 'User profile fetched successfully.',
      data: user,
    });
  } catch (error) {
    console.error('Error occurred while fetching user:', error);
    return c.json({ success: false, message: 'Something went wrong.' }, 500);
  }
};

export const forgotPassword = async (c: Context) => {
  try {
    const body = await c.req.json();
    const result = forgotPasswordSchema.safeParse(body);
    if (!result.success) {
      return c.json(
        {
          success: false,
          message: result.error.issues[0]?.message ?? 'Invalid data.',
        },
        400
      );
    }
    const { email } = result.data;
    const user = await User.findOne({ email }).select(
      '+passwordResetToken +passwordResetExpires'
    );
    if (!user) {
      return c.json({
        success: true,
        message:
          'If an account exists with this email, a password reset link has been sent.',
      });
    }
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();
    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
    await sendEmail({
      to: user.email,
      subject: 'Reset Your Password',
      html: forgotPasswordTemplate(user.name, resetUrl),
    });

    return c.json({
      success: true,
      message: 'Password reset link sent successfully.',
    });
  } catch (error) {
    console.error('Error occurred while processing forgot password:', error);
    return c.json({ success: false, message: 'Something went wrong.' }, 500);
  }
};

export const resetPassword = async (c: Context) => {
  try {
    const body = await c.req.json();
    const result = resetPasswordSchema.safeParse(body);
    if (!result.success) {
      return c.json(
        {
          success: false,
          message: result.error.issues[0]?.message ?? 'Invalid data.',
        },
        400
      );
    }

    const { token, password } = result.data;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: new Date() },
    }).select('+password +passwordResetToken +passwordResetExpires');

    if (!user) {
      return c.json(
        { success: false, message: 'Invalid or expired reset token.' },
        400
      );
    }
    user.password = await hashPassword(password);
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await user.save();
    return c.json({
      success: true,
      message: 'Password reset successfully.',
    });
  } catch (error) {
    console.error('Error occurred while resetting password:', error);
    return c.json({ success: false, message: 'Something went wrong.' }, 500);
  }
};

export const changePassword = async (c: Context) => {
  try {
    const authUser = c.get('user');
    const body = await c.req.json();
    const result = changePasswordSchema.safeParse(body);
    if (!result.success) {
      return c.json(
        {
          success: false,
          message: result.error.issues[0]?.message ?? 'Invalid data.',
        },
        400
      );
    }
    const { currentPassword, newPassword } = result.data;
    const user = await User.findById(authUser.userId).select('+password');
    if (!user) {
      return c.json({ success: false, message: 'User not found.' }, 404);
    }
    const isPasswordMatched = await comparePassword(
      currentPassword,
      user.password
    );
    if (!isPasswordMatched) {
      return c.json(
        { success: false, message: 'Current password is incorrect.' },
        400
      );
    }
    user.password = await hashPassword(newPassword);
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await user.save();
    return c.json({
      success: true,
      message: 'Password changed successfully.',
    });
  } catch (error) {
    console.error('Error occurred while changing password:', error);
    return c.json({ success: false, message: 'Something went wrong.' }, 500);
  }
};
