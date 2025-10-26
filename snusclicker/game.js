
class Adder {
    constructor(addPerSecond, type) {
        this.addPerSecond = addPerSecond;
        this.type = type;
    }
}

// extends eventtarget for .addeventlistener
class Game extends EventTarget {
    constructor(ticksPerSecond) {
        super();

        this.purchasedItemsDisplay = document.getElementById("purchaseditems");
        this.snusCountDisplay = document.getElementById('snuscount');
        this.shopbox = document.getElementById("shopitemsbox");

        this.snusCount = 0;
        this.highestSnusCount = 0;

        this.ticksPerSecond = ticksPerSecond;
        setInterval(this.tick.bind(this), 1000/ticksPerSecond);

        this.adders = [];

        this.tickEvent = new CustomEvent('tick', {});
    }
    tick()
    {
        this.adders.forEach((adder, index) => {
            this.snusCount += adder.addPerSecond / this.ticksPerSecond;
        });

        const formatter = new Intl.NumberFormat(undefined, {
            notation: "compact",
            compactDisplay: "short",
            style: "decimal",
        })


        game.snusCountDisplay.innerText = `${Format.formatNumber(this.snusCount)} snus`;

        this.dispatchEvent(this.tickEvent);

        if (this.snusCount > this.highestSnusCount) {
            this.highestSnusCount = this.snusCount;
        }
    }
    addAdder(adder)
    {
        this.adders.push(adder);
    }

    getSnusPerSecond()
    {
        let count = 0;
        this.adders.forEach((adder) => {
            count += adder.addPerSecond;
        });
        return count;
    }
}

class ShopItem {
    constructor(game, name, price, snusPerSecond, minSnus) {
        this.game = game;

        this.minSnus = minSnus;
        this.itemsOwned = 0;

        this.basePrice = price;
        this.price = this.basePrice;

        this.adder = new Adder(snusPerSecond, name);

        this.enabled = true;

        this.createShopItemDisplay();
        this.element.onclick = () => {
            this.purchase();
        }

        this.game.addEventListener("tick", () => {
            this.checkPrice();
        });
    }

    purchase()
    {
        if (this.game.snusCount < this.price)
        {
            return;
        }

        this.addItemDisplay();

        this.game.snusCount -= this.price;
        this.itemsOwned++;

        this.price = this.basePrice * Math.pow(1.15, this.itemsOwned);
        console.log(this.itemsOwned);

        this.game.addAdder(this.adder);
        this.itemCountTag.innerHTML = `<p>${Format.formatWholeNumber(this.itemsOwned)}</p>`;
    }

    checkPrice()
    {
        const tagbox = this.element.children[0];
        const pricetag = tagbox.children[2];

        this.checkVisibility();

        pricetag.innerText = `${Format.formatNumber(this.price)} snus`;

        if (this.game.snusCount < this.price)
        {
            this.element.classList.add("unaffordable");
            this.enabled = false;
        } else if( !this.enabled && this.game.snusCount >= this.price) {
            this.element.classList.remove("unaffordable");
            this.enabled = true;
        }

        if (this.itemsOwned > 0 && !this.purchasedItemsDisplayCreated)
        {
            this.createItemDisplayRow();
        }
    }
    checkVisibility()
    {
        if (this.game.highestSnusCount < this.minSnus )
        {
            this.element.classList.add('invisible');
        }
        if (this.game.highestSnusCount > (this.minSnus*0.5) )
        {
            this.element.classList.remove('invisible');
            this.element.classList.add('incognito');
        }
        if (this.game.highestSnusCount > this.minSnus)
        {
            this.element.classList.remove('incognito');
        }
    }

    addItemDisplay()
    {
        const displayItem = document.createElement("div");
        this.purchasedItemsDisplay.appendChild(displayItem);

        displayItem.classList.add("container");
        displayItem.classList.add("purchasedItem");
        displayItem.innerHTML = `
            <p>${this.adder.type}</p>
        `

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                displayItem.classList.add("show");
            })
        })
    }

    createShopItemDisplay()
    {
        this.element = document.createElement("div");
        this.element.className = "container wide";
        this.element.classList.add("shopitem");

        this.purchasedItemsDisplay = document.createElement("div");
        this.purchasedItemsDisplayCreated = false;

        this.game.shopbox.appendChild(this.element);

        this.element.innerHTML = `
            <div class="tagbox">
                <p class="nameTag">${this.adder.type}</p>
                <div class="linebreak"></div>
                <p class="priceTag">${this.price} snus</p>
                <p class="perSecondTag">${Format.formatNumber(this.adder.addPerSecond)} snus per second</p>
            </div>
            <div class="purchasedItemCount">
                <p>0</p>
            </div>
        `;

        this.perSecondTag = this.element.querySelector(".tagbox .perSecondTag");
        this.itemCountTag = this.element.querySelector(".purchasedItemCount");
    }
    createItemDisplayRow()
    {
        game.purchasedItemsDisplay.append(this.purchasedItemsDisplay);
        this.purchasedItemsDisplay.classList.add("container");
        this.purchasedItemsDisplay.classList.add("row");
        this.purchasedItemsDisplay.classList.add("overflow");
        this.purchasedItemsDisplay.classList.add("purchasedItemRow");
        this.purchasedItemsDisplayCreated = true;

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                this.purchasedItemsDisplay.classList.add("show");
            })
        })
    }

}