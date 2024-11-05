const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());
const SECRET_KEY = "test";
let users = [];
app.get("/api/products", (req, res) => {
  let products = [
    {
      id: 1,
      description:
        "A delicious small apple pie, perfectly baked with a sweet apple filling and flaky crust.",
      name: "Small Apple Pie",
      imageName: "applepiesmall.jpg",
      category: "Pies",
      price: 1220.5,
      discount: 0.2,
    },
    {
      id: 17,
      description: "A rich, creamy small cheesecake topped with a layer of cheese goodness.",
      name: "Small Cheese Cake",
      imageName: "cheesecakesmall.jpg",
      category: "Cakes",
      price: 1190.5,
      discount: 0,
    },
    {
      id: 6,
      description:
        "A tangy and sweet small cherry pie, filled with ripe cherries and encased in golden crust.",
      name: "Small Cherry Pie",
      imageName: "cherrypiesmall.jpg",
      category: "Pies",
      price: 275,
      discount: 0,
    },
    {
      id: 2,
      description:
        "A small peach pie with soft, juicy peaches and a buttery crust.",
      name: "Small Peach Pie",
      imageName: "peachpiesmall.jpg",
      category: "Pies",
      price: 945.0,
      discount: 0.2,
    },
    {
      id: 3,
      description:
        "A delightful small cranberry pie filled with tart cranberries and topped with a golden crust.",
      name: "Small Cranberry Pie",
      imageName: "cranberrypiessmall.jpg",
      category: "Pies",
      price: 1275.5,
      discount: 0,
    },
    {
      id: 16,
      description:
        "A small strawberry cheesecake with a creamy texture and fresh strawberries on top.",
      name: "Small Strawberry Cheese Cake",
      imageName: "strawberrycheesecakesmall.jpg",
      category: "Cakes",
      price: 1190.5,
      discount: 0.1,
    },
  ];
  res.send(products);
});
let cart = [];

app.post("/api/cart", (req, res) => {
  cart = req.body;
  setTimeout(() => res.status(201).send(), 20);
});

app.get("/api/cart", (req, res) => res.send(cart));

app.post("/api/signup", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ message: "Username and password are required" });
  }

  const userExists = users.find((user) => user.username === username);
  if (userExists) {
    return res.status(400).send({ message: "User already exists" });
  }

  try {

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({ username, password: hashedPassword });
    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
});

app.post("/api/signin", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ message: "Username and password are required" });
  }

  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(401).send({ message: "Invalid credentials" });
  }

  try {

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid credentials" });
    }


    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).send({ message: "Login successful", token });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
});

app.listen(8085, () => console.log("API Server listening on port 8085!"));
