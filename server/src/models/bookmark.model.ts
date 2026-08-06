import { Schema, model, type Document } from 'mongoose';
import type { IBookmark } from '@/types/bookmark.types.js';

export interface BookmarkDocument extends IBookmark, Document {}

const bookmarkSchema = new Schema<BookmarkDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    url: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

bookmarkSchema.index({ user: 1, url: 1 });

bookmarkSchema.index({
  user: 1,
  'tags.name': 1,
});

const Bookmark = model<BookmarkDocument>('Bookmark', bookmarkSchema);

export default Bookmark;
