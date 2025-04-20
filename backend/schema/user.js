import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    auth0_user_id: {
        type: String,
        required: true,
        
    }
    name: {
        type: String,
        required: true,
    },
});
