const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


// Dummy Data
let items = [
  {
    id: 1,
    name: "Laptop",
    price: 50000,
    description: "A powerful laptop",
    image: "https://i.ibb.co.com/prsVXqbD/Gemini-Generated-Image-ixmogmixmogmixmo.png"
  },
  {
    id: 2,
    name: "Phone",
    price: 20000,
    description: "A smart phone",
    image: "https://brotherselectronicsbd.com/image/catalog/demo/product/Samsung/S25%20ULTRA/s25%20ultra%2030.png"
  },
  {
    id: 3,
    name: "MSI GeForce RTX 5090 ",
    price: 20000,
    description: "MSI GeForce RTX 5090 32G GAMING TRIO OC 32GB GDDR7 Graphics Card",
    image: "https://www.startech.com.bd/image/cache/catalog/graphics-card/msi/geforce-rtx-5090-32g-gaming-trio-oc/geforce-rtx-5090-32g-gaming-trio-oc-01-500x500.webp"
  },
  {
    id: 4,
    name: "Shoe",
    price: 20000,
    description: "shoe",
    image: "https://www.batabd.com/cdn/shop/files/3_bc85fd15-0268-4fbc-b492-40543d6158c4_1024x1024.jpg?v=1756576843"
  },
  {
    id:5,
    name:"Men's Premium T-Shirt",
    price:99,
    description:"Men's Premium T-Shirt",
    image:"https://i.ibb.co.com/r2bDbR2D/Gemini-Generated-Image-1svm9h1svm9h1svm.png"
  },
  {
    id:6,
    name:"Kitchen Mixer Grinder",
    price:99,
    description:"Kitchen Mixer Grinder",
    image:"https://i.ibb.co.com/WppmYk77/Gemini-Generated-Image-v7p8nvv7p8nvv7p8-1.png"
  },
  {
    id:7,
    name:"Women's Fashion Handbag",
    price:99,
    description:"Women's Fashion Handbag",
    image:"https://i.ibb.co.com/60qTJ97G/Gemini-Generated-Image-y4pa9ry4pa9ry4pa.png"
  },
  {
    id:8,
    name:"Iphone 17 pro max",
    price:99,
    description:"Iphone 17 pro max",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRUsryy05hmT3_3zd8AUSNEqJhIwY8QeS3RdFBKVz8gSvXsP81VnvdtSI&s=10"
  },
];


// Routes
app.get("/items", (req, res) => {
  res.json(items);
});

app.get("/items/:id", (req, res) => {
  const item = items.find(i => i.id == req.params.id);
  res.json(item);
});

app.post("/items", (req, res) => {
  const newItem = { id: Date.now(), ...req.body };
  items.push(newItem);
  res.json({ success: true, item: newItem });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
