function search(field){
        fetch('/room/findRooms',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({Title: field.value})
        }).then((res=>res.json())).then(result =>{
            if( result.length != 0){
            let elements =  get(result)
            document.getElementById('searchResults').innerHTML = elements
            document.getElementById('searchResults').style.display = 'block'
            }
        })
}

function get(result) {
    let elements = "";
    for (let i = 0; i < result.length; i++) {
        elements += `
            <a href="/room/details/${result[i].Title}" class="text-decoration-none">
                <div class="d-flex align-items-center py-2">
                    <img src="${result[i].imageURL}" width="50" height="50" class="rounded-circle">
                    <div class="ms-2">
                        <p class="m-0">${result[i].Title}</p>
                        <p class="m-0">${result[i].startingPrice} EGP</p>
                    </div>
                </div>
            </a>`;
    }

    // Wrap elements in a scrollable container
    let scrollableContainer = `
        <div class="scrollable-list" style="max-height: 200px; overflow-y: auto;">
            ${elements}
        </div>`;

    return scrollableContainer;
}
