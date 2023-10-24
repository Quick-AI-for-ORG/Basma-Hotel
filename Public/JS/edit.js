let ed = function(firstname, lastname, email, phone, address) {
    let form = document.getElementById("editor");
    let inputs = document.getElementsByClassName("edited");
    let former = document.querySelectorAll("#editor input")
    if(inputs[0].value == ""){
        former[0].value = firstname;
    }
    if(inputs[1].value == ""){
        former[1].value = lastname;
    }
    if(inputs[2].value == ""){
        former[2].value = email;
    }
    if(inputs[3].value == ""){
        former[3].value = phone;
    }
    if(inputs[4].value == ""){
        former[4].value = address;
    }
    form.submit();
}