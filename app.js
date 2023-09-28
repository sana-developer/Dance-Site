const express = require("express");
const path = require("path");
const app = express();
//connecting to mongodb
const mongoose = require('mongoose');
const bodyparser = require("body-parser")
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
    console.log("we are connected")
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const port = 7000;

//defining mongo schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });
const contact = mongoose.model('contact', contactSchema);
//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'));//for serving static files
app.use(express.urlencoded());//help to take form data
//PUG SPECIFIC STUFF
app.set('view engine','pug');//set the template engine as pug
app.set('views',path.join(__dirname,'views'));//set the views directory
//ENDPOINTS
app.get('/',(req,res)=>{
        const parms = { };
    res.status(200).render('home.pug',parms)
})
app.get('/contact',(req,res)=>{
    const parms = { };
    res.status(200).render('contact.pug',parms)
})
app.post('/contact',(req,res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
    //res.status(200).render('contact.pug')
})
//START THE SERVER
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`)
})