const express=require('express');
const blockchain=require('../blockchain');
const bodyParser=require('body-parser');//middleware function for parsing post request

const app=express();
const bc=new blockchain();
const HTTP_PORT=process.env.HTTP_PORT||3001;

app.use(bodyParser.json());
app.get('/blocks',function(req,res){
	res.json(bc.chain);
});

app.post('/mine',(req,res)=>{
	const block=bc.addBlock(req.body.data);
	console.log(`New block added: ${block.toString()}`);
	res.redirect('/blocks');
});

app.listen(HTTP_PORT,function(){
	console.log("Listening on port "+HTTP_PORT);
});