

const purchasedItemsDisplay = document.getElementById("purchaseditems");
const snusCountDisplay = document.getElementById('snuscount');
const shopbox = document.getElementById("shopitemsbox");
const snusbutton = document.getElementById("snusbutton");
const snuspersecond = document.getElementById("snuspersecond");



const game = new Game(100);

const firstSnus = new ShopItem(game,"Snus Dealer", 1, 0.2);
const secondSnus = new ShopItem(game,"Snus Importer", 100, 1);
const thirdSnus = new ShopItem(game,"Snus Factory", 1000, 10);



snusbutton.onclick = (e) => {
    game.snusCount += 1;

    const text = document.createElement("div");
    text.classList.add("floating-text");
    text.textContent = "+1";

    // Place at click position
    const rect = snusbutton.getBoundingClientRect();
    text.style.left = `${e.clientX - rect.left}px`;
    text.style.top = `${e.clientY - rect.top}px`;

    snusbutton.appendChild(text);

    // Remove after animation
    text.addEventListener("animationend", () => {
        text.remove();
    });
}


let lastSnusCount = 0;
setInterval(() => {
    let currentSnusCount = game.snusCount;

    snuspersecond.innerText = `${ (currentSnusCount - lastSnusCount).toFixed(2) } per second`;

    lastSnusCount = currentSnusCount;
}, 1000)