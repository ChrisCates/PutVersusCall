declare const describe, it;

import { equal } from 'assert';
import { Schema } from 'mongoose';

import { UserInterface, UserSchema } from '../schema/User.schema';

describe('Schema Type Testing', () => {
    it('User Schema Interface', done => {
        const InterfaceTest: UserInterface = {
            username: 'test',
            email: 'test',
            name: 'test',
            tagline: 'test',
            photo: 'test',
            password: 'test',
            dateCreated: 0,
            dateUpdated: 0,
        };

        equal(typeof InterfaceTest.username, 'string');
        equal(typeof InterfaceTest.email, 'string');
        equal(typeof InterfaceTest.name, 'string');
        equal(typeof InterfaceTest.tagline, 'string');
        equal(typeof InterfaceTest.photo, 'string');
        equal(typeof InterfaceTest.password, 'string');
        equal(typeof InterfaceTest.dateCreated, 'number');
        equal(typeof InterfaceTest.dateUpdated, 'number');

        return done();
    });
});

describe('Schema Object Testing', () => {
    it('User Schema', done => {
        equal(typeof UserSchema, typeof new Schema());
        return done();
    });
});
