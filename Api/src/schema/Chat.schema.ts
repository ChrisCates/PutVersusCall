import { Schema } from 'mongoose';

export interface ChatInterface {
    user: string;
    symbol: string;
    sentiment: string;
    strategy: string;
    expiry: string;
    message: string;
    dateCreated: number;
    dateUpdated: number;
}

export const ChatSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    symbol: String,
    sentiment: String,
    strategy: String,
    expiry: String,
    message: String,
    dateCreated: Number,
    dateUpdated: Number,
});
