


const purchasedItemsDisplay = document.getElementById("purchaseditems");
const snusCountDisplay = document.getElementById('snuscount');
const shopbox = document.getElementById("shopitems");
const snusbutton = document.getElementById("snusbutton");



const game = new Game(100);

const firstSnus = new ShopItem(game,"Snusfabrik", 1, 0.1);
const second = new ShopItem(game,"Snuslangare", 1, 0.1);

snusbutton.onclick = () => {
    game.snusCount += 1;
}