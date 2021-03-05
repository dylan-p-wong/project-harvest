const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchoolSchema = new Schema({
    schoolName: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    admissions: {
        type: String,
        required: true
    },
    imageLocation: {
        type: String,
        required: true
    }
});

module.exports = School = mongoose.model('School', SchoolSchema);