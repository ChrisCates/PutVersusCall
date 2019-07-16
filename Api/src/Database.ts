import * as Mongoose from 'mongoose';
import { mongoUrl } from './Config';

import { UserInterface, UserSchema } from './schema/User.schema';
import { StrikeInterface, StrikeSchema } from './schema/Strike.schema';
import { ChatInterface, ChatSchema } from './schema/Chat.schema';
import { SpreadInterface, SpreadSchema } from './schema/Spread.schema';
import { SpreadChatInterface, SpreadChatSchema } from './schema/Spread.chat.schema';

console.log(`Mongo URL ${mongoUrl}\n`.green.bold);
Mongoose.connect(mongoUrl, { useNewUrlParser: true });

export const User = Mongoose.model('User', UserSchema);
export const Strike = Mongoose.model('Strike', StrikeSchema);
export const Chat = Mongoose.model('Chat', ChatSchema);
export const Spread = Mongoose.model('Spread', SpreadSchema);
export const SpreadChat = Mongoose.model('SpreadChat', SpreadChatSchema);

export {
    UserInterface,
    StrikeInterface,
    ChatInterface,
    SpreadInterface,
    SpreadChatInterface,
};
