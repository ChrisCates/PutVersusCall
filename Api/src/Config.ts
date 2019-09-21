declare const process;

// Global Environment Variables
export const port = process.env.PORT || 3000;
export const env = process.env.NODE_ENV || 'development';
export const testing = process.env['LOADED_MOCHA_OPTS'];

// Tradier Configuration
import * as TradierClient from 'tradier-client';

export const TRADIER_TOKEN = process.env.TRADIER_TOKEN || '';
export const TRADIER_ENV = process.env.TRADIER_ENV || 'sandbox';
export const Tradier =  TRADIER_ENV === 'sandbox' ? new TradierClient(TRADIER_TOKEN, TRADIER_ENV) : new TradierClient(TRADIER_TOKEN);

console.log(`Tradier Environment ${TRADIER_ENV}`.green.bold);
console.log(`Tradier Token ${TRADIER_TOKEN}\n`.green.bold)

export const sessionSecret = process.env.SESSION_SECRET || 'putversuscall';
export const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/putversuscall';
export const cors = process.env.CORS_URL || 'origin';
export const logging = process.env.LOGGING || 1;
export const cwd = process.cwd();

// {ipfs} or {fs}
export const FileStorage = process.env.FS_TYPE || 'fs';
export const IPFSAPIURL = process.env.IPFS_API_URL || 'http://localhost:5001';
export const IPFSURL = process.env.IPFS_URL || 'http://localhost:8080';

// Multer Configuration
import * as multer from 'multer';
import * as superagent from 'superagent';

export const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './upload');
    },
    filename(req, file, cb) {
        const name = String(Number(new Date())) + '-' + file.originalname;
        cb(null, name);
    }
});

export const upload = multer({ storage });

export async function processFile(path) {
    return new Promise(async (resolve, reject) => {
        if (FileStorage === 'ipfs') {
            try {
                const payload = await superagent
                    .post(`${IPFSAPIURL}/api/v0/add?pin=true`)
                    .attach('file', `upload/${path}`);

                return resolve(`${IPFSURL}/ipfs/${payload.body.Hash}`);
            } catch (error) {
                return reject(error);
            }
        } else {
            return resolve(`upload/${path}`);
        }
    });
}
