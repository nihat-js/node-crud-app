const express=require('express');
const dotenv=require('dotenv');
const bodyparser=require('body-parser');
const morgan=require('morgan');
const path=require('path');
const mongoose = require('mongoose');

dotenv.config({path:path.resolve(__dirname,'config.env')});

const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify:false,
            useCreateIndex:true
            
        })

        console.log(`MongoDB connected : ${con.connection.host}`)
    }
    catch (err) {
        console.log(err);
        process.exit(1); 
    }
}

connectDB();



const PORT=process.env.PORT || 2000;

// const connectDB= require('./server/database/connection.js');

// connectDB();

const app=express();

app.listen(PORT,console.log( `Server started on  ${PORT} port`));

app.use(morgan('tiny'));

app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use('/css',express.static(path.resolve(__dirname,'assets/css')));
app.use('/js',express.static(path.resolve(__dirname,'assets/js')));
app.use('/img',express.static(path.resolve(__dirname,'assets/img')));


app.use('/',require('./server/routes/router.js'));
