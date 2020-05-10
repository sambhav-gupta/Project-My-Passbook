const {db,Users,Friends,Passbook} = require('./database')


Passbook.findOne({where:{
    id: 10
}}).then((user)=>{
    console.log(user.Time)
})
