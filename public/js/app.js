const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector("#id1");
const messageTwo = document.querySelector("#id2");




weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    const searchaddress = 'http://localhost:3000/weather?address=' + encodeURIComponent(location)
    fetch(searchaddress).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error;
            } else {
                chanceToRain = data.forcastData.precipProbability * 100 + '%'
                messageOne.textContent = 'Location: ' + data.location
                messageTwo.textContent = 'Weather: looks ' + data.forcastData.summary + ' The temperature is ' + data.forcastData.temperature + 'F. And ' + chanceToRain+ " chance to rain"
            }
            
        })
    })
})