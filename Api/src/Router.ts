import { upload } from './Config';
import { RouteCollection, LoggedIn } from './service/Route.service';

// Server Routes
import {
    ServerInfo,
    Session,
    Logout,
} from './route/Server.route';

export const ServerRoutes = [
    { type: 'GET', path: '/', component: ServerInfo },
    { type: 'GET', path: '/session', component: Session },
    { type: 'GET', path: '/logout', component: Logout },
];

// User Routes
import {
    UserRegister,
    UserLogin,
    UserUpdate,
    UsernameAvailable,
    EmailAvailable,
    UserPassword,
} from './route/User.route';

export const UserRoutes = [
    { type: 'POST', path: '/register', component: UserRegister },
    { type: 'POST', path: '/login', component: UserLogin },
    { type: 'POST', path: '/user', component: UserUpdate, middleware: upload.single('photo') },
    { type: 'POST', path: '/user/password', component: UserPassword },
    { type: 'GET', path: '/username', component: UsernameAvailable },
    { type: 'GET', path: '/email', component: EmailAvailable },
];

// Tradier Routes
import {
    GetQuote,
    GetOptions,
} from './route/Tradier.route';

export const TradierRoutes = [
    { type: 'GET', path: '/tradier/quote', component: GetQuote },
    { type: 'GET', path: '/tradier/options', component: GetOptions },
];

// Chat Routes
import {
    CreateChat,
    GetChat,
    DeleteChat,
    UpdateChat,
} from './route/Chat.route';

export const ChatRoutes = [
    { type: 'GET', path: '/chat', component: GetChat },
    { type: 'POST', path: '/chat', component: CreateChat, middleware: LoggedIn },
    { type: 'PATCH', path: '/chat', component: UpdateChat, middleware: LoggedIn },
    { type: 'DELETE', path: '/chat', component: DeleteChat, middleware: LoggedIn },
];

// Strike Routes
import {
    CreateStrike,
    GetStrikes,
    RecentStrikes,
} from './route/Strike.route';

export const StrikeRoutes = [
    { type: 'GET', path: '/strike', component: GetStrikes },
    { type: 'GET', path: '/strike/recent', component: RecentStrikes },
    { type: 'POST', path: '/strike', component: CreateStrike, middleware: LoggedIn },
];

// Spread Routes
import {
    CreateSpread,
    MySpreads,
    RecentSpreads,
    SpreadById,
    UpdateSpread,
    DeleteSpread,
} from './route/Spread.route';

export const SpreadRoutes = [
    { type: 'POST', path: '/spread', component: CreateSpread, middleware: LoggedIn },
    { type: 'GET', path: '/spread', component: MySpreads, middleware: LoggedIn },
    { type: 'PATCH', path: '/spread', component: UpdateSpread, middleware: LoggedIn },
    { type: 'DELETE', path: '/spread', component: DeleteSpread, middleware: LoggedIn },
    { type: 'GET', path: '/spread/recent', component: RecentSpreads },
    { type: 'GET', path: '/spread/id/:_id', component: SpreadById },
];

// Spread Chat Routes
import {
    CreateSpreadChat,
    GetSpreadChat,
    UpdateSpreadChat,
    DeleteSpreadChat,
} from './route/Spread.chat.route';

export const SpreadChatRoutes = [
    { type: 'POST', path: '/spread/chat', component: CreateSpreadChat, middleware: LoggedIn },
    { type: 'GET', path: '/spread/chat', component: GetSpreadChat },
    { type: 'PATCH', path: '/spread/chat', component: UpdateSpreadChat },
    { type: 'DELETE', path: '/spread/chat', component: DeleteSpreadChat },
];

export function InitRoutes(app) {
    RouteCollection(app, 'Base Server', ServerRoutes);
    RouteCollection(app, 'User', UserRoutes);
    RouteCollection(app, 'Tradier', TradierRoutes);
    RouteCollection(app, 'Chat', ChatRoutes);
    RouteCollection(app, 'Strike', StrikeRoutes);
    RouteCollection(app, 'Spread', SpreadRoutes);
    RouteCollection(app, 'Spread Chat', SpreadChatRoutes);
}
