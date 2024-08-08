const url = `https://api.openweathermap.org/data/2.5/`
const key =  `4460b35a5d57ccd8dc05e145f0aaf7cd`
const searchBar = document.getElementById('searchBar');



const temizle = () => {
    searchBar.value = '';
}

const setQuery = (tus) => {
    if(tus.keyCode == '13' || tus.keyCode == '32') {
        getResult(searchBar.value)
        temizle();
    }


}
const getResult = (cityName) => {
    let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`
    fetch(query)
    .then(weather => {
        return weather.json()
    })
    .then(displayResult)
}

const displayResult = (result) => {
    let city = document.querySelector(".city");
    city.innerText = `${result.name}, ${result.sys.country}`

    let temp = document.querySelector(".temp");
    temp.innerText = `${Math.round(result.main.temp)+'°C'}`

    let desc = document.querySelector(".desc");
    desc.innerText = `${result.weather[0].description}`

    let minmax = document.querySelector(".minmax")
    minmax.innerText = `${Math.round(result.main.temp_min)+ '°C'} / ${Math.round(result.main.temp_max)+ '°C'}`
    
         
}


searchBar.addEventListener('keypress', setQuery);   
