var express=require('express');  
var app=new express();  
var port=3000;  
app.listen(port,function(err){  
    if(typeof(err)=="undefined"){  
        console.log('Your application is running on : '+ port+' port');  
    }  
});  
//routing using Router  
var articlesRouter=express.Router();  
var projectsRouter=express.Router();  
var booksRouter=express.Router();  
var contactRouter=express.Router();  
  
app.use(express.static('public'));//making public directory as static diectory   
  
//app.use(express.static('src/views')); //making public directory as static diectory 

app.set('views','./src/views');   
app.set('view engine','ejs');  
  
articlesRouter.route("/");  
projectsRouter.route("/");  
booksRouter.route("/");  
contactRouter.route("/");  
  
app.use('/articles',articlesRouter);  
app.use('/projects',projectsRouter);  
app.use('/books',booksRouter);  
app.use('/contact',contactRouter);  
  
app.get('/',function(req,res){  
    res.render('index', {  
        title:'Node.js By Sourabh Somani',  
        menu:navMenu   
    });  
});  

contactRouter.route("/")  
    .get(function(req,res){  
        res.render('contact', {  
            title:'Contact Us',  
            menu:navMenu  
        });  
    });

    booksRouter.route("/")  
    .get(function(req,res){  
        res.render('books', {  
            title:'Books',  
            menu:navMenu  
        });  
    }); 

    projectsRouter.route("/")  
    .get(function(req,res){  
        res.render('projects', {  
            title:'Projects',  
            menu:navMenu  
        });  
    }); 

    articlesRouter.route("/")  
    .get(function(req,res){  
        res.render('articles', {  
            title:'Articles',  
            menu:navMenu  
        });  
    }); 

    var navMenu=[  
        {  
            href:'/articles',  
            text:'Articles'  
        },  
        {  
            href:'/projects',  
            text:'Projects'  
        },  
        {  
            href:'/books',  
            text:'Books'  
        },  
        {  
            href:'/Contact',  
            text:'Contact Us'  
        },  
    ]; 