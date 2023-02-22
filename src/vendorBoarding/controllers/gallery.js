import companyInformation from "../models/companyInformation.js";
import personalInformation from "../models/personalInformation.js";
import gallery from "../models/gallery.js";
//C
const addImage = async (req, res) => {

    try {
        const personalInformationId = req.params.personalInformationId;
        const images = req.files;
        let imagesPath = [];
        images.images.forEach((image) => {
            imagesPath.push(image.path);
        });
        console.log(imagesPath);
        new gallery({
            images: imagesPath
        }).save().then((gallery) => {
            const galleryId = gallery._id;
            personalInformation.findByIdAndUpdate(personalInformationId, { gallery: galleryId }, { new: true }).then((personalInformation) => {
                if (personalInformation) {
                    res.status(201).json({ status: "success", message: 'Information added successfully', data: personalInformation, data2: gallery });
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
        res.status(400).json({ status: "failed", message: "Image not added", data: error });
    }

}
//U

const updatedImage = async (req, res) => {

    try {
        const personalInformationId = req.params.personalInformationId;
        const images = req.files;
        let imagesPath = [];
        images.images.forEach((image) => {
            imagesPath.push(image.path);
        });
        console.log(imagesPath);
        personalInformation.findById(personalInformationId).then((personalInformation) => {
            const galleryId = personalInformation.gallery;
            gallery.findById(galleryId).then((gallery) => {
                imagesPath.forEach((image) => {
                    gallery.images.push(image);
                });
                gallery.save().then((gallery) => {
                    res.status(201).json({ status: "success", message: 'Information added successfully', data: personalInformation, gallery: gallery });
                }).catch((error) => {
                    console.log(error);
                    res.status(400).json({ status: "failed", message: 'Information not Added', data: error });
                });
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
        res.status(400).json({ status: "failed", message: "Image not added", data: error });
    }

}

//D
const deleteImage = async (req, res) => {
    try{
        const personalInformationId = req.params.personalInformationId;

        personalInformation.findById(personalInformationId).then((personalInformation) => {
            const galleryId = personalInformation.gallery;
            gallery.findByIdAndDelete(galleryId).then((gallery) => {
                res.status(201).json({ status: "success", message: 'Information added successfully', data: personalInformation, gallery: gallery });
            }).catch((error) => {
                console.log(error);
                res.status(400).json({ status: "failed", message: 'Information not Added', data: error });
            });
        }).catch((error) => {
            console.log(error);
            res.status(400).json({ status: "failed", message: 'Information not Added', data: error });
        });
    }catch(error){
        console.log(error);
        res.status(400).json({ status: "failed", message: "Image not added", data: error });
    }
}



export default addImage;
export { updatedImage, addImage, deleteImage };




