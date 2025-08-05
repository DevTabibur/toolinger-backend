import { Document, Types } from "mongoose";

export interface ICategory extends Document {
  userId: Types.ObjectId; // Reference to the User model
  manufacture: string; // Selected manufacture (e.g., Toyota, Honda)
  carModel?: string; // Renamed from 'model' to avoid conflicts
  year?: string;
  // for mechanic
  skills?: string; // Skills (e.g., 'Mechanics, Diagnostics')
  experience?: string; // Experience in years (e.g., '5 years')
}
