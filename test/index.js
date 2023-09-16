// const functions = require('@google-cloud/functions-framework');
// const Line = require('@line/bot-sdk').Client;
// const handleEvent = require('./handleEvent');

// exports.main = async (req, res) => {
//     console.log(__dirname);
//     res.send('Hello World!');
// };

import { http } from '@google-cloud/functions-framework';
import { Client, validateSignature } from '@line/bot-sdk';

export const main = async (req, res) => {
    console.log(__dirname);
    try {
        res.status(200).send('Hello World!');
    }
    catch (err) {
        console.log(err);
        res.status(err.status || 500).send(err.message);
    }
}