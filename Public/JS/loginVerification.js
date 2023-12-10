let checkSubmitable = false
function checkLogin(event){
    event.preventDefault()

    let mail = document.getElementById("mail")
    let password = document.getElementById("password")

    if(mail.value!=''){
        fetch('/user/validateLogin',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: mail.value, password: password.value})
        }).then(res => res.json()).then(result =>{ 

            errorMessage = document.getElementById("loginError")

        if(result.result=='not found'){
           errorMessage.style.display='block'
           errorMessage.style.color='red'
           errorMessage.innerHTML = "Email or password is incorrect"
           
        }
        else{
           errorMessage.style.display='none'
                checkSubmitable = true;
             
          }
          })
        }
}

function submitable(event){
    event.preventDefault()
    if(checkSubmitable==true){ 
    document.querySelector('form').submit()
}
}