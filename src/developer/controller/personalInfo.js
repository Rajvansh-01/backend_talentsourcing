// import express from 'express';
import personalInfoModel from '../models/personalInfo.js';

class personalInfoController{
    static addPersonalInfo = async(req, res) => {
        // console.log("oooo");
        try {
            // console.log("has to be ");
            const {image, fullName, email, mobile, country, state, city, headline} = req.body;
            if(image, fullName && email && mobile && country && state && city && headline){
                try {
                    const check = await (personalInfoModel.findOne({email: email}));
                    console.log(check);
                    if(check){
                        res.status(400).send({status:"failed", message: "User already existed!"});
                    } else{
                        const personalInfos = new personalInfoModel({
                            image: req.file.path,
                            fullName: fullName,
                            email: email,
                            mobile: mobile,
                            country: country,
                            state: state,
                            city: city,
                            headline: headline,
                            bankDetailID: "",
                            skillID: "",
                            experienceID: ""
                        });
                        personalInfos.save().then(Infos => {
                            res.status(200).send({status:"success", message:"User Info added successfully!", data: {Infos}});
                        })
                    }
                } catch (error) {
                    res.status(400).json({status: "failed", message: "Couldn't add the User Info!", error: {error}});
                }
            }
            else{
                res.status(400).json({status: "failed", message: "please fill all the required details!"});
            }
        } catch (error) {
            res.status(400).json({status: "failed", message: "bad requets!"});
        }
    }

    static updatePersonalInfo = async(req, res) => {
        try {
            const infoID = req.params.personalInfoID;
            const {image, fullName, email, mobile, country, state, city, headline} = req.body;
            const updateInfos = {
                image: req.file.fileName,
                fullName: fullName,
                email: email,
                mobile: mobile,
                country: country,
                state: state,
                city: city,
                headline: headline,
                bankDetailID: "",
                skillID: "",
                experienceID: ""
            };
            try {
                personalInfoModel.findById(infoID).then(info => {
                    if(info){
                        try {
                            personalInfoModel.findByIdAndUpdate(infoID, updateInfos).then(info => {
                                if(info){
                                    res.status(200).json({status:"success", message:"Successfully updated the information!", data: {info}});
                                }else{
                                    res.status(200).json({status:"failed", message:"couldn't update the information!"})
                                } 
                            })
                        } catch (error) {
                            res.status(200).json({status:"failed", message:"some error occurred!"})
                        }
                    }else{
                        res.status(400).json({status:"failed", message:"Personal info of the person not found!"});
                    }
                })
            } catch (error) {
                res.status(400).json({status:"failed", message:"Couldn't process your request!"})
            }
        } catch (error) {
            res.status(400).json({status: "failed", message: "bad requets!"});
        }
    }

    static getPersonalInfo = async(req, res) => {
        try {
            const infoID = req.params.personalInfoID;
            personalInfoModel.findById(infoID).then(info => {
                if(info){
                    res.status(200).json({status:"success", message:"Information found!", data:{info} });
                }else{
                    res.status(400).json({status:"failed", message:"information not found!"});
                }
            })
        } catch (error) {
            res.status(400).json({status:"failed", message:"Couldn't process your request!"})
        }
    }

    static getAllUsers = async(req, res) => {
        try {
            personalInfoModel.find().then(info => {
                if(info){
                    res.status(200).json({status:"success", message:"Information found!", data:{info} });
                }else{
                    res.status(400).json({status:"failed", message:"information not found!"});
                }
            })
        } catch (error) {
            res.status(400).json({status:"failed", message:"Couldn't process your request!"})
        }
    }

    static deletePersonalInfo = async(req, res) => {
        try {
            const infoID = req.params.personalInfoID;
            personalInfoModel.findById(infoID).then(info => {
                if(info){
                    try {
                        personalInfoModel.findByIdAndDelete(infoID).then(msg => {
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

export default personalInfoController;
