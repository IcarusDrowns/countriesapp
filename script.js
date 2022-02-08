const countriesList = document.getElementById("countries");
const searchBox = document.getElementById("search");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close");

getCountries();

async function getCountries() {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const countries = await res.json();

  displayCountries(countries);
}

function displayCountries(countries) {
  countriesList.innerHTML = "";

  countries.forEach((country) => {
    const countrysingle = document.createElement("div");
    countrysingle.classList.add("card");

    countrysingle.innerHTML = `
            <div>
                <img src="${country.flags.png}" alt="" />
            </div>
            <div class="card-body">
                <h3 class="country-name">${country.name.official}</h3>
            
            </div>
        `;

    countrysingle.addEventListener("click", () => {
      modal.style.display = "flex";
      showCountryDetails(country);
    });

    countriesList.appendChild(countrysingle);
  });
}

function showCountryDetails(country) {
  const modalBody = modal.querySelector(".modal-body");
  const modalImg = modal.querySelector("img");

  modalImg.src = country.flags.png;

  modalBody.innerHTML = `
  <h2>${country.name.official}</h2>
  <h3>${country.capital}</h3>
<h3>Languages spoken: <span>${Object.values(country.languages)}</span></h3>
<h3>Population: <span>${country.population}</span></h3>
 <h3>Lat:<span>${country.latlng[0]},</span> Long:<span>${
    country.latlng[1]
  }</span></h3>
 
  <iframe
  width="80%"
  height="40%"
  style="border:0"
  loading="lazy"
  allowfullscreen
  src="https://www.google.com/maps/embed/v1/place?key=
    &q=${country.name.official}">
</iframe>
`;
}

// closing modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

//search feature

searchBox.addEventListener("input", (e) => {
  const { value } = e.target;
  const countryName = document.querySelectorAll(".country-name");

  countryName.forEach((name) => {
    if (name.innerText.toLowerCase().includes(value.toLowerCase())) {
      name.parentElement.parentElement.style.display = "block";
    } else {
      name.parentElement.parentElement.style.display = "none";
    }
  });
});
