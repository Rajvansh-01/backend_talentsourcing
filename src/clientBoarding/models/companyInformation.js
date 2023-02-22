import { Schema } from "mongoose";
import mongoose from "mongoose";

const companyInformationSchema = new Schema({
    companyName:{
        type: String,
    },
    companyEmail:{
        type: String,
    },
    aboutAgency:{
        type: String,
    },
    contactNum1:{
        type: String,
        required: true
    },
    contactNum2:{
        type: String,
    },
    location:{
        type: String,
    },
    AgencyWebsiteLink:{
        type: String,
    },
    noOfEmployees:{
        type: Number,
    },
    linkedIn:{
        type: String,
    },
    facebook:{
        type: String,
    },
    twitter:{
        type: String,
    },
    instagram:{
        type: String,
    },
    verificationDocuments:{
        type: String,
    },
    // Office Photo
    

});

const companyInformation = mongoose.model('clientcompany', companyInformationSchema);
export default companyInformation;