
const path = require('path');
const express = require('express');
const app = express();
const {logger} = require('./middleware/logEvents');
const cors = require('cors')

//  Require things ================
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended : false}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'/public')));

// ==========================================


app.use(logger);

const whiteList = ['http://localhost:3007','https://www.goog.com'];

const corseOption = {
   origin : (origin,callback) =>{
      if(whiteList.indexOf(origin) !== -1) 
      {
         callback(true);

      }else
      {
         callback(new Error('not allowed by corse'))
      }

   },
   corseOptionStatus  : 200
}
app.use(cors(corseOption));

app.get('/',(req,res) =>{
//    res.sendFile('./views/index.html',{root : __dirname});
   res.sendFile(path.join(__dirname,'views','index.html'));
});
app.get('/new-page.html',(req,res) =>{
//    res.sendFile('./views/index.html',{root : __dirname});
console.log(res.statusCode);
   res.sendFile(path.join(__dirname,'views','new-page.html'));
});
app.get('/old-page(.html)?',(req,res) =>{
//    res.sendFile('./views/index.html',{root : __dirname});
 console.log(res.statusCode);
   res.redirect(301,'new-page.html')
});
app.get('/*',(req,res) =>{
//    res.sendFile('./views/index.html',{root : __dirname})
   res.status(404).sendFile(path.join(__dirname,'views','404.html'));
   console.log(req.url);
});






// const one = (req,res,next) =>{
//     console.log('hello!!!')
//     res.send('i am doing pretty well');
//     next();
// }
// const two = (req,res,next) =>{
//     console.log('hello!!!')
    
//     next();
// }
// const three = (req,res) =>{
//     console.log('jackpot here');
    
// }


// app.get('/hello(.html)?',[one,two,three]);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));