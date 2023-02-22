import { Schema } from "mongoose";
import mongoose from "mongoose";

const personalInformationSchema = new Schema({
    fullName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    designation:{
        type: String,
        required: true
    },
    contactNum:{
        type: String,
        required: true
    },
    skypeId:{
        type: String,
    },
    companyInformation: {
        type: Schema.Types.ObjectId, ref: 'companyInformation'
    },
    gallery:{
        type: Schema.Types.ObjectId, ref: 'gallery'
    }
});

const personalInformation = mongoose.model('client', personalInformationSchema);
export default personalInformation;