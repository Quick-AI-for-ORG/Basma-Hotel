const today = new Date();
const formattedToday = today.toISOString().split('T')[0];
document.getElementById('arrivalDate').setAttribute('min', formattedToday);
document.getElementById('arrivalDate').valueAsDate = new Date();
let nextDay = new Date(document.getElementById('arrivalDate').valueAsDate);
nextDay.setDate(nextDay.getDate() + 1);
document.getElementById('departureDate').setAttribute('min', nextDay.toISOString().split('T')[0])
document.getElementById('arrivalDate').addEventListener('change', function () {
    nextDay = new Date(document.getElementById('arrivalDate').valueAsDate);
    nextDay.setDate(nextDay.getDate() + 1);
    document.getElementById('departureDate').setAttribute('min', nextDay.toISOString().split('T')[0])
})
document.getElementById('departureDate').addEventListener('change', function () {
    let previousDay = new Date(document.getElementById('departureDate').valueAsDate);
    previousDay.setDate(previousDay.getDate() - 1);
    document.getElementById('arrivalDate').setAttribute('max', previousDay.toISOString().split('T')[0])
})