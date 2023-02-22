import { Schema } from "mongoose";
import mongoose from "mongoose";
const gallerySchema = new Schema({
    images:[{
        type: String,
    }]
});

const gallery = mongoose.model('clientGallery', gallerySchema);
export default gallery;