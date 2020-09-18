const proxy = "https://cors-anywhere.herokuapp.com/";

const api = {
  key: "f25bee67df7c45d451a56cd01204b8a5",
  base: `${proxy}https://api.openweathermap.org/data/2.5/`,
};

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  let icon = document.querySelector(".weathercon");
  icon.innerHTML = `<img  src=https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png alt="alternative" />`;
  let loc = document.querySelector(".location");
  loc.innerText = `${weather.name}`;

  let now = new Date();
  let date = document.querySelector(".date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}`;

  let summ = document.querySelector(".summary");
  summ.innerText = weather.weather[0].main;

  searchbox.value = "";
}

function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
