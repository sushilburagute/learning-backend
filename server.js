const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 3000;

const products = [
    { id: "001", name: "Lays", price: 30 },
    { id: "002", name: "Fried Chicken Momos", price: 70 },
];
app.use(bodyParser.json());

// All the get calls

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/products", (req, res) => {
    res.json({ products });
});

app.get("/products/:id", (req, res) => {
    const { id } = req.params;
    const product = products.find((products) => products.id === id);
    if (product) {
        res.json({ success: "true", product });
    } else {
        res.status(404).json({ success: "false", message: "We Couldn't find that product" });
    }
});

app.get("/cart", (req, res) => {
    let totalCost = 0;
    products.map((products) => {
        totalCost = totalCost + products.price;
    });

    const CartPage = `
    <h1> Cart Page </h1>
    ${products
        .map(
            (products) => `
      <h1> ${products.name} </h1>
      <h3> ${products.price} </h3>
    `
        )
        .join("")}
    <h1>Total Price: ${totalCost} </h1>
  `;
    res.send(CartPage);
});

// All the Post calls
app.post("/products", (req, res) => {
    const { name, price } = req.body;
    const product = { id: uuidv4(), name, price };
    products.push(product);
    res.json({ success: "true", products });
});

app.post("./products/:id", (req, res) => {
    const { id } = req.params;
    const updateProduct = req.body;
    console.log(id);
    console.log(updateProduct);

    products.forEach((product) => {
        if (product.id === id) {
            Object.keys(updateProduct).forEach((key) => {
                if (key in product) {
                    product[key] = updateProduct[key];
                }
            });
        }
    });

    res.json({ success: "true", products });
});

app.listen(PORT, () => {
    console.log("Server is at: ", PORT);
});
