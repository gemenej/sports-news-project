import { getAvailableCategories } from './src/services/rssParser.js';

console.log('Available categories:');
console.table(getAvailableCategories());