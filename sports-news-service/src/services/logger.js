import fs from 'fs';

const logs = fs.createWriteStream('logs.txt', { flags: 'a' });
const errors = fs.createWriteStream('errors.txt', { flags: 'a' });
const feeds = fs.createWriteStream('feeds.txt', { flags: 'a' });
const feedErrors = fs.createWriteStream('feedErrors.txt', { flags: 'a' });

export const logInfo = (message) => {
    logs.write(`\nINFO: ${ new Date().toISOString() } : ${message}`);
};

export const logError = (message) => {
    errors.write(`\nERROR: ${ new Date().toISOString() } : ${message}`);
};

export const logFeed = (message) => {
    feeds.write(`\nFEED: ${ new Date().toISOString() } : ${message}`);
};

export const logFeedError = (message) => {
    feedErrors.write(`\nFEED ERROR: ${ new Date().toISOString() } : ${message}`);
};


