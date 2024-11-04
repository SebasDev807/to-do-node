import { Schema, model } from 'mongoose';

const UserSchema = Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        default: null
    },
    status: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN', 'INVITED'],
        default: "USER"
    }

},
    { timestamps: true }
);

UserSchema.methods.toJSON = function () {
    const { __v, _id, password, token, confirmed, ...rest } = this.toObject();
    return rest;
}

export default model('Users', UserSchema);