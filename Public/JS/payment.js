const method = document.querySelectorAll('#payment input');
const details = document.querySelector('#details');
const card =  document.querySelector('#card');
const cash = document.querySelector('#cashed');
method[0].addEventListener('change', function () {
    if (method[0].checked) {
        details.style.display = 'none';
        cash.style.display = 'block';
        card.style.display = 'none';
        }
    else
    {
        details.style.display = 'block';
        cash.style.display = 'none';
        card.style.display = 'block';
    }
});

method[1].addEventListener('change', function () {
    if (method[0].checked) {
        details.style.display = 'none';
        cash.style.display = 'block';
        card.style.display = 'none';
        }
    else
    {
        details.style.display = 'block';
        cash.style.display = 'none';
        card.style.display = 'block';
    }
});
