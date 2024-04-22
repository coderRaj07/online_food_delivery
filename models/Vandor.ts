import mongoose, { Schema, Document, Model, Types } from 'mongoose';

interface VandorDoc extends Document {

    name: string;
    ownerName: string;
    foodType: [string];
    pincode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
    salt: string;
    serviceAvailable: boolean;
    coverImage: [string];
    rating: number;
    // foods: any

}

const VandorSchema: Schema = new Schema<VandorDoc>({
    name: { type: String, required: true },
    ownerName: { type: String, required: true },
    foodType: { type: [String] },
    pincode: { type: String, required: true },
    address: { type: String },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    serviceAvailable: { type: Boolean, required: true },
    coverImage: { type: [String] },
    rating: { type: Number },
    // foods: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Food' }]
}, {
    toJSON: {
        transform: function (doc, ret) {
            delete ret.password;
            delete ret.salt;
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    },
    timestamps: true
});

export const Vandor = mongoose.model<VandorDoc>('Vandor', VandorSchema);