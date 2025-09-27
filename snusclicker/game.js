class Modifier {
    constructor(game, callback) {
        this.callback = callback;
        game.addModifier(this);
    }
}

class Game {
    constructor(ticksPerSecond) {
        this.snusCount = 0;
        this.ticksPerSecond = ticksPerSecond;
        setInterval(this.tick.bind(this), 1000/ticksPerSecond);

        this.modifiers = [];
    }
    tick()
    {
        this.modifiers.forEach((modifier) => {
            modifier.callback();
        })

        const formatter = new Intl.NumberFormat(undefined, {
            notation: "compact",
            compactDisplay: "short",
            style: "decimal",
        })

        let display;

        display = `${formatter.format(this.snusCount)} snus`;

        if (this.snusCount < 0) {
            display = `${this.snusCount.toFixed()} snus`;
        }
        snusCountDisplay.innerText = display;
    }
    addModifier(modifier)
    {
        this.modifiers.push(modifier);
    }
}

class ShopItem {
    constructor(game, name, price, snusPerSecond) {
        this.purchasedItemsDisplay = document.createElement("div");
        this.purchasedItemsDisplayCreated = false;

        this.itemsOwned = 0;
        this.name = name;
        this.price = price;
        this.snusPerSecond = snusPerSecond;
        this.game = game;

        this.enabled = true;

        this.element = document.createElement("div");
        this.element.className = "container wide";
        this.element.classList.add("shopitem");

        shopbox.appendChild(this.element);
        const nametag = document.createElement("p");
        nametag.innerText = name;
        this.element.appendChild(nametag);

        const tagbox = document.createElement("div");
        tagbox.id = "tagbox";
        this.element.appendChild(tagbox);

        const pricetag = document.createElement("p2");
        pricetag.innerText = `${price} snus`;
        tagbox.appendChild(pricetag);

        const perSecondTag = document.createElement("p3");
        perSecondTag.classList.add("right");
        perSecondTag.innerText = `${this.snusPerSecond} snus per second`;
        tagbox.appendChild(perSecondTag);

        this.element.onclick = () => {
            this.purchase();
        }

        this.game.addModifier(new Modifier(game, () => {
            this.checkPrice();
            perSecondTag.innerText = `${this.snusPerSecond} snus per second`;
        }));
    }

    purchase()
    {
        if (this.game.snusCount < this.price)
        {
            console.log("Less than!");
            return;
        }

        const displayItem = document.createElement("div");
        this.purchasedItemsDisplay.appendChild(displayItem);

        displayItem.classList.add("container");
        displayItem.classList.add("purchasedItem");

        const displayName = document.createElement("p");
        displayName.innerText = this.name;
        displayItem.appendChild(displayName);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                displayItem.classList.add("show");
            })
        })


        this.game.snusCount -= this.price;
        this.game.addModifier(new Modifier(game, () => {
            this.game.snusCount +=  this.snusPerSecond / this.game.ticksPerSecond;
        }));

        this.itemsOwned++;



    }

    checkPrice()
    {
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
            purchasedItemsDisplay.append(this.purchasedItemsDisplay);
            this.purchasedItemsDisplay.classList.add("container");
            this.purchasedItemsDisplay.classList.add("row");
            this.purchasedItemsDisplay.classList.add("overflow");
            this.purchasedItemsDisplay.classList.add("purchasedItemRow");
            this.purchasedItemsDisplayCreated = true;
        }
    }
}