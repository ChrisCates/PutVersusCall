import { Schema } from 'mongoose';

export interface SpreadInterface {
    user: string;
    symbol: string;
    expiry: string;
    title: string;
    description: string;
    data: object;
    dateCreated: number;
    dateUpdated: number;
}

export const SpreadSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    symbol: String,
    expiry: String,
    title: String,
    description: String,
    data: Object,
    dateCreated: Number,
    dateUpdated: Number,
});
