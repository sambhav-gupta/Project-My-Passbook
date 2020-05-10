

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


// $('#c1').hide()
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
let friendlist = []
let contactlist =[]
$.post('/getallusers',(data)=>{
    console.log(data)
    for(let i=0;i<data.length;i++){
        friendlist.push({name: data[i].name,extension:data[i].extension})

    
        $('#friendlist').append($(`<div id="${data[i].name}" class="append" onclick="myfun(this.id)" style="display:none;border-bottom:1px solid black;width: 280px;background-color: yellowgreen;height: 50px;text-align: center;font-weight: bolder;font-size: 11pt;font-family: Arial, Helvetica, sans-serif;"">
        ${data[i].name}
        <img style="width:40px;height:40px;margin-top:5px"   src="./uploads/myimage-${data[i].name}${data[i].extension}">
        
        </div>`))

        
        $('#contactlist').append($(`<div id="contact${data[i].name}" class="prepend" onclick="secondfun(this.id)" style="display:none;border-bottom:1px solid black;width: 280px;background-color: yellowgreen;height: 50px;text-align: center;font-weight: bolder;font-size: 11pt;font-family: Arial, Helvetica, sans-serif;"">
        ${data[i].name}
        <img style="width:40px;height:40px;margin-top:5px"   src="./uploads/myimage-${data[i].name}${data[i].extension}">
        
        </div>`))
    }

})
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
                    <div class="row" style="margin-bottom:20px;">
                    <div class="col-8"  style="display: inline;padding: 0px;margin-left:10px"> 
                        <b style="font-size: 18pt;">Welcome ${data.name} !!!</b> 
                    </div>
                    <div class="col-3" style="display: inline;padding: 0px;">
                    <img src="./uploads/myimage-${data.username}${data.extension}" style="height: 80px;width: 80px;display: inline;border-radius:50%">
                    </div>
                </div>
                    
                    `))
                
                    $.post('/friends',{
                        user: currentuser.name
                    },(data)=>{
                        for(let i=0;i<data.length;i++){
                            contactlist.push(data[i])
                            if(friendlist.findIndex(j => j.name == data[i] ) !=-1){
                                let index = friendlist.findIndex(j => j.name == data[i] )
                                $('#divlist').append(`<div id="btnaccount${friendlist[index].name}" onclick="Load(this.id)" class="list" style="text-align: center;font-size: 15pt;border-bottom: 2px black solid;">${friendlist[index].name}
                             <img src="./uploads/myimage-${friendlist[index].name}${friendlist[index].extension}" style="width:40px;height:40px;border-radius:50%;"></div>`)

                                
                            }
                        }
                    })
                    // for(let i=0;i<friendlist.length;i++){
                    //     if(friendlist[i].name==currentuser.name){
                    //         continue
                    //     }else{
                    //         $('#divlist').append(`<div id="btn${friendlist[i].name}" onclick="Load(this.id)" class="list" style="text-align: center;font-size: 15pt;border-bottom: 2px black solid;">${friendlist[i].name}
                    //         <img src="./uploads/myimage-${friendlist[i].name}${friendlist[i].extension}" style="width:40px;height:40px;border-radius:50%;"></div>`)
                    //     }
                    // }
       
            
                    
      
           
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
    $('#friendlist').hide()
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



$('#inpuser').keypress((e)=>{
    $('#friendlist').show()
    console.log($('#inpuser').val()+e.key)
    let length = $('#inpuser').val().length
        console.log(length)

    for(let i=0;i<friendlist.length;i++){
        if(friendlist[i].name== currentuser.name){
            continue
            
        }
        else{

        
        if(friendlist[i].name.slice(0,length+1) == $('#inpuser').val()+e.key){
         
            $('#'+friendlist[i].name).show()

        }else{
            $('#'+friendlist[i].name).hide()
            continue
        }
    }
    }
})


$('#inpuser').keydown((e)=>{
if(e.which == 8){
    console.log($('#inpuser').val())
    if($('#inpuser').val().length == 1){
       $('.append').hide()
       $('#friendlist').hide()
    }
   

}
})

$('#inpname').keypress((e)=>{
    
    $('#contactlist').show()
    let length = $('#inpname').val().length

    for(let i=0;i<contactlist.length;i++){
        if(contactlist[i]== currentuser.name){
            continue
            
        }
        else{

        
        if(contactlist[i].slice(0,length+1) == $('#inpname').val()+e.key){
         
            $('#contact'+ contactlist[i]).show()

        }else{
            $('#contact'+contactlist[i]).hide()
            continue
        }
    }
    }

})
$('#ulmenu').empty()
$('#inpname').keydown((e)=>{
    if(e.which == 8){
     
        if($('#inpname').val().length == 1){
           $('.prepend').hide()
           $('#contactlist').hide()
        }
       
    
    }
    })


    function secondfun(id){
        
        let name = id.split("contact")[1]
        $('#inpname').val("")
        $('#contactlist').hide()
        $('#ulmenu').show()
        $('#ulmenu').append(
            $(`<li class="list-group-item" id="li${id}">
            <b>${name}</b>
            <button id="btn${id}" onclick="remove(this.id)" class="btn btn-danger btn-sm">X</button>
            </li>`)


        )
    

    }
    function remove(id){
        let item = id.split("btncontact")[1]
      
        $('#licontact'+item).remove()
        if($('#ulmenu').is(':empty')){
            
            $('#ulmenu').hide()
        }
       
    }

    let items = []
    $('#inpbill').change((e)=>{

      
        items =  e.target.files
    
        
     })
     $('#btnupload').click(()=>{

        if($('#inpbill').prop('files').length == 0){
            alert("No Image Selected")
        
            $('#inpbill').val("")
            return
            
        }

        // if($('#inpbill').prop('files').length >3){
        //     alert("More than 3 Images Selected")
        
        //     $('#inpbill').val("")
            
            
        // }
        $('#divappend').empty()
        $('#divappend').show()
        $('#btnremove').show()
        console.log($('#inpbill').prop('files'))
        for(let i=0;i<items.length;i++){
            let source = URL.createObjectURL(items[i])
            $('#divappend').append($(`
            
               <img src="${source}" style="height:160px;width:160px" id="li${i}">
               
               
            `))
        }

     })
 
    $('#btnremove').click(()=>{
$('#btnremove').hide()
        $('#divappend').hide()
        console.log("clicked")
        $('#divappend').empty()
        $('#inpbill').val("")
        console.log($('#inpbill').prop('files'))
    })
    $("#frmbill").submit(function(e) {
        e.preventDefault(); 
let amount = $('#inpamt').val()

if(amount ==0){
    alert("Amount cant be 0")
    $('#inpbill').val("")
    return
}

        let arr = []
        $("#ulmenu b").each(function(index){
            arr.push($(this).text())
        })
       
if(arr.length ==0){
    alert("Please select Someone")
    return
}
        console.log(arr)
        let receivers = arr.length + 1
        let finalamount = amount/receivers
        console.log(receivers)
        console.log(finalamount)
          
        var formData = new FormData(this);
        // if(arr.length ==1){
        //     formData.append()
        // }
        let size = arr.length
        for(let i=0;i<arr.length;i++){
            formData.append("receiver", arr[i])

        }
        
    formData.append("amount",finalamount)
    formData.append("lender",currentuser.name)
    formData.append("size",size)
    console.log(formData)
    
    $('#divappend').empty()
    $('#divappend').hide()
    $('#btnremove').hide()
$('#ulmenu').empty()
$('#ulmenu').hide()
        $.ajax({
            url: "/uploadbill",
            type: 'POST',
            data: formData,
            
            success: function (data) {
                alert(data)
                $('#inpbill').val("")
                return
                
            },
            catch: false,
            contentType: false,
            processData: false
        });
    });

    function Load(id){
        let receiving = 0
        let giving = 0
        $('#btnhide').show()
        $('#divowe').empty()
        $('#ulaccount').empty()
        id = id.split("btnaccount")[1]
        $('#rowadd').hide()
        $('#friendaccount').show()
        $('#divupper').hide()
        $('#divupper').empty()
        $.post('/getaccountdetailsgreen',{
            lender: currentuser.name,
            receiver: id

        },(data)=>{
            console.log(data)
            if(data == "No data"){
                alert("No data with this account")
                $('#rowadd').show()
                $('#friendaccount').hide()
                $('#btnhide').hide()
return
            }else{
                for(let i=0;i<data.length;i++){
                    if(data[i].Deleted){
                        $('#ulaccount').append($(`
                        <li class="list-group-item" id="${id}[[-]]${data[i].id}"  onclick="info(this.id)" style="color: green;">
                        <b style="text-decoration: line-through;">Rs.${data[i].Amount}</b>
                        
                        </b>
                        <div id="span${data[i].id}" style="height:60px;width:100px;display:inline;" class="diviteminfo"></div>
                        
                        </li>
                        
                        
                        `))
                    }else{
                        receiving += data[i].Amount
                        console.log(receiving)
                        $('#ulaccount').append($(`
                        <li class="list-group-item" id="${id}[[-]]${data[i].id}"  onclick="info(this.id)" style="color: green;">
                        <b>Rs.${data[i].Amount}</b>
                        <div id="span${data[i].id}" style="height:60px;width:100px;display:inline;" class="diviteminfo"></div>
                        </li>
                        
                        
                        `))
                       
        
                    }
                   

                    }
                    $('#divowe').append($(`
                    <b style="color:green;">${id} owe you Rs. ${receiving}</b><br>
                    
                    `))
                   

            }
           
        })
        $.post('/getaccountdetailsred',{
            lender: currentuser.name,
            receiver: id

        },(data)=>{
            console.log(data)
            if(data == "No data"){
                return
                
            }else{
                for(let i=0;i<data.length;i++){
                    if(data[i].Deleted){
                        $('#ulaccount').append($(`
                        <li class="list-group-item" id="${id}[[-]]${data[i].id}" onclick="info(this.id)"  style="color: red;text-align: right;">
                        <b style="text-decoration: line-through;">Rs.${data[i].Amount}</b>
                        <div id="span${data[i].id}" style="height:60px;width:100px;display:inline;" class="diviteminfo"></div>
                        </li>
                        
                        
                        `))
                    }else{
                        giving += data[i].Amount
                    console.log(giving)
                    $('#ulaccount').append($(`
                    <li class="list-group-item" id="${id}[[-]]${data[i].id}" onclick="info(this.id)"  style="color: red;text-align: right;">
                    <b>Rs.${data[i].Amount}</b>
                    <div id="span${data[i].id}" style="height:60px;width:100px;display:inline;" class="diviteminfo"></div>
                    </li>
                    
                    
                    `))
                   
    
                }
              

                    }
                    $('#divowe').append($(`
                    <b style="color:red;">You owe Rs.${giving} to ${id}</b><br>
                    
                    `))
                    
               

            }
           
        })
      


    }
   
    $('#btnhide').click(()=>{
        $('#friendaccount').hide()
        $('#rowadd').show()
        $('#btnhide').hide()

    })

    function info(id){
        $('.diviteminfo').empty()
        let name = id.split("[[-]]")[0]
        let number = id.split("[[-]]")[1]
        console.log("clicked" + id)
        $('#divupper').empty()
        $('#divupper').hide()
        $('#divupper').append($(`
        <button id="${name}btndelete${number}" class="btn btn-primary" style="margin-left: 350px" onclick="deleteitem(this.id)"><svg class="bi bi-trash-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M2.5 1a1 1 0 00-1 1v1a1 1 0 001 1H3v9a2 2 0 002 2h6a2 2 0 002-2V4h.5a1 1 0 001-1V2a1 1 0 00-1-1H10a1 1 0 00-1-1H7a1 1 0 00-1 1H2.5zm3 4a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7a.5.5 0 01.5-.5zM8 5a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 018 5zm3 .5a.5.5 0 00-1 0v7a.5.5 0 001 0v-7z" clip-rule="evenodd"/>
      </svg></button>
        <button id="btninfo${number}" class="btn btn-primary" onclick="infoitem(this.id)"><svg class="bi bi-info-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/>
        <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z"/>
        <circle cx="8" cy="4.5" r="1"/>
      </svg></button>
        <button onclick="removebuttons()" class="btn btn-primary" ><svg class="bi bi-x" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z" clip-rule="evenodd"/>
        <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z" clip-rule="evenodd"/>
      </svg></button>
        
        
        `))
        $('#divupper').show()

    }
    function removebuttons(){
        $('#divupper').hide()
        $('#divupper').empty()
        $('.diviteminfo').hide()
        $('.diviteminfo').empty()
    }

    function deleteitem(id){
        let number = id.split("btndelete")[1]
        let name = id.split("btndelete")[0]
        $.post('/deleteitem',{
            id: number
        },(data)=>{
            $('#'+id).css("text-decoration", "line-through")
           
                alert("deleted item")
                $('#divupper').empty()
                $('#divupper').hide()
                Load("btnaccount"+name)

            
        })
        

    }
    function infoitem(id){

        let item  = id.split("btninfo")[1]
        console.log(item)
        $.post('/getitemhistory',{id : item},(data)=>{
            $('#span'+item).append(
                $(`
               <t> Date : ${data.Day}/${data.Month}/${data.Year}
                Time: ${data.Time}
                ${data.Description}</t>
                `)
               
            )


        })
        $('.diviteminfo').show()
       

    }
    