import { Schema } from 'mongoose';

export interface SpreadChatInterface {
    user: string;
    spread: string;
    message: string;
    dateCreated: number;
    dateUpdated: number;
}

export const SpreadChatSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    spread: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    message: String,
    dateCreated: Number,
    dateUpdated: Number,
});
