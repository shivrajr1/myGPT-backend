
import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
    title: String,
    message: [{
        role: {
            type: String,
            enum: ['user', 'assistant']
        },
        content: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
}, { timestamps: true })


export const Thread = mongoose.model('Thread', threadSchema)