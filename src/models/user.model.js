import { Schema, model } from 'mongoose';

const UserSchema = Schema({
    username: {
        type: String,
        required: true,
        unique: true
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

},
    { timestamps: true }
);

UserSchema.methods.toJSON = function () {
    const { __v, _id, password, token, confirmed, ...rest } = this.toObject();
    return rest;
}

export default model('Users', UserSchema);