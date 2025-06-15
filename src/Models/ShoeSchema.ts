import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IShoe extends Document {
    name: string;
    brand: string;
    sizes: string[];
    price: number;
    stock: number;
    description?: string;
    images: string[];
    imageFileIds: string[];
    category: string;
    style: string;
}

const ShoeSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        brand: { type: String, required: true },
        sizes: { type: [String], required: true },
        price: { type: Number, required: true },
        stock: { type: Number, required: true },
        description: { type: String },
        images: { type: [String], required: true },
        imageFileIds: { type: [String], required: true },
        category: { type: String, required: true },
        style: {type: String, required: true}
    },
    {
        timestamps: true,
    }
);

type ShoeModelType = Model<IShoe>;

const ShoeModel: ShoeModelType = (mongoose.models.Shoe as ShoeModelType) || mongoose.model<IShoe>('Shoe', ShoeSchema);

export default ShoeModel;