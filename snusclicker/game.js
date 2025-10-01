
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

        let display;
        display = `${formatter.format(this.snusCount)} snus`;

        if (this.snusCount < 1) {
            display = `${this.snusCount.toFixed()} snus`;
        }
        game.snusCountDisplay.innerText = display;

        this.dispatchEvent(this.tickEvent);
    }
    addAdder(adder)
    {
        this.adders.push(adder);
    }
}

class ShopItem {
    constructor(game, name, price, snusPerSecond) {
        this.itemsOwned = 0;
        this.price = price;
        this.adder = new Adder(snusPerSecond, name);
        this.game = game;

        this.enabled = true;

        this.createShopItemDisplay();

        this.element.onclick = () => {
            this.purchase();
        }

        this.game.addEventListener("tick", () => {
            this.checkPrice();
            this.perSecondTag.innerText = `${this.adder.addPerSecond} snus per sekund`;
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

        this.price = this.price * Math.pow(1.15, this.itemsOwned);

        this.game.addAdder(this.adder);
    }

    checkPrice()
    {
        const tagbox = this.element.children[2];
        const pricetag = tagbox.children[0];
        
        pricetag.innerText = `${this.price.toFixed(2)} snus`;

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
            <p>${this.adder.type}</p>
            <div class="linebreak"></div>
            <div class="tagbox">
                <p class="priceTag">${this.price} snus</p>
                <p class="perSecondTag">${this.adder.addPerSecond} snus per second</p>
            </div>
        `;

        this.perSecondTag = this.element.querySelector(".tagbox .perSecondTag");
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