import mongoose, { Schema, model } from 'mongoose';

const TaskSchema = Schema({
    title: {
        required: true,
        type: String,
        minlenght: 5,
        maxlength: 50
    },
    description: {
        type: String,
        maxlength: 200, 
    },
    deadLine: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['PENDING', 'IN PROGRESS', 'COMPLETED'],
        default: 'PENDING'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
},
    { timestamps: true }
);

TaskSchema.methods.toJSON = function () {
    const { __v, _id, ...rest } = this.toObject();
    return rest;
}

export default model('Tasks', TaskSchema);