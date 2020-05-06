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
$('#divcontent').hide()

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
            

            $.post('/dp',{
                username: data.username
            },(extension)=>{

                
                // let image = $(`<b>Welcome ${data.name}</b><img src="./uploads/myimage-${data.username}${extension}" style="height: 90px;width: 100px;margin-left: 390px;"></img>`)
                    divinfo.append($(`
                    <div class="row">
                    <div class="col-8"  style="display: inline;padding: 0px;"> 
                        <b style="font-size: 18pt;">Welcome ${data.name} !!!</b> 
                    </div>
                    <div class="col-3" style="display: inline;padding: 0px;">
                    <img src="./uploads/myimage-${data.username}${extension}" style="height: 80px;width: 80px;display: inline;border-radius:50%">
                    </div>
                </div>
                    
                    `))
            })
            
           
      
           
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


