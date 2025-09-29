const table = document.getElementById("table");
const map = document.getElementById("map");
const markercontainer = document.getElementById("maplabels");
const correct = document.getElementById("rätta");


const countries = [

    { num:  1, country: "Finland",       capital: "Helsingfors", position: ["", ""] },
    { num:  2, country: "Norge",         capital: "Oslo",        position: ["", ""] },
    { num:  3, country: "Estland",       capital: "Tallinn",     position: ["", ""] },
    { num:  4, country: "Lettland",      capital: "Riga",        position: ["", ""] },
    { num:  5, country: "Litauen",       capital: "Vilnius",     position: ["", ""] },
    { num:  6, country: "Belarus",       capital: "Minsk",       position: ["", ""] },
    { num:  7, country: "Ukraina",       capital: "Kyiv",        position: ["", ""] },
    { num:  8, country: "Georgien",      capital: "Tbilisi",     position: ["", ""] },
    { num:  9, country: "Azerbajdzjan",  capital: "Baku",        position: ["", ""] },
    { num: 10, country: "Kazakstan",     capital: "Astana",      position: ["", ""] },
    { num: 11, country: "Kina",          capital: "Peking",      position: ["", ""] },
    { num: 12, country: "Mongoliet",     capital: "Ulan Bator",  position: ["", ""] },
    { num: 13, country: "Nordkorea",     capital: "Pyongyang",   position: ["", ""] },
    { num: 14, country: "Armenien",      capital: "Jerevan",     position: ["", ""] },
    { num: 15, country: "Turkiet",       capital: "Ankara",      position: ["", ""] },
    { num: 16, country: "Turkmenistan",  capital: "Ashgabat",    position: ["", ""] },
    { num: 17, country: "Uzbekistan",    capital: "Tasjkent",    position: ["", ""] },
    { num: 18, country: "Tadzjikistan",  capital: "Dusjanbe",    position: ["", ""] },
    { num: 19, country: "Kirgizistan",   capital: "Bishkek",     position: ["", ""] },
    { num: 20, country: "Iran",          capital: "Tehran",      position: ["", ""] },
    { num: 21, country: "Afghanistan",   capital: "Kabul",       position: ["", ""] },
    { num: 22, country: "Ryssland",      capital: "Moskva",      position: ["", ""] }
];


function makegenerated()
{
    const display = document.createElement("p");
    document.body.appendChild(display);

    let counter = 0;
    display.innerHTML = `
        ${countries[counter].country}
    `;

    let generated = countries;

    map.addEventListener("click", (e) => {
        if (counter === countries.length-1)
        {
            display.innerHTML = `Finished!`;

            const str = JSON.stringify({generated}, null, 2);
            let blob = new Blob([str], {type: "text/plain"} );
            let link = document.createElement('a');

            link.href = URL.createObjectURL(blob);
            link.download = 'generated.json';
            link.click();

            return;
        }

        counter += 1;
        display.innerHTML = `${countries[counter].country} `;
        generated[counter].position[0] = `${e.offsetX}px`
        generated[counter].position[1] = `${e.offsetY}px`
    });
}

async function generate() {

    countries.forEach((question, index) => {

        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${question.num}</td> 
        <td><input type="text" name="landq${question.num}"></td>    
        <td><input type="text" name="stadq${question.num}"></td>    
    `;

        table.appendChild(row);
    })
}

generate();

correct.onclick = () => {
    countries.forEach((question) => {
        // land input
        const countryInput = document.querySelector(`input[name="landq${question.num}"]`);
        if (countryInput.value.trim().toLowerCase() === question.country.toLowerCase()) {
            countryInput.style.background = "#c8e6c9"; // green for correct
        } else {
            countryInput.style.background = "#ffcdd2"; // red for wrong
        }

        // stad input
        const capitalInput = document.querySelector(`input[name="stadq${question.num}"]`);
        if (capitalInput.value.trim().toLowerCase() === question.capital.toLowerCase()) {
            capitalInput.style.background = "#c8e6c9";
        } else {
            capitalInput.style.background = "#ffcdd2";
        }
    });
}

function restart()
{
    location.reload();
}