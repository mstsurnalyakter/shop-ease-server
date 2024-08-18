const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

//building middleware
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://shop-ease-4a820.web.app",
  ],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jimwvxl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const db = client.db("shopEaseDB");
    const productsCollection = db.collection("products");


app.get("/products", async (req, res) => {
  console.log(req.query);
  const page = parseInt(req.query.page) - 1;
  const size = parseInt(req.query.size);
  const search = req.query.search || "";
  const brand = req.query.brand || "";
  const category = req.query.category || "";
  const priceMin = parseInt(req.query.priceMin) || 0;
  const priceMax = parseInt(req.query.priceMax) || 1000;
  const sortBy = req.query.sortBy || "price-asc";
  const query = {
    productName: { $regex: search, $options: "i" },
    ...(brand && { brandName: brand }),
    ...(category && { category: category }),
    price: { $gte: priceMin, $lte: priceMax },
  };

  // Added sort options based on sortBy parameter
  const sortOptions = {
    "price-asc": { price: 1 },
    "price-desc": { price: -1 },
    "date-desc": { dateAdded: -1 },
  };

  const result = await productsCollection
    .find(query)
    .sort(sortOptions[sortBy] || { price: 1 })
    .skip(page * size)
    .limit(size)
    .toArray();

  res.send(result);
});


         app.get("/products-count", async (req, res) => {
           const search = req.query.search || "";
           const brand = req.query.brand || "";
           const category = req.query.category || "";
           const priceMin = parseInt(req.query.priceMin) || 0;
           const priceMax = parseInt(req.query.priceMax) || 1000;


           const query = {
             productName: { $regex: search, $options: "i" },
             ...(brand && { brandName: brand }),
             ...(category && { category: category }),
             price: { $gte: priceMin, $lte: priceMax },
           };

           const count = await productsCollection.countDocuments(query);
           res.send({ count });
         });


    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Welcome to ShopEase Server..");
});

app.listen(port, () => {
  console.log(`ShopEase is running at : http://localhost:${port}`);
});
