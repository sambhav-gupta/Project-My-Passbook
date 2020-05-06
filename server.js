const express = require('express')
const session = require('express-session')
const path = require('path')
const app = express()
const {db,Users} = require('./database')
const multer = require('multer')
const fs=require('fs')


 


var storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'../my-passbook/public/uploads')
    },
    filename: (req,file,cb)=>{
        console.log(req.body)
        cb(null,file.fieldname + '-' + req.body.uname  + path.extname(file.originalname))
    }
    })
    
    var upload = multer({
        storage: storage,
        fileFilter: (req,file,cb)=>{
            checkfiletype(file,cb)
        }
    }).single('myimage')
    
    function checkfiletype(file,cb){
        const filetypes = /jpeg|jpg|png/
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
        const mimetype = filetypes.test(file.mimetype)
        if(mimetype && extname){
             return cb(null,true)
        }else{
            return cb('Error: Images Only')
    
        }
    
    }



app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use( session({
    secret: 'a long unguessable string here',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: false
    }
  })
)

app.use('/',express.static(path.join(__dirname,'./public')))
app.post('/dp',(req,res)=>{
    const paath = "./public/uploads/myimage-" + req.body.username
    let arr=[".jpeg",".png",".jpg"]
    for(let i=0;i<arr.length;i++){
       try {
           if (fs.existsSync(paath+arr[i])) {
             res.send(arr[i])
           } else {
             console.log("File does not exist.")
           }
         } catch(err) {
           console.error(err)
         }
    }
   
})

app.get('/',(req,res)=>{
    if(req.session.page_views==0){
        req.session.page_views = 1
      
    }else{
req.session.page_views ++
    }
})

app.post('/signup',(req,res)=>{
   
    
    upload(req,res,(err)=>{
        if(err){
           res.send(err)
            return
        }else {
            if(req.file == undefined){
                res.send("No file Selected")
                return
            }else{
                let firstname = req.body.fname
                let lastname = req.body.lname
                let username = req.body.uname
                let password = req.body.pword
            Users.create({
                Firstname: firstname,
                Lastname: lastname,
                Username: username,
                Password: password
            }).then((user)=>{
                res.redirect('/')
                return
            }).catch((err)=>{
               res.send("User Already Exists . Please login!!")
                return
            })
               console.log("Uploaded Successfully")
            }
        }
    })
})
// app.post('/signupdb',(req,res)=>{
//     Users.create({
//       Firstname: req.body.fname,
//       Lastname: req.body.lname,
//       Username: req.body.username,
//       Password: req.body.password,
      
//     }).then((user)=>{
//         res.send(user)
//     }).catch((err)=>{
//         let error = "User Already Exists"
//         res.send(error)
//     })
// })

app.post('/signin',(req,res)=>{
    Users.findOne({
        where:{
            username: req.body.username
        }
    }).then((user)=>{
        if(!user){
            res.send("Sign up")
        }
       
        else if(user.Password != req.body.password){
            res.send("Wrong Password")
        }else {
            req.session.username = user.username
            req.session.save()
            res.send({
                name: user.Firstname + " " + user.Lastname,
                username: user.Username,
               
            })
        }
    }).catch((err)=>{
        res.send(err)
    })
})

app.post('/signout',(req,res)=>{
    req.session.destroy(()=>{
        console.log("User logged Out")
    })
    res.send("loggedout")
})


db.sync().then(()=>{console.log("Database Created")})
app.listen(8888,()=>{
    console.log("Server at http://localhost:8888")
})