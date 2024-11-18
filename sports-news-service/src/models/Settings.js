// model of the settings table
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const settingsSchema = new Schema({
    service: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        required: true,
        default: false
    },
});

export default mongoose.model('Settings', settingsSchema);