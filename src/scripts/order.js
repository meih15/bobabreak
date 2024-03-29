import { DRINK_SIZES, MILK_TEA_CHOICES, TOPPING_CHOICES} from "./constants";
import View from "./view";

class Order {
    constructor(numSeconds) {
        this.numSeconds = numSeconds;
        this.order = [];
        this.numToppings = Math.floor(Math.random() * 5);
        this.boba = [];

        this.generateOrder();
        this.generateBoba();
    }

    generateOrder() {

        let sizePicked = Object.keys(DRINK_SIZES);
        let teaPicked = Object.keys(MILK_TEA_CHOICES);
        let toppingsPicked = Object.keys(TOPPING_CHOICES);

        function getRandomIdx(max) {
            return Math.floor(Math.random() * max);
        };

        let chosenSize = getRandomIdx(sizePicked.length);
        this.order.push(sizePicked[chosenSize]);

        let chosenTea = getRandomIdx(teaPicked.length);
        this.order.push(teaPicked[chosenTea]);

        for (let i = 0; i < this.numToppings; i++) {
            let chosenToppings = getRandomIdx(toppingsPicked.length);
            this.order.push(toppingsPicked[chosenToppings]);
        }

        this.renderOrder();
    }

    generateOrderElement(id) {
        let img = document.createElement("img");

        const drinkSizes = Object.keys(DRINK_SIZES);
        const milkTeas = Object.keys(MILK_TEA_CHOICES);
        const toppings = Object.keys(TOPPING_CHOICES);

        if (drinkSizes.includes(id)) {
            img.src = DRINK_SIZES[id];
        } else if (milkTeas.includes(id)) {
            img.src = MILK_TEA_CHOICES[id];
        } else if (toppings.includes(id)) {
            img.src = TOPPING_CHOICES[id];
        };

        img.alt = `${id}-image`;
        return img;
    }

    renderOrder() {
        View.renderOrder(this);
    }

    deleteOrder() {
        document.getElementById("customer-container").innerHTML = '';
        document.getElementById("text-container").innerHTML = '';
    }

    generateBoba() {
        let bobaContainer = document.getElementById('boba-container');
        let boba = document.createElement('div');
        boba.id = 'boba';

        for (let i = 0; i < this.order.length; i++ ) {
            let bobaElement = document.createElement("div");
            bobaElement.classList.add(`boba-element-${i}`);
            bobaContainer.classList.add('img-item');
            boba.appendChild(bobaElement);
        }

        bobaContainer.appendChild(boba);
    }

    deleteBoba(){
        document.getElementById('boba-container').innerHTML = '';
    }

    addItem(item) {
        if (this.boba.length < this.order.length) {
            this.boba.push(item);
            this.renderBoba(this.boba);

            let bobaIndex = this.boba.length - 1;
            let bobaElement = document.querySelector(`.boba-element-${bobaIndex}`);

            if (Object.keys(DRINK_SIZES).includes(item)) {
            bobaElement.classList.add('cup');
            } else if (Object.keys(MILK_TEA_CHOICES).includes(item)) {
            bobaElement.classList.add('tea');
            } else if (Object.keys(TOPPING_CHOICES).includes(item)) {
            bobaElement.classList.add('topping');
            }
        }
    }


    removeItem() {
        if (this.boba.length) {
            let i = this.boba.length - 1;

            let bobaEle = document.querySelector(`.boba-element-${i}`);
            bobaEle.firstElementChild.remove();

            if (bobaEle.classList.contains('cup')) {
                bobaEle.classList.remove('cup');
            } else if (bobaEle.classList.contains('tea')) {
                bobaEle.classList.remove('tea');
            } else if (bobaEle.classList.contains('topping')) {
                bobaEle.classList.remove('topping');
            }

            this.boba.pop();
            this.renderBoba(this.boba);
        }
    }

    renderBoba() {
        View.renderBoba(this.boba);
    }
}

export default Order;