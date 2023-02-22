import companyInformation from "../models/companyInformation.js";
import personalInformation from "../models/personalInformation.js";

//C
const addCompanyInformation = async (req, res) => {
    console.log(req.body);

    try {
        const personalInformationId = req.params.personalInformationId;
        console.log(req.file);
        const addCompanyInformation = {
            companyName: req.body.companyName,
            companyEmail: req.body.companyEmail,
            aboutAgency: req.body.aboutAgency,
            contactNum1: req.body.contactNum1,
            contactNum2: req.body.contactNum2,
            location: req.body.location,
            AgencyWebsiteLink: req.body.AgencyWebsiteLink,
            noOfEmployees: req.body.noOfEmployees,
            linkedIn: req.body.linkedIn,
            facebook: req.body.facebook,
            twitter: req.body.twitter,
            instagram: req.body.instagram,
            verificationDocuments: req.file.path,
        };
        new companyInformation(addCompanyInformation).save().then((companyInformation) => {
            const companyId = companyInformation._id;

            personalInformation.findByIdAndUpdate(personalInformationId, { companyInformation: companyId }, { new: true }).then((personalInformation) => {
                if (personalInformation) {
                    res.status(201).json({ status: "success", message: 'Information added successfully', data: personalInformation });
                } else {
                    res.status(400).json({ status: "failed", message: 'Information not Added', data: personalInformation });
                }
            }).catch((error) => {
                console.log(error);
                res.status(400).json({ status: "failed", message: 'Information not Added', data: error });
            });
        }).catch((error) => {
            console.log(error);
            res.status(400).json({ status: "failed", message: 'Information not Added', data: error });
        });
    } catch (error) {
        console.log(error);
    }
}

//U
const updatedCompanyInformation = async (req, res) => {

    try {
        const personalInformationId = req.params.personalInformationId;
        let filePath = undefined;
        if(req.file!=undefined){
            filePath = req.file.path;
        }
        const updatedInformation = {
            companyName: req.body.companyName,
            companyEmail: req.body.companyEmail,
            aboutAgency: req.body.aboutAgency,
            contactNum1: req.body.contactNum1,
            contactNum2: req.body.contactNum2,
            location: req.body.location,
            AgencyWebsiteLink: req.body.AgencyWebsiteLink,
            noOfEmployees: req.body.noOfEmployees,
            linkedIn: req.body.linkedIn,
            facebook: req.body.facebook,
            twitter: req.body.twitter,
            instagram: req.body.instagram,
            verificationDocuments: filePath,
        }
        personalInformation.findById(personalInformationId).then((information) => {
            if (!information) {
                res.status(400).json({ status: "failed", message: 'Information not found', data: information });
            } else {
                const companyId = information.companyInformation;
                companyInformation.findByIdAndUpdate(companyId, updatedInformation, { new: true }).then((companyInfo) => {
                    if (companyInfo) {
                        res.status(201).json({ status: "success", message: 'Information updated successfully', data: companyInfo });
                    } else {
                        res.status(400).json({ status: "failed", message: 'Information not updated', data: companyInfo });
                    }
                }).catch((error) => {
                    console.log(error);
                    res.status(400).json({ status: "failed", message: 'Information not updated', data: error });
                });
            }
        }).catch((error) => {
            console.log(error);
            res.status(400).json({ status: "failed", message: 'Information not updated', data: error });
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: "failed", message: 'Information not updated', data: error });
    }

}




export default addCompanyInformation
export {
    addCompanyInformation,
    updatedCompanyInformation
};