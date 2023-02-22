import personalInformation from '../models/personalInformation.js';
import companyInformation from '../models/companyInformation.js';
import gallery from '../models/gallery.js';
//C
const addInformation = async (req, res) => {
    console.log(req.body)
    const addInformation = {
        fullName: req.body.fullName,
        email: req.body.email,
        designation: req.body.designation,
        contactNum: req.body.contactNum,
        skypeId: req.body.skypeId,
    }

    try {
        if(addInformation.contactNum||addInformation.designation||addInformation.email||addInformation.fullName){
            personalInformation.findOne({email: addInformation.email}).then((information)=>{
                if(information){
                   return res.status(400).json({ status: "failed", message: 'Information already exist', data: information });
                }
                else{
                    new personalInformation(addInformation).save().then((information)=>{
                        console.log(information);
                        if(information) {
                            res.status(201).json({ status: "success", message: 'Information added successfully', data: information });
                        } else {
                            res.status(400).json({ status: "failed", message: 'Information not Added', data: information });
                        }
                    }).catch((error)=>{
                        console.log(error);
                        res.status(400).json({ status: "failed", message: 'Information not Added', data: error });
                    });
                }
            }).catch((error)=>{
                console.log(error);
                res.status(400).json({ status: "failed", message: 'Information not Added', data: error });
            });
        }
        else{
            res.status(400).json({ message: 'Please fill all the fields' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

//R
const getInformation = async (req, res) => {
    try {
        const informationId = req.params.informationId;

        //find by id
        personalInformation.findById(informationId).then((information)=>{
            if(!information){
                res.status(400).json({ status: "failed", message: 'Information not found', data: information });
            }
                //return company information
            else{

                const companyId = information.companyInformation;
                const galleryId = information.gallery;
                companyInformation.findById(companyId).then((company)=>{
                    if(company){
                        gallery.findById(galleryId).then((gallery)=>{
                            if(gallery){
                                res.status(201).json({ status: "success", message: 'Information found', data: [{personal:information},{companyInformation:company},{officeGallery:gallery}] });
                            }else{
                                res.status(201).json({ status: "success", message: 'Information found', data: [information,company] });
                            }
                        }).catch((error)=>{
                            console.log(error);
                            res.status(400).json({ status: "failed", message: 'Information not found', data: error });
                        });
                    }else{
                        res.status(201).json({ status: "success", message: 'Information found', data: information });
                    }
                }).catch((error)=>{
                    console.log(error);
                    res.status(400).json({ status: "failed", message: 'Information not found', data: error });
                });
            }
        }).catch((error)=>{
            console.log(error);
            res.status(400).json({ status: "failed", message: 'Information not found', data: error });
        });
    }catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}


//U
const updateInformation = async (req, res) => {
    const updateInformation = {
        fullName: req.body.fullName,
        email: req.body.email,
        designation: req.body.designation,
        contactNum: req.body.contactNum,
        skypeId: req.body.skypeId,
    }
    const informationId = req.params.informationId;
    try {
        personalInformation.findById(informationId).then((information)=>{
            if(information){
                personalInformation.findByIdAndUpdate(informationId, updateInformation).then((information)=>{
                    if(information){
                        res.status(201).json({ status: "success", message: 'Information updated successfully', data: information });
                    }
                    else{
                        res.status(400).json({ status: "failed", message: 'Information not updated', data: information });
                    }
                }).catch((error)=>{
                    console.log(error);
                    res.status(400).json({ status: "failed", message: 'Information not updated', data: error });
                });
            }
            else{
                res.status(400).json({ status: "failed", message: 'Information not found', data: information });
            }
        }).catch((error)=>{
            console.log(error);
            res.status(400).json({ status: "failed", message: 'Information not found', data: error });
        });

    }catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

//D

const deleteInformation = async (req, res) => {
    try {
        const informationId = req.params.informationId;

        //find by id
        personalInformation.findByIdAndDelete(informationId).then((information)=>{
            if(information){
                res.status(201).json({ status: "success", message: 'Information deleted successfully', data: information });
            }
            else{
                res.status(400).json({ status: "failed", message: 'Information not deleted', data: information });
            }
        }).catch((error)=>{
            console.log(error);
            res.status(400).json({ status: "failed", message: 'Information not deleted', data: error });
        });
    }catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

const getVendors = async (req, res) => {
    try{
        personalInformation.find().then((information)=>{
            if(information){
                res.status(201).json({ status: "success", message: 'Information found', data: information });
            }
            else{
                res.status(400).json({ status: "failed", message: 'Information not found', data: information });
            }
        }).catch((error)=>{
            console.log(error);
            res.status(400).json({ status: "failed", message: 'Information not found', data: error });
        });
    } catch(e){
        console.log(e);
        res.status(500).json({ message: 'Something went wrong' ,data: e.message});
    }    
}


export default addInformation;
export {
    addInformation,
    getInformation,
    updateInformation,
    deleteInformation,
    getVendors
}