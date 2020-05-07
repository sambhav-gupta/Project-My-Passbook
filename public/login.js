let inpfile = $('#inputGroupFile02')
let btnadd = $('#btnadd')
let inpusername1 = $('#inpusername1')
let inpusername2 = $('#inpusername2')
let inppassword1 = $('#inppassword1')
let inppassword2 = $('#inppassword2')
let divimg = $('#divimg')
let btnsignup = $('#btnsignup')
let btnsignin = $('#btnsignin')
let divinfo  = $('#divinfo')
let inpfname = $('#inpfname')
let inplname = $('#inplname')
let inpblob = $('#inpblob')
let btnlogout = $('#oplogout')


    

// btnlogout.hide()
// $('#divcontent').hide()

btnadd.click(()=>{
    let filea = inpfile[0].files[0]

    const sources = URL.createObjectURL(filea);
       $('#img').hide()
        divimg.append($(`<img src="${sources}" style="width: 125px;height: 145px;"></img>`))
    
})

// btnsignup.click(()=>{

//     $.post('/signupdb',{
//         fname: inpfname.val(),
//         lname: inplname.val(),
//         username: inpusername1.val(),
//         password: inppassword1.val(),
//     },(data)=>{
//         if(data=="User Already Exists"){
//             alert("User already exists. Please login or Signup with a different ID")
//         }else{
//             alert("Signed up Successfully. Please Login to Continue..")
//         }
//     })
// })

let currentuser = {}
btnsignin.click(()=>{
    $.post('/signin',{
        username: inpusername2.val(),
        password: inppassword2.val()
    },(data)=>{
        if(data == "Wrong Password"){
            alert("Wrong Password Entered")
            return
        }else if(data == "Sign up"){
            alert("No such user found. Please Sign up to continue!!")
            return
        }else{
            $('#divcontent').show()
            currentuser.name = data.username
            $('#c1').hide()
            btnlogout.show()
            

          

                
                // let image = $(`<b>Welcome ${data.name}</b><img src="./uploads/myimage-${data.username}${extension}" style="height: 90px;width: 100px;margin-left: 390px;"></img>`)
                    divinfo.append($(`
                    <div class="row">
                    <div class="col-8"  style="display: inline;padding: 0px;"> 
                        <b style="font-size: 18pt;">Welcome ${data.name} !!!</b> 
                    </div>
                    <div class="col-3" style="display: inline;padding: 0px;">
                    <img src="./uploads/myimage-${data.username}${data.extension}" style="height: 80px;width: 80px;display: inline;border-radius:50%">
                    </div>
                </div>
                    
                    `))
       
            
           
      
           
        }
    })
})


$('#sldiv').change(function(){
    $("#sldiv option:selected ").each(function(){
        console.log($(this).text())
        if($(this).text()== "Logout"){
            $.post('/signout',{
                username: currentuser.name
            },(data)=>{
                if(data=="loggedout"){
                   location.reload()
                }
            })

        }
    })
})

function myfun(id){
    $('#inpuser').val(id)
    $('.append').hide()
    $('#btnfriend').attr('disabled',false)
}


$('#btnfriend').click(()=>{
   $.post('/addfriend',{
       username : currentuser.name,
       friendname: $('#inpuser').val()
   },(data)=>{
       if(data=="Success"){
           alert("Succesfully added friend")
           location.reload()
       }else if(data == "Failure"){
           alert("Failed to Add friend")
       }else if(data == "Already"){
           alert("Already a friend")
       }else if(data=="No existence"){
           alert("No such user exists")
       }
   })
})
let friendlist = []
$.post('/getallusers',(data)=>{
    console.log(data)
    for(let i=0;i<data.length;i++){
        friendlist.push(data[i].name)
    
        $('#friendlist').append($(`<div id="${data[i].name}" class="append" onclick="myfun(this.id)" style="display:none;border-bottom:1px solid black;width: 220px;background-color: yellowgreen;height: 50px;text-align: center;font-weight: bolder;font-size: 11pt;font-family: Arial, Helvetica, sans-serif;"">
        ${data[i].name}
        <img style="width:40px;height:40px;margin-top:5px"   src="./uploads/myimage-${data[i].name}${data[i].extension}">
        
        </div>`))
    }

})


$('#inpuser').keypress((e)=>{
    console.log($('#inpuser').val()+e.key)
    let length = $('#inpuser').val().length
        console.log(length)

    for(let i=0;i<friendlist.length;i++){
        if(friendlist[i].slice(0,length+1) == $('#inpuser').val()+e.key){
            console.log(friendlist[i])
            $('#'+friendlist[i]).show()

        }else{
            $('#'+friendlist[i]).hide()
            continue
        }
    }
})


$('#inpuser').keydown((e)=>{
if(e.which == 8){
    console.log($('#inpuser').val())
    if($('#inpuser').val().length == 1){
       $('.append').hide()
    }
   

}
})