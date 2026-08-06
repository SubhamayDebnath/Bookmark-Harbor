export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
}
export interface AuthResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface ApiResponse {
  success: boolean;
  message: string;
}
