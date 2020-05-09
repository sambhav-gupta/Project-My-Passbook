const express = require('express')
const session = require('express-session')
const path = require('path')
const app = express()
const {db,Users , Friends , Passbook} = require('./database')
const multer = require('multer')
const fs=require('fs')


 


var storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'../my-passbook/public/uploads')
    },
    filename: (req,file,cb)=>{
        console.log(req.body)
        
            cb(null,file.fieldname + '-' + req.body.uname + new Date() + path.extname(file.originalname) )
        
      
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

    var store = multer.diskStorage({

        destination:(req,file,cb)=>{
            cb(null,'./public/bills')

        },
        filename : (req,file,cb)=>{
           
            cb(null,file.originalname + '-' + req.body.inpdescribe+  path.extname(file.originalname))
            
        }
    })

    var upload2 = multer({
        storage: store,
        fileFilter: (req,file,cb)=>{
            check2filetype(file,cb)
        }
    }).single('bill')
    
    function check2filetype(file,cb){
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
// app.post('/dp',(req,res)=>{
//     const paath = "./public/uploads/myimage-" + req.body.username
//     let arr=[".jpeg",".png",".jpg"]
//     for(let i=0;i<arr.length;i++){
//        try {
//            if (fs.existsSync(paath+arr[i])) {
//              res.send(arr[i])
//            } else {
//              console.log("File does not exist.")
//            }
//          } catch(err) {
//            console.error(err)
//          }
//     }
   
// })

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
                let extension = path.extname(req.file.originalname)
            Users.create({
                Firstname: firstname,
                Lastname: lastname,
                Username: username,
                Password: password,
                Extension: extension
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


app.post('/uploadbill',(req,res)=>{
   
    
    upload2(req,res,(err)=>{
        if(err){
            console.log(err)
           res.end("error")
            return
        }else {
            if(req.file == undefined && req.body.amount !=0){
                if(req.body.size == 1 ){
                    Passbook.create({
                                Lender: req.body.lender,
                                Receiver: req.body.receiver,
                                Day : new Date().getDate(),
                                Month: new Date().getMonth() + 1,
                                Year: new Date().getFullYear(),
                                Time:  new Date().getHours() + ':' + new Date().getMinutes()+ ':' + new Date().getSeconds(),
                                Amount: req.body.amount,
                                Description: req.body.inpdescribe
            
                            })

                }else{
                      for(let i=0;i<req.body.receiver.length;i++){
                    Passbook.create({
                        Lender: req.body.lender,
                        Receiver: req.body.receiver[i],
                        Day : new Date().getDate(),
                        Month: new Date().getMonth() + 1,
                        Year: new Date().getFullYear(),
                        Time:  new Date().getHours() + ':' + new Date().getMinutes()+ ':' + new Date().getSeconds(),
                        Amount: req.body.amount,
                        Description: req.body.inpdescribe
    
                    })
                        
                

                }

                }

              
                console.log(req.body.receiver.length)
               
                res.send("Added Rs." + req.body.amount + "to" + req.body.receiver + " Account")
                return
            }
            else{
                console.log(req.body.inpamount)
                console.log(req.body.inpdescribe)
                console.log(req.body.receiver)
                console.log(req.file)
                console.log(req.body.amount)
                console.log(req.body.lender)
                
               if(req.body.size == 1){
                Passbook.create({
                    Lender: req.body.lender,
                    Receiver: req.body.receiver,
                    Day : new Date().getDate(),
                    Month: new Date().getMonth() + 1,
                    Year: new Date().getFullYear(),
                    Time: new Date().getHours() + ':' + new Date().getMinutes()+ ':' + new Date().getSeconds(),
                    Amount: req.body.amount,
                    Bill: req.file.filename,
                    Description: req.body.inpdescribe

                })
                    

               }else{
                for(let i=0;i<req.body.receiver.length;i++){
                    Passbook.create({
                        Lender: req.body.lender,
                        Receiver: req.body.receiver[i],
                        Day : new Date().getDate(),
                        Month: new Date().getMonth() + 1,
                        Year: new Date().getFullYear(),
                        Time: new Date().getHours() + ':' + new Date().getMinutes()+ ':' + new Date().getSeconds(),
                        Amount: req.body.amount,
                        Bill: req.file.filename,
                        Description: req.body.inpdescribe
    
                    })
                        
                

                }

               }
                
               
                res.end("Uploaded Successfully")
               
               
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

app.post('/addfriend',(req,res)=>{
Users.findOne(
    {where:
        {
            Username : req.body.friendname
    }
}).then((user)=>{
    if(user){
        Friends.findOne({
            where:{
                Username:req.body.username,
                Friend: req.body.friendname
            }
        }).then((friend)=>{
            if(friend){
                res.send("Already")
        
            }else{
                Friends.create({
                    Username: req.body.username,
                    Friend: req.body.friendname
                }).then((friend)=>{
                    res.send("Success")
                }).catch((err)=>{
                    res.send("Failure")
                })
            
            }
            })
    }else{
        res.send("No existence")
    }

   

  
})
})

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
                extension: user.Extension
               
            })
        }
    }).catch((err)=>{
        res.send(err)
    })
})

app.post('/getallusers',(req,res)=>{
    let users = []
    Users.findAndCountAll().then((user)=>{
        for(let i=0;i<user.count;i++){
           users.push({name:user.rows[i].dataValues.Username,
            extension: user.rows[i].dataValues.Extension
        })
        }
        res.send(users)
    }).catch((err)=>{
        res.send(err)
    })

})

app.post('/friends',(req,res)=>{
    let friends = []
    Friends.findAndCountAll({
        where:{
            Username:req.body.user
        }
    }).then((friend)=>{
        if(friend){
            for(let i=0;i<friend.count;i++){
               friends.push(friend.rows[i].dataValues.Friend)
            }
            res.send(friends)
        }else{
            res.send("No friends")
        }

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