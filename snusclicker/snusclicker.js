

const purchasedItemsDisplay = document.getElementById("purchaseditems");
const snusCountDisplay = document.getElementById('snuscount');
const shopbox = document.getElementById("shopitemsbox");
const snusbutton = document.getElementById("snusbutton");
const snuspersecond = document.getElementById("snuspersecond");



const game = new Game(100);

const firstSnus = new ShopItem(game,"Snuslangare", 1, 0.2);
const secondSnus = new ShopItem(game,"Snusimporterare", 100, 1);
const thirdSnus = new ShopItem(game,"Snusfabrik", 1000, 10);



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


let lastSnusCount = 0;
setInterval(() => {
    let currentSnusCount = game.snusCount;

    snuspersecond.innerText = `${ (currentSnusCount - lastSnusCount).toFixed(2) } per sekund`;

    lastSnusCount = currentSnusCount;
}, 1000)
