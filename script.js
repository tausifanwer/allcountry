const countriesContainer = document.querySelector(".countries-container");
const filterByRegion = document.querySelector(".continent");
const searchInput = document.querySelector(".search-container input");
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
  if (storage) {
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

let allCountries;
fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    countryRender(data);
    allCountries = data;
  });

filterByRegion.addEventListener("change", (e) => {
  fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
    .then((res) => res.json())
    .then((data) => {
      countryRender(data);
    });
});

function countryRender(data) {
  countriesContainer.innerHTML = "";
  data.forEach((country, index) => {
    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `/country.html?name=${country.name.common}`;
    const cardHtml = `
    <img src="${country.flags.svg}" alt="" srcset="">
    <div class="card-text">
        <h3 class="card-title">${country.name.common}</h3>
        
        <p> <b>Population: </b>${country.population.toLocaleString("en-IN")}</p>
        <p> <b>Region: </b>${country.region} </p>
        <p> <b>Capital: </b>${country.capital || "No-Capital"} </p>
    </div>
    `;

    countryCard.innerHTML = cardHtml;
    countriesContainer.append(countryCard);
  });
}

searchInput.addEventListener("input", (e) => {
  const filterCountries = allCountries.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  );
  countryRender(filterCountries);
});

// const countryCard = document.createElement('a')
// countryCard.classList.add("country-card")
// const cardHtml = `
//     <img src="https://flagcdn.com/cy.svg" alt="" srcset="">
//     <div class="card-text">
//         <h3 class="card-title">Republic of Cyprus</h3>
//         <p> <b>Population: </b>21,71,000 </p>
//         <p> <b>Region: </b>Europe </p>
//         <p> <b>Capital: </b>Berlin </p>
//     </div>
// `
// countryCard.innerHTML= cardHtml
// countriesContainer.append(countryCard)

// const cardImage= document.createElement("img")
// const cardText = document.createElement( "div" )
// cardText.classList.add("card-text")
// const  title = document.createElement("h3");
// title.classList.add("card-title")
// const p1 = document.createElement( 'p' );
// const bold1= document.createElement('b');
// p1.append(bold1);
// const p2 = document.createElement( 'p' );
// const bold2= document.createElement('b');
// p2.append(bold2);
// const p3 = document.createElement( 'p' );
// const bold3= document.createElement('b');
// p3.append(bold3);
// cardText.append(title,p1,p2,p3)
// countryCard.append(cardImage,cardText)
