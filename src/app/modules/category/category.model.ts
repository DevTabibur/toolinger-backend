import { Schema, model } from 'mongoose';
import { ICategory } from './category.interface';

const categorySchema = new Schema<ICategory>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
          },
        manufacture: {
            type: String,
            required: true,
        },
        carModel: {
            type: String,
        },
        year: {
            type: String
        },
        skills: {
            type: String,
        },
        experience: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const CategoryModel = model<ICategory>('Category', categorySchema);
export default CategoryModel;
