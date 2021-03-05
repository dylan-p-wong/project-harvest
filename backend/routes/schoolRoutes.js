const express = require('express');
const router = express.Router();
const upload = require('../helpers/imageUpload');
const School = require('../models/school');

router.route('/').get(async (req, res)=>{
    const schools = await School.find();
    res.status(200).json({schools}); 
});

router.route('/create').post(upload.single("image"), async (req, res) => {
    if (!req.file){
        return res.status(400).json({
            success: false,
            errors: {
                msg: "Error uploading image"
            }
        });
    }

    const { schoolName, about, location, admissions } = req.body;

    if (!schoolName || !about || !location || !admissions){
        return res.status(400).json({
            success: false,
            errors: {
                msg: "Fill in all fields"
            }
        });
    }

    const newSchool = new School({
        schoolName: schoolName,
        about: about,
        location: location,
        admissions: admissions,
        imageLocation: req.file.location
    });

    await newSchool.save();

    res.status(200).json({
        school: newSchool,
        success: true,
        errors: null
    });
});

router.route('/update').post(upload.single("image"), async (req,res)=>{

    const { schoolId, about, location, admissions } = req.body;

    const school = await School.findById(schoolId);

    if (!school){
        return res.status(400).json({
            success: false,
            errors: {
                msg: "No school exists with this Id"
            }
        });
    }

    if (about){
        school.about = about;
    }

    if (location){
        school.location = location;
    }

    if (admissions){
        school.admissions = admissions;
    }

    if (req.file){
        school.imageLocation = req.file.location;
    }

    await school.save();

    res.status(200).json({
        school: school,
        success: true,
        errors: null
    });
});

module.exports = router;
