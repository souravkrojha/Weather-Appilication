let loc = document.getElementById("location");
let temp = document.querySelector(".temp");
let summ = document.querySelector(".summary");
let date1 = document.querySelector(".date");

window.addEventListener("load", () => {
  let lat;
  let lng;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lat = position.coords.latitude;
      lng = position.coords.longitude;
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const Url = `${proxy}https://api.darksky.net/forecast/55228a867e4928ee7e4484b09d4d97a9/${lat},${lng}/?units=si`;
      fetch(Url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { temperature, summary, icon } = data.currently;
          let now = new Date();
          const { timezone } = data;
          temp.textContent = temperature;
          summ.textContent = summary;
          loc.innerText = timezone;
          setIcons(icon, document.querySelector(".icon1"));
          let time = dateBuilder(now);
          date1.textContent = time;
        });
    });
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
  function setIcons(icon, iconId) {
    const skycons = new Skycons({ color: "#00bfa6" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconId, Skycons[currentIcon]);
  }
});
