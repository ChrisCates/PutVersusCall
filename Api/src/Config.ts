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

// File Storage Configuration
import { S3, config as AWS_CONFIG } from 'aws-sdk';
import { read } from 'fs-jetpack';

export const FileStorage = process.env.FS_TYPE || 'fs'; // set as fs for local and s3 for AWS
export const AWS_KEY = process.env.AWS_KEY || '';
export const AWS_SECRET = process.env.AWS_SECRET || '';
export const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET || 'media';
export const AWS_S3_BUCKET_URL = process.env.AWS_S3_BUCKET_URL || 'https://s3.us-east-2.amazonaws.com/putversuscall';

AWS_CONFIG.update({
    region: 'us-east-2'
});

export const AWS_SDK_S3 = new S3({
    accessKeyId: AWS_KEY,
    secretAccessKey: AWS_SECRET,
    signatureVersion: 'v4'
});

// Multer Configuration
import * as multer from 'multer';

export const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './upload');
    },
    filename(req, file, cb) {
        const name = String(Number(new Date())) + '-' + file.originalname;
        cb(null, name);
    }
});

import { TheVideoConverter } from '@the-/video-converter';

export const videoConverter = new TheVideoConverter();

export const upload = multer({ storage });

export async function processFile(path) {
    return new Promise((resolve, reject) => {
        if (FileStorage === 's3') {
            AWS_SDK_S3.upload(
                {
                    Key: path,
                    Body: read(`upload/${path}`, 'buffer'),
                    ACL: 'public-read',
                    Bucket: AWS_S3_BUCKET,
                    ContentDisposition: `attachment; filename=${path};`,
                    ContentType: 'image/jpeg',
                },
                (err, data) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(data.Location);
                    }
                }
            );
        } else {
            return resolve(`upload/${path}`);
        }
    });
}
