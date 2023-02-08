const express = require('express')
const ProductManager = require('./ProductManager.js');
const app = express()
const port = 3000
const Usuario = require('./models/Usuario.js');

async function main() {
    await Usuario.create({
        user: 'Damian',
        pass: '1234'
    })
};

main();

app.use(express.json());

const productos = new ProductManager('data', 'products.json', 'id.txt');

// productos.addProduct('Pelota', 'Pelota de goma', '$1000', 'https://http2.mlstatic.com/D_NQ_NP_779158-MLA31086092270_062019-O.webp', '303', '10');
// productos.addProduct('Reposera', 'Reposera amarilla reclinable', '$1300', 'https://http2.mlstatic.com/D_NQ_NP_624002-MLA52699803963_122022-W.jpg', '602', '5');

app.get('/products', async (req, res) => {
    if (req.query.limit !== undefined) {
        res.json(await productos.getProducts().slice(0, req.query.limit));
    } else {
        res.json(await productos.getProducts());
    }
})

app.get('/products/:pid', async (req, res) => {
    res.json(await productos.getProductById(req.params.pid));
})

app.listen(port, () => {
    console.log(`Escuchando puerto ${port}`)
})