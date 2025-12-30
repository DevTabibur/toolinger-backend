import { Types } from "mongoose";

export enum TagStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  BLOCKED = "blocked",
  PENDING = "pending",
  REJECTED = "rejected",
}
export interface ITag {
  name: string;
  slug: string;
  status: TagStatus;
  createdBy?: Types.ObjectId | null;
  isSystem: boolean;
  description?: string;
}
