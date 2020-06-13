const express= require('express');
var cors = require('cors')
// var favicon = require('serve-favicon');
// const path = require('path');
const mongoose = require('mongoose');
const url = "mongodb://mutaz:ammar1234@ds163870.mlab.com:63870/todolist";
var bodyParser = require('body-parser');




mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true});

var Accounts = mongoose.model('accounts',{
	username:{
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	}
})

var app= express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
// app.use(express.static(path.join(__dirname, '/')));
// app.use(favicon(__dirname + '/favicon.png'));


// app.get('/',(req,res) => {
// 	res.sendFile('index.html');
// })

// app.get('/accounts',(req,res) => {
// 	res.sendFile(__dirname+'/accounts.html');
// })

// app.get('/congrats',(req,res) => {
// 	res.sendFile(__dirname+'/congrats.html');
// })

app.post('/recieve', (req,res)=> {
	const account= req.body;
	let accountModel= new Accounts(account);
	accountModel.save().then(() => {
		console.log("usersaved")
		res.send("user added");
	})
})

app.get('/users', (req,res)=> {
	Accounts.find({}, (err, data)=>{
		res.send(data)
	});
	
})

app.listen(process.env.PORT || 3000)