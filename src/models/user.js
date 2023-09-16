import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    lineId: {
        type: String,
        required: true,
        unique: true,
    },
    userName: {
        type: String,
        required: true,
    },
    searchMode: {
        type: Number,
        required: true,
        default: 1,
        enum: [1, 2, 3],
    },
    savedDeps: {
        type: Array,
        required: true,
        default: [],
    },
    savedStarDeps: {
        type: Array,
        required: true,
        default: [],
    },
    savedUacDeps: {
        type: Array,
        required: true,
        default: [],
    },
});

const User = mongoose.model("LineUser", userSchema);
export default User;
