import { Schema } from 'mongoose';

export interface StrikeInterface {
    user: string;
    symbol: string;
    expiry: string;
    strike: number;
    sentiment: string;
    note: string;
    dateCreated: number;
    dateUpdated: number;
}

export const StrikeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    symbol: String,
    expiry: String,
    strike: Number,
    sentiment: String,
    note: String,
    dateCreated: Number,
    dateUpdated: Number,
});
