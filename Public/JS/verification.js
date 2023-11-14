document.getElementsByClassName("pw")[0].onkeyup = function() {confirmPass()};
document.getElementsByClassName("cpw")[0].onkeyup = function() {confirmPass()};
function confirmPass() {
    let p = document.getElementsByClassName("pw")[0].value
    let cp = document.getElementsByClassName("cpw")[0].value
    let x = document.getElementsByClassName("pswe")[0]
    console.log("literally me")
    if(p!=cp && cp!="")
    x.style.display='block'
    else 
    x.style.display='none'
}