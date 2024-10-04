import { model, Schema } from "mongoose";
import { TCategory } from "./category.interface";

const CategorySchema = new Schema<TCategory>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        file: {
            type: String,
            default: "https://i.ibb.co.com/98Z7g63/application.png",
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const CategoryModel = model<TCategory>("Category", CategorySchema);

