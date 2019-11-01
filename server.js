var express = require('express'),
    User=require('./userModel'),
    bodyParser = require('body-parser');

var db;

//create instance of express so we can use that stuff
var app = express();

var port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://klantmodeldb:l399iWSma37N2Gan0zdoC0hHxQgKjWcGEm5TItqvrtANwIBqwByRXDj4Hz7DuRj8dkgHG3l0XynOT82U0ctnuA==@klantmodeldb.documents.azure.com:10255/?ssl=true&replicaSet=globaldb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("admin");
  dbo.collection("users").find({}).toArray(async function(err, result) {
    if (err) throw err;
    //result.forEach(element => {

       
        
        //console.log(element.audits)
        // element.audits.forEach(item => {
        //     console.log(item.mobility.questions)
        // });
       
        // User.create({ salt: element.salt,
        //             username:element.username,
        //             displayName:element.displayName,
                    
        //         })

        // .then(function(res,err){
        //     if(err) console.log(err)
        //     console.log(res)

        // })
         //console.log(element.audits);
        //  element.audits.forEach(item => {
        //      console.log(item.mobility)
           
        //  });

        let complete = {
            year: '', isFinished: '',
            isInitilized: '',
            mobility: '',
            hausing: '',
            healthcare: '',
            shortTermSaving: '',
            midTermSaving: '',
            longTermSaving: ''
          }
        for (element = 0; element < 2; element++) {

            result[element].audits.forEach(element => {
                console.log('delje')
                // console.log(JSON.stringify(element.mobility))
                // var mobility=JSON.stringify(element.mobility);
                // var hausing =JSON.stringify(element.hausing);
                // var healthcare= JSON.stringify(element.healthcare);
                // var shortTermSaving= JSON.stringify(element.shortTermSaving);
                // var midTermSaving = JSON.stringify(element.midTermSaving);
                // var longTermSaving = JSON.stringify(element.longTermSaving);
                // var year=element.year;
                // var isInitilized=element.isInitilized;
                // var isFinished=element.isFinished;



                complete = {
                    year: element.year, isFinished: element.isFinished,
                    isInitilized: element.isInitilized,
                    mobility: element.mobility,
                    hausing: element.hausing,
                    healthcare: element.healthcare,
                    shortTermSaving: element.shortTermSaving,
                    midTermSaving: element.midTermSaving,
                    longTermSaving: element.longTermSaving
                  }
            });
            //console.log(result[element])
                   
            // console.log(JSON.stringify(result[element].vipLevel))
            try{
             var user=await User.create({ salt: result[element].salt,
                    username:result[element].username,
                    displayName:result[element].displayName,
                    provider: result[element].provider,
                    created: result[element].created,
                    phone: result[element].phone,
                    vipLevel:(result[element].vipLevel),
                    roles:(result[element].roles),
                    profileImageURL: result[element].profileImageURL,
                    password:result[element].password,
                    email: result[element].email,
                    lastName: result[element].email,
                    audits: JSON.stringify(complete)

                    
                })
                console.log(user);
            }catch(e){
                console.log(e)
            }
       
    }});
   
    db.close();
  //});
});


// console.log(User.findAll({
//     raw: true,
//     //Other parameters
//    }).then(data => {
//     console.log(data);
//   }));

//handler for route
app.get('/', function (req, res) {
    res.send('welcome');
});
//express to listen the port

app.listen(port, function () {
    console.log('running on port ' + port);
});
//module.exports=app;