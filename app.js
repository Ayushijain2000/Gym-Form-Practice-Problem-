const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 80;

//EXPRESS SPECIFIC STUFF
app.use('/static' , express.static('static'));// For serving static files
app.use(express.urlencoded()); // helps to bring the forms data to express
//PUG SPECIFIC STUFF
app.set('view engine' , 'pug');// set the template engine as pug
app.set('views', path.join(__dirname, 'views'));//set the views directory

//END POINTS 
app.get( '/' , (req, res)=>{
   const con = "Just read it if you want to learn"
   const params = {'title' : 'Learn PUG' , "content" : con}
  res.status(200).render('index.pug', params);
})

app.post( '/' , (req, res)=>{
  //console.log(req.body);
  let name= req.body.name;
  let age= req.body.age;
  let gender= req.body.gender;
  let address= req.body.address;
  let more= req.body.more;
  let dataAboutPerson = `The name of the client is ${name} and is ${age} years old, ${gender} , resides at 
  ${address}. More About him/her : ${more}`;
  fs.writeFileSync('output.text' , dataAboutPerson); 
  const params = {'message': "Your Form has been submitted successfully"}
  res.status(200).render('index.pug', params);
})

//STARTING THE SERVER
app.listen(port , ()=>{
    console.log(`The app started successfully at port ${port} `)
});


// This code was to learn

// app.get("/demo" , (req,res)=>{
//    res.status(200).render('demo', { title: 'Hey there', message: 'Hello There , thanks for helping me learn pugG! ' })
// });

// app.get("/about" , (req,res)=>{
//     res.status(200).send("This is about page of my first express app with Harry");
//  });

//  app.post("/about" , (req,res)=>{
//     res.send("This is post request of my first express app with Harry");
//  });

//  app.get("/this" , (req,res)=>{
//     res.status(404).send("This page is not found on cwa");
//  });