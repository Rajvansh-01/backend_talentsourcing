import express from 'express';
import bankDetail from '../models/bankDetails.js';
import personalInfo from '../models/personalInfo.js';

class bankDetailController{
    static addBankDetail = async(req, res) => {
        try {
            const personID = req.params.personalInfoID;
            // console.log(personID);
            const {bankName, accountHolderName, accountNo, IFSCcode} = req.body;
            if(bankName && accountHolderName && accountNo && IFSCcode){
                try {
                    const bankInfos = new bankDetail({
                        bankName: bankName,
                        accountHolderName: accountHolderName,
                        accountNo: accountNo,
                        IFSCcode: IFSCcode,
                    });
                    bankInfos.save().then(bankInfos => {
                        const bankDetailsID = bankInfos._id
                        personalInfo.findByIdAndUpdate(personID, {bankDetailID: bankDetailsID}, {new: true}).then(personalInfo => {
                            if(personalInfo){
                                res.status(200).json({status:"success", message:"Bank details added successfully!", data: personalInfo});
                            }else{
                                res.status(400).json({status: "failed", message: "Couldn't add the bank details!", data: personalInfo});
                            }
                        });
                    })
                } catch (error) {
                    res.status(400).json({status: "failed", message: "Couldn't add the bank details!"});
                }
            }
            else{
                res.status(400).json({status: "failed", message: "please fill all the required details!"});
            }
        } catch (error) {
            res.status(400).json({status: "failed", message: "bad request!"});
        }
    }

    static updateBankDetail = async(req, res) => {
        try {
            const personInfoID = req.params.personalInfoID;
            const {bankName, accountHolderName, accountNo, IFSCcode} = req.body;
            const updateInfos = {
                bankName: bankName,
                accountHolderName: accountHolderName,
                accountNo: accountNo,
                IFSCcode: IFSCcode,
            };
            try {
                personalInfo.findById(personInfoID).then(info => {
                    if(info){
                        try {
                            const bankDetailID = info.bankDetailID
                            bankDetail.findByIdAndUpdate(bankDetailID, updateInfo).then(info => {
                                if(info){
                                    res.status(200).json({status:"success", message:"Successfully updated the information!"});
                                }else{
                                    res.status(200).json({status:"failed", message:"couldn't update the information!"})
                                } 
                            })
                        } catch (error) {
                            res.status(200).json({status:"failed", message:"some error occurred!"})
                        }
                    }else{
                        res.status(400).json({status:"failed", message:"Information of the person not found!"});
                    }
                })
            } catch (error) {
                res.status(400).json({status:"failed", message:"Couldn't update the bank details!"})
            }
        } catch (error) {
            res.status(400).json({status:"failed", message:"Couldn't process your request!"})
        }
        
    }

    static getBankDetail = async(req, res) => {
        try {
            const personInfoID = req.params.personalInfoID;
            personalInfo.findById(personInfoID).then(info => {
                console.log(info);
                if(info){
                    try {
                        const bankDetailID = info.bankDetailID;
                        bankDetail.findById(bankDetailID).then((info) => {
                        res.status(200).json({status:"success", message:"Information found!", data:{info} });
                    })
                    } catch (error) {
                        res.status(400).json({status:"failed", message:"cannot get info!"});
                    }
                }else{
                    res.status(400).json({status:"failed", message:"information not found!"});
                }
            })
        } catch (error) {
            res.status(400).json({status:"failed", message:"Couldn't process your request!"})
        }
    }

    static deleteBankDetail = async(req, res) => {
        try {
            const personInfoID = req.params.personalInfoID;
            personalInfo.findById(personInfoID).then(info => {
                if(info){
                    try {
                        const bankDetailID = info.bankDetailID
                        bankDetail.findByIdAndDelete(bankDetailID).then(msg => {
                            if(msg){
                                res.status(200).json({status:"success", message:"Information successfully deleted!"});
                            }else{
                                res.status(400).json({status:"failed", message:"couldn't delete the information!"});
                            }
                        })
                    } catch (error) {
                        res.status(400).json({status:"failed", message:"internal error occurred!"});
                    }
                }else{
                    res.status(400).json({status:"failed", message:"information not found!"});
                }
            })
        } catch (error) {
            res.status(400).json({status:"failed", message:"Couldn't process your request!"})
        }
    }
}

export default bankDetailController;
