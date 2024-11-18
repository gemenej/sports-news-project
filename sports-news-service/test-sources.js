import { getAvailableSources } from './src/services/rssParser.js';

console.log('Available sources:');
console.table(getAvailableSources());