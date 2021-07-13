Vue.component('cart', {
    props: ['goods', 'visibility'],
    template: `
        <div class="cart" v-show="visibility">
            <cart-item v-for="item of goods" :good="item"></cart-item>
        </div>
    `
});

Vue.component('cart-item', {
    props: ['good'],
    template: `
        <div class="cart_box row">
            <img class="cart_box-img" :src="good.imgUrl" :alt="good.title">
            <div class="cart_box-content">
                <p class="cart_box-brand">{{ good.title }}</p>

                <ul class="cart_box-values">
                    <li>Price:<span class="cart_box-item price">{{ good.price }}</span></li>

                    <li>Quantity: {{ good.quantity }}</li>  
                    
                    <li>Sum:<span class="cart_box-item price">{{ good.price.slice(1) * good.quantity }}</span></li>
                </ul>
                <button class="cart_box-close" @click="$root.removeProduct(good)">
                    &#10005;
                </button>
            </div>
        </div>
    `
})