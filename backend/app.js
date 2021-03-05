if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.set('trust proxy', 1);
    
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
    })
);

mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true})
.then(()=>{
    console.log('MongoDB Connected...',);
})
.catch((err)=>{
    console.log('MongoDB Error: ' + err);
});

const schoolRoutes = require('./routes/schoolRoutes');
app.use('/schools', schoolRoutes);

module.exports = app;

