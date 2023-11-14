document.getElementsByClassName("pw")[0].onkeyup = function() {confirmPass()};
document.getElementsByClassName("cpw")[0].onkeyup = function() {confirmPass()};

ve=false

vp=true

function confirmPass(){
    let p = document.getElementsByClassName("pw")[0].value
    let cp = document.getElementsByClassName("cpw")[0].value
    let x = document.getElementsByClassName("pswe")[0]
    if(p!=cp && cp!=""){
    x.style.display='block'
    vp=false
    }
    else {
    x.style.display='none'
    vp=true
    }
}
function checkMail(mail){
    if(mail.value!=''){
        fetch('/guest/checkMail',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({mail: mail.value})
        }).then(res => res.json()).then(result =>{ 
            txt=document.getElementsByClassName("cMail")[0]
        if(result.result=='not found'){
           txt.style.display='none'
           ve=true
        }
        else{
           txt.style.display='block'
           ve=false
          }
          })
        }
        else{
             txt.style.display='none'
        }
}
function submitable(){
    if((ve==true) && (vp==true)){ 
    document.querySelector('form').submit()
}
}
