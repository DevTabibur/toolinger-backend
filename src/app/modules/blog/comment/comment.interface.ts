import { Types } from "mongoose";

export enum CommentStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  SPAM = "spam",
}

export interface IComment {
  blogPost: Types.ObjectId | string;
  author: {
    user?: Types.ObjectId; // If logged in user
    // name: string; // Guest name or user name
    // email: string;
    // website?: string;
    // id?: Types.ObjectId;
  };
  content: string;
  status: string; // "pending" | "approved" | "rejected" | "spam"
  parentComment?: Types.ObjectId; // For nested replies
  likes: number;
  dislikes: number;
  isEdited: boolean;
  editedAt?: Date;
  ipAddress?: string;
  userAgent?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CommentFilters = {
  searchTerm?: string;
  status?: CommentStatus;
  blogPost?: string;
};
