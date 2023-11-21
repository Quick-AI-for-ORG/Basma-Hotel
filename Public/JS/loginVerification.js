function checkLogin(){
    let mail = document.getElementById("mail")
    let password = document.getElementById("password")

    if(mail.value!=''){
        fetch('/guest/checkLogin',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({mail: mail.value, password: password.value})
        }).then(res => res.json()).then(result =>{ 
            console.log("I AM HERERERERE")
            errorMessage = document.getElementById("loginError")
            let checkSubmitable = false;
        if(result.result=='not found'){
           errorMessage.style.display='block'
           errorMessage.style.color='red'
           errorMessage.innerHTML = "Email or password is incorrect"
           
        }
        else{
           errorMessage.style.display='none'
                checkSubmitable = true;
              submitable(checkSubmitable)
          }
          })
        }
}

function submitable(checkSubmitable){
    if(checkSubmitable==true){ 
    document.querySelector('form').submit()
}
}