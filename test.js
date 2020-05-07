const {db,Users,Friends} = require('./database')

Users.findOne({
    where: {
        Username : ""}
}
   
).then((user)=>{
    console.log(user)
    if(user){
        Friends.findOne({
            where:{
                Username: "sambhav-gupta",
                Friend: "adhiraj-seth"
            }
        }).then((friend)=>{
            if(friend){
                console.log("Already")
        
            }else{
                Friends.create({
                    Username: "sambhav-gupta",
                    Friend: "adhiraj-seth"
                }).then((friend)=>{
                    console.log("Success")
                }).catch((err)=>{
                console.log("Failure")
                })
            
            }
            })
    }else{
        console.log("No existence")
    }

   

  
}).catch((err)=>{
    console.log("Empty")
})