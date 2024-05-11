const backBtn = document.querySelector(".back-btn");
const countryName = new URLSearchParams(window.location.search).get("name");
const borderCountry = document.querySelector(".border-country");
const nativeName = document.querySelector(".native-name");
const currencies = document.querySelector(".curr");
const language = document.querySelector(".lang");
const title = document.querySelector("title");
title.innerText = `Countries/${countryName}`;
const favicon = document.querySelector(".favicon");
const body = document.querySelector("body");
const darkMode = document.querySelector(".header-container p");
let storage = JSON.parse(localStorage.getItem("isDark"));

if (storage) {
  body.classList.remove("dark");
  darkMode.innerHTML =
    '<i class="fa-regular fa-moon"></i>&nbsp;&nbsp; Dark Mode';
} else {
  darkMode.innerHTML =
    '<i class="fa-regular fa-sun"></i>&nbsp;&nbsp; Light Mode';
}

darkMode.addEventListener("click", () => {
  storage = JSON.parse(localStorage.getItem("isDark"));
  if (storage === true) {
    darkMode.innerHTML =
      '<i class="fa-regular fa-sun"></i>&nbsp;&nbsp; Light Mode';
    body.classList.toggle("dark");
    JSON.stringify(localStorage.setItem("isDark", false));
  } else {
    darkMode.innerHTML =
      '<i class="fa-regular fa-moon"></i>&nbsp;&nbsp; Dark Mode';
    body.classList.toggle("dark");
    JSON.stringify(localStorage.setItem("isDark", true));
  }
});

let nat = "";
let cu = "";
let la = "";
backBtn.addEventListener("click", (e) => {
  console.log(e);
  window.location.href = "index.html";
});

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then((data) => {
    favicon.href = data[0].flags.png;
    if (data[0].name.nativeName === undefined) {
      nat = data[0].name.common;
    } else {
      nat = Object.values(data[0].name.nativeName)[0].official;
    }
    if (data[0].currencies === undefined) {
      curr = "No Currencies";
    } else {
      curr = Object.values(data[0].currencies)[0].name;
    }
    if (data[0].languages === undefined) {
      la = "No Languages";
    } else {
      la = Object.values(data[0].languages).join(", ");
    }

    const countryDetails = document.querySelector(".country-details");
    countryDetails.innerHTML = `
    <img src="${data[0].flags.svg}" alt="" class="country-img" />
    <div class="country-content">
    <h1 class="coutry-name">${data[0].name.common}</h1> 
    <div class="country-info">
    <p class="native-name"><b>Native Name: </b>${nat}</p>
    <p><b>Population: </b>${data[0].population.toLocaleString("en-IN")}</p>
<p><b>Region: </b>${data[0].region}</p>
<p><b>Sub-Region: </b>${data[0].subregion || "No Sub-Region"}</p>
<p><b>Capital: </b>${data[0].capital || "No Capital"}</p>
<p><b>Top Level Domain: </b>${data[0].tld[0]}</p>
<p class="curr"><b>Currencies: </b>${curr}</p>
<p class="lang"><b>Language: </b>${la}</p>
</div>
<div class="border-country">
<p class="inf"><b>Border Countries: </b>&nbsp;

</p>
</div>
</div>
`;

    if (data[0].borders === undefined) {
      info = document.querySelector(".inf");
      borderA = document.createElement("a");
      borderA.innerText = "No Border Country";
      info.append(borderA);
    } else {
      data[0].borders.forEach((element) => {
        let info = document.querySelector(".inf");
        const borderA = document.createElement("a");
        fetch(`https://restcountries.com/v3.1/alpha/${element}`)
          .then((res) => res.json())
          .then((dataB) => {
            borderA.href = `/country.html?name=${dataB[0].name.common}`;
            borderA.innerText = dataB[0].name.common;

            info.append(borderA);
          });
      });
    }
  });

//   async function getData(value) {
//     try {
//       const response = await fetch('https://api.openweathermap.org/data/2.5/weather/?q=' + value + '&appid=dffc95779a17f72fafa72526c99d3162');
//       const weatherData = await response.json();

//       document.querySelector('#city').innerHTML = weatherData.name;
//       let Celsius  = Math.floor((weatherData.main.temp -32 )*5.0/9.0);
//       console.log(Celsius);
//       document.querySelector('#temp').innerHTML = Celsius;
//       document.querySelector('#maxmin').innerHTML = "mi
