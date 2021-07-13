Vue.component('products', {
    props: ['products'],
    template: `
        <div class="product container">
            <div class="product_list">
                <product v-for="item of products"
                :key="item.id"
                :product="item">
                </product>
            </div>
        </div>
    `
});

Vue.component('product', {
    props: ['product'],
    template: `
        <div class="product_card">
            <img class="product_card-img" :src="product.imgUrl" :alt="product.title" width="360" height="420">
            <div class="product_card-text">
                <a class="box_title" href="#">{{ product.title }}</a>
                <p class="box_text">{{ product.text }}</p>
            </div>
            <p class="box_price">{{ product.price }}</p>
            <div class="black">
                <p class="black_link" @click="$root.addProduct(product)">
                    Add to Cart
                </p>
            </div>
        </div>
    `
})