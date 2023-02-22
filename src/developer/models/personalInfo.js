import mongoose from 'mongoose';
import {Schema, model} from 'mongoose';

const personalInfoSchema = new Schema({
    image: {type: String},
    fullName: {type: String, required: true},
    email: {type: String, required: true},
    mobile: {type: String, required: true},
    country: {type: String, required: true},
    state: {type: String, required: true},
    city: {type: String, required: true},
    headline: {type: String, required: true},
    bankDetailID: {type: String},
    skillID: {type: String},
    experienceID: {type: String}
});

const personalInfo = model('personalInfo', personalInfoSchema);
export default personalInfo
