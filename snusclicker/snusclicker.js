

const purchasedItemsDisplay = document.getElementById("purchaseditems");
const snusCountDisplay = document.getElementById('snuscount');
const shopbox = document.getElementById("shopitemsbox");
const snusbutton = document.getElementById("snusbutton");
const snuspersecond = document.getElementById("snuspersecond");



const game = new Game(100);

const snuslangare = new ShopItem(game,
    "Snuslangare",
    1,
    0.2,
    -1);
const snusimporterare = new ShopItem(game,
    "Snusimporterare",
    100,
    2,
    -1
);
const snusfabrik = new ShopItem(game,
    "Snusfabrik",
    1000,
    50,
    100
);
const tobaksplantage = new ShopItem(game,
    "Tobaksplantage",
    10000,
    200
);


snusbutton.onclick = (e) => {
    game.snusCount += 1;

    const body = document.querySelector("body");

    const text = document.createElement("div");
    text.classList.add("floating-text");
    text.textContent = "+1";

    const rect = snusbutton.getBoundingClientRect();
    text.style.left = `${e.clientX - 20}px`;
    text.style.top = `${e.clientY - 20}px`;

    console.log("left: ", body.offsetLeft, "right: ", body.offsetTop);

    body.appendChild(text);

    text.addEventListener("animationend", () => {
        text.remove();
    });
}


game.addEventListener("tick", () => {
    snuspersecond.innerText = `${Format.formatNumber(game.getSnusPerSecond())} per sekund`;
})

