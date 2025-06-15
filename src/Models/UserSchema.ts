import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for the User document
interface IUser extends Document {
    fullName: string;
    email: string;
    password: string;
    isVerified: boolean;
    verificationCode: string;
    verificationCodeExpiry: Date;
    forgetPasswordCode: string;
    forgetPasswordCodeExpiry: Date;
    role: string
}

const userSchema: Schema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationCode: String,
    verificationCodeExpiry: Date,
    forgetPasswordCode: String,
    forgetPasswordCodeExpiry: Date,
    role: {
        type: String,
        default: 'user',
    }
}, { timestamps: true });

// Define the model type explicitly for TypeScript
type UserModelType = Model<IUser>;

// Create the User model
const UserModel: UserModelType = (mongoose.models.User as UserModelType) || mongoose.model<IUser>('User', userSchema);

export default UserModel;