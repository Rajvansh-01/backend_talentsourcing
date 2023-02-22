import mongoose from 'mongoose';
import {Schema, model} from 'mongoose';

const bankDetailSchema = new Schema({
    bankName: {type: String, required: true},
    accountHolderName: {type: String, required: true},
    accountNo: {type: String, required: true},
    IFSCcode: {type: String, required: true}
});

const bankDetail = model('bankDetail', bankDetailSchema);
export default bankDetail