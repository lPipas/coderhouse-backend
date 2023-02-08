const fs = require('fs');

class ProductManager {
    constructor(folder, pathProducts, pathId) {
        this.pathProducts = folder + '/' + pathProducts;
        this.pathId = folder + '/' + pathId;
        if (!fs.existsSync(this.pathProducts)) {
            fs.mkdirSync(folder, { recursive: true });
            fs.writeFileSync(this.pathProducts, '[]');
        }
        if (!fs.existsSync(this.pathId)) {
            fs.mkdirSync(folder, { recursive: true });
            fs.writeFileSync(this.pathId, '0')
        }
    }
    addProduct(title, description, price, thumbnail, code, stock) {
        let products = this.getProducts();
        let res = products.find(product => product.code === code);
        if (res) {
            console.log('Ya existe ese code');
        } else {
            products.push({
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
                id: fs.readFileSync(this.pathId, 'utf-8')
            });
            fs.writeFileSync(this.pathId, (parseInt(fs.readFileSync(this.pathId, 'utf-8')) + 1).toString());
            fs.writeFileSync(this.pathProducts, JSON.stringify(products));
        }
    }
    getProducts() {
        let products = fs.readFileSync(this.pathProducts);
        if (products.toString() === '') {
            products = '[]'
        }
        return JSON.parse(products.toString())
    }
    getProductById(id) {
        let products = this.getProducts();
        let res = products.find(product => product.id === id);
        if (res) {
            return res
        } else {
            return { message: 'Not Found' };
        }
    }
    removeProductById(id) {
        let products = this.getProducts();
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                products.splice(i, 1);
            }
        }
        fs.writeFileSync(this.pathProducts, JSON.stringify(products));
    }
}

module.exports = ProductManager;

// let instancia = new ProductManager('products.json', 'id.txt');
// instancia.addProduct('Pelota', 'Pelota de goma', '$1000', 'https://http2.mlstatic.com/D_NQ_NP_779158-MLA31086092270_062019-O.webp', '303', '10');
// instancia.addProduct('Reposera', 'Reposera amarilla reclinable', '$1300', 'https://http2.mlstatic.com/D_NQ_NP_624002-MLA52699803963_122022-W.jpg', '602', '5');