function search(field){
    console.log("hi")
        fetch('/room/findRooms',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({Title: field.value})
        }).then((res=>res.json())).then(result =>{
            console.log(result)
        })
}