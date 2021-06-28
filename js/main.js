const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

let main = new Vue({
    el: '.app',
    data: {
        products: [],
        userSearch: '',
        show: false,
        filtered: [],
        goods: [],
        dataErr: false
    },
    methods: {
        getJson(url) {
            return fetch(url)
                    .then(result => result.json())
                    .catch(err => {
                        this.dataErr = true;
                        console.log(err);
                    });
        },
        addProduct(prod) {
            this.getJson(`${API}addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let productId = +prod.id;

                        let find = this.goods.find(prod => prod.id == productId);
                        if (find) {
                            find.quantity++;
                        } else {
                            let cartProduct = {
                                imgUrl: prod.imgUrl,
                                id: productId,
                                price: prod.price,
                                title: prod.title,
                                quantity: 1
                            };
                            this.goods.push(cartProduct);
                        }
                    } else {
                        console.error('Error');
                    }
                })
        }, 
        removeProduct(el) {
            this.getJson(`${API}addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let productId = +el.id;

                        let find = this.goods.find(prod => prod.id == productId);
    
                        if (find.quantity > 1) {
                            find.quantity--;
                        } else {
                            this.goods.splice(this.goods.indexOf(find), 1);
                        }
                    } else {
                        console.error('Error');
                    }
                })
        },
        filter() {
            const regExp = new RegExp(this.userSearch, 'ig');
            
            this.filtered = this.products.filter(prod => {
                return regExp.test(prod.title);
            });
        }
    },
    mounted() {
        // this.getJson(`${API + this.catalogUrl}`)
        //     .then(data => {
 
        //         for (const el of data) {
        //             this.products.push(el);
        //             this.filtered.push(el);
        //         }
        //     });
        this.getJson(`products.json`)
            .then(data => {
                for (let i = 0; i <= 5; i++) {
                    this.products.push(data[i]);
                    this.filtered.push(data[i]);
                }
            }); 
        this.getJson(`cart.json`)
            .then(data => {
                for (const el of data.contents) {
                    this.goods.push(el);
                }
            });   
    },
})