import express from 'express';
import mongoose from 'mongoose';
import keys from './config/keys.js';
import userRoutes from './LoginSignup/routes/userRoutes.js';
import cors from "cors";
import dotenv from 'dotenv'
dotenv.config()

const app = express();
app.use(cors());


// Connect to MongoDB
mongoose.set('strictQuery', false);
mongoose.connect(keys.database.MONGO_URI,{useNewUrlParser: true}).then(
    console.log("Connected to DB...")
)
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
    });

//Login-signup routes
app.use("/api/user", userRoutes); //calls api/user/register

//import routes for clientBoarding
import personalInformationRoutes from './clientBoarding/routes/personalInformation.js';
import companyInformation from './clientBoarding/routes/companyInformation.js';
import gallery from './clientBoarding/routes/gallery-route.js';

app.use('/api/v1/client-on-boarding', personalInformationRoutes);
app.use('/api/v1/client-on-boarding', companyInformation);
app.use('/api/v1/client-on-boarding', gallery);

import vendorInformationRoutes from './vendorBoarding/routes/personalInformation.js';
import vendorCompanyInformation from './vendorBoarding/routes/companyInformation.js';
import vendorgallery from './vendorBoarding/routes/gallery-route.js';

app.use('/api/v1/vendor-on-boarding', vendorInformationRoutes);
app.use('/api/v1/vendor-on-boarding', vendorCompanyInformation);
app.use('/api/v1/vendor-on-boarding', vendorgallery);

//import routes for developer
import personalInfo from './developer/routes/personalInfo.js';
import experience from './developer/routes/experience.js';
import skills from './developer/routes/skills.js';
import bankDetails from './developer/routes/bankDetails.js';

app.use('/api/v1/developer-on-boarding', personalInfo);
app.use('/api/v1/developer-on-boarding', experience);
app.use('/api/v1/developer-on-boarding', skills);
app.use('/api/v1/developer-on-boarding', bankDetails);


app.listen(keys.PORT, () => {
    console.log(`Server is running on port ${keys.PORT}`);
});

