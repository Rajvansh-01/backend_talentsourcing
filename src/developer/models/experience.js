import mongoose from 'mongoose';
import {Schema, model} from 'mongoose';

const experienceSchema = new Schema({
    companyName: {type: String},
    designation: {type: String},
    startDate: {type: Date},
    endDate: {type: Date},
    location: {type: String},
    jobType: {type: String},
    description: {type: String}
});

const experience = model('experience', experienceSchema);
export default experience