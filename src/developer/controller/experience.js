import express from 'express';
import experience from '../models/experience.js';
import personalInfo from '../models/personalInfo.js';

class experienceController{
    static addExperience = async(req, res) => {
        try {
            const {companyName, designation, startDate, endDate, location, jobType, description} = req.body;
            if(companyName && designation && startDate && endDate && location && jobType && description){
                try {
                    const personID = req.params.personalInfoID
                    const experienceInfo = new experience({
                        companyName: companyName,
                        designation: designation,
                        startDate: startDate,
                        endDate: endDate,
                        location: location,
                        jobType: jobType,
                        description: description
                    });
                    experienceInfo.save().then(info => {
                        const experienceID = info._id
                        personalInfo.findByIdAndUpdate(personID, {experienceID: experienceID}, {new: true}).then(personalInfo => {
                            if(personalInfo){
                                res.status(200).json({status:"success", message:"Bank details added successfully!", data: personalInfo});
                            }else{
                                res.status(400).json({status: "failed", message: "Couldn't add the bank details!", data: personalInfo});
                            }
                        })
                        res.status(200).json({status:"success", message:"User Experience added successfully!"});
                    })
                } catch (error) {
                    res.status(400).json({status: "failed", message: "Couldn't add the User Experience!"});
                }
            }
            else{
                res.status(400).json({status: "failed", message: "please fill all the required details!"});
            }
        } catch (error) {
            res.status(400).json({status: "failed", message: "bad request!"});
        }
    }

    static updateExperience = async(req, res) => {
        try {
            const personID = req.params.personalInfoID;
            const {companyName, designation, startDate, endDate, location, jobType, description} = req.body;
            const updateInfos = {
                companyName: companyName,
                designation: designation,
                startDate: startDate,
                endDate: endDate,
                location: location,
                jobType: jobType,
                description: description
            };
            try {
                personalInfo.findById(personID).then(info => {
                    if(info){
                        try {
                            const experienceIDs = info.experienceID
                            experience.findByIdAndUpdate(experienceIDs, updateInfos).then(info => {
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
                        res.status(400).json({status:"failed", message:"User info not found!"});
                    }
                })
            } catch (error) {
                res.status(400).json({status:"failed", message:"Couldn't process your request!"})
            }
        } catch (error) {
            res.status(400).json({status: "failed", message: "bad request!"});
        }
    }

    static getExperience = async(req, res) => {
        try {
            const personID = req.params.personalInfoID;
            personalInfo.findById(personID).then(info => {
                if(info){
                    try {
                        const experiencesID = info.experienceID;
                        experience.findById(experiencesID).then((info) => {
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

    static deleteExperience = async(req, res) => {
        try {
            const personInfoID = req.params.personalInfoID;
            personalInfo.findById(personInfoID).then(info => {
                if(info){
                    try {
                        const experiencesID = info.experienceID;
                        experience.findByIdAndDelete(experiencesID).then(msg => {
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

export default experienceController;
