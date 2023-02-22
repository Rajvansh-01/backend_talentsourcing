import express from 'express';
import skillsModel from '../models/skills.js';
import personalInfo from '../models/personalInfo.js';

class skillController{
    static addSkill = async(req, res) => {
        try {
            const personID = req.params.personalInfoID;
            const {skill, languages, socialLinks} = req.body;
            if(skill && languages && socialLinks){
                try {
                    const skillsInfo = new skillsModel({
                        skills: skill, 
                        languages: languages, 
                        socialLinks: socialLinks
                    });
                    skillsInfo.save().then(skillInfo => {
                        const skillsID = skillInfo._id
                        personalInfo.findByIdAndUpdate(personID, {skillID: skillsID}, {new: true}).then(personalInfo => {
                        if(personalInfo){
                            res.status(200).json({status:"success", message:"USER Skills added successfully!", data: personalInfo});
                        }else{
                            res.status(400).json({status: "failed", message: "Couldn't add the Skills!", data: personalInfo});
                        }
                    });
                    })
                } catch (error) {   
                    res.status(400).json({status: "failed", message: "Couldn't add the user skills!", error:{error}});
                    console.log(error);
                }
            }
            else{
                res.status(400).json({status: "failed", message: "please fill all the required details!"});
                console.log(skill);
                console.log(languages);
                console.log(socialLinks);
            }
        } catch (error) {
            res.status(400).json({status: "failed", message: "bad request!"});
        }
    }

    static updateSkills = async(req, res) => {
        try {
            const personID = req.params.personalInfoID;
            const {skill, languages, socialLinks} = req.body;
            const updateInfos = {
                skills: skill, 
                languages: languages, 
                socialLinks: socialLinks
            };
            try {
                personalInfo.findById(personID).then(info => {
                    if(info){
                        try {
                            const skillID = info.skillID;
                            skills.findByIdAndUpdate(skillID, updateInfos).then(info => {
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
                        res.status(400).json({status:"failed", message:"Skills of the person not found!"});
                    }
                })
            } catch (error) {
                res.status(400).json({status:"failed", message:"Couldn't process your request!"})
            }
        } catch (error) {
            res.status(400).json({status: "failed", message: "bad request!"});
        }
    }

    static getSkills = async(req, res) => {
        try {
            const personID = req.params.personalInfoID;
            personalInfo.findById(personID).then(info => {
                if(info){
                    try {
                        const skillID = info.skillID;
                        skills.findById(skillID).then((info) => {
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

    static deleteSkills = async(req, res) => {
        try {
            const personID = req.params.personalInfoID;
            personalInfo.findById(personID).then(info => {
                if(info){
                    try {
                        const skillID = info.skillID;
                        skills.findByIdAndDelete(skillID).then(msg => {
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

export default skillController;
