import { Types } from 'mongoose';

export interface IBookmark {
  user: Types.ObjectId;
  title: string;
  url: string;
  createdAt?: Date;
  updatedAt?: Date;
}
