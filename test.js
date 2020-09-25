var http=require("http");
var logdetails=require("./extramodule");
var events=require("events"); 

var e=new events.EventEmitter();

e.on('click',function(data){
    console.log(data);

})

e.emit('click','harish  chandra paudel');

// http.createServer(function(req,res){
// debugger;

//     res.writeHead(200,{"content-type":"text/plain"});
//     res.end('hello world harish');
// }).listen(3000)

// console.log(logdetails.info('hello world harish'))
// console.log(__filename); 
// console.log(__dirname); 
// //console.log("hello world");