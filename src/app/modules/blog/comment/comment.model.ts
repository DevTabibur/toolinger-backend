import { model, Schema, Types } from "mongoose";
import { IComment } from "./comment.interface";
import { COMMENT_STATUS } from "./comment.constant";

const CommentSchema = new Schema<IComment>(
  {
    blogPost: {
      type: Schema.Types.ObjectId,
      ref: "BlogPost",
      required: true,
    },
    author: {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true, // Optional for guest comments
      },
      // name: {
      //   type: String,
      //   required: true,
      //   trim: true,
      // },
      // email: {
      //   type: String,
      //   required: true,
      //   lowercase: true,
      //   trim: true,
      // },
      // website: {
      //   type: String,
      //   trim: true,
      // },
    },
    content: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    status: {
      type: String,
      enum: [...COMMENT_STATUS],
      default: "pending",
      required: true,
    },
    parentComment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
      index: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
    editedAt: {
      type: Date,
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const CommentModel = model<IComment>("Comment", CommentSchema);
export default CommentModel;
