const method = document.querySelectorAll('#payment input');

method[0].addEventListener('change', function () {
    if (method[0].checked) 
        document.querySelector('#details').style.display = 'none';
    else
        document.querySelector('#details').style.display = 'block';
});

method[1].addEventListener('change', function () {
    if (method[0].checked) 
        document.querySelector('#details').style.display = 'none';
    else
        document.querySelector('#details').style.display = 'block';
});
method[0].checked = true;