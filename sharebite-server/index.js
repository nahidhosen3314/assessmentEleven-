const express = require("express");
const dotenv = require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(
    cors({
        origin: ["https://sharebite-40c56.web.app", "https://sharebite-server-psi.vercel.app"],
        credentials: true,
        optionsSuccessStatus: 200,
    })
);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@clusterdev.vuqw7lb.mongodb.net/?retryWrites=true&w=majority&appName=ClusterDev`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        // database and collections
        const database = client.db("shareBiteDB");
        const userCollection = database.collection("Users");
        const foodCollection = database.collection("Foods");
        const requestFoodCollection = database.collection("RequestFoods");

        // create single user
        app.post("/users", async (req, res) => {
            const user = await userCollection.insertOne(req.body);
            res.send(user);
        });

        // add food item spot
        app.post("/foods", async (req, res) => {
            const food = await foodCollection.insertOne(req.body);
            res.send(food);
        });

        // get all the available food items
        app.get("/foods", async (req, res) => {
            const foods = await foodCollection
                .find({
                    foodqty: { $gt: 0},
                })
                .toArray();               
            res.send(foods);
        });

        // get requested food as featured
        app.get("/featured-foods", async (req, res) => {
            const foods = await foodCollection
                .find({
                    request_count: { $gt: 0},
                })
                .sort({ request_count: -1 })
                .toArray();               
            res.send(foods);
        });

        // get single the foods
        app.get("/foods/:id", async (req, res) => {
            const id = req.params.id;
            const food = await foodCollection.findOne({
                _id: new ObjectId(id),
            });
            res.send(food);
        });

        // get specific user added the foods
        app.get("/manage-foods/:id", async (req, res) => {
            const mylist = await foodCollection
                .find({
                    user_id: req.params.id,
                })
                .toArray();
            res.send(mylist);
        });
        // get specific user requested foods
        app.get("/requested-foods/:id", async (req, res) => {
            const mylist = await requestFoodCollection
                .find({
                    reqid: req.params.id,
                    food_status: "requested",
                })
                .toArray();
            res.send(mylist);
        });

        app.put("/request-foods/:id", async (req, res) => {
            
            const myRequest = await foodCollection.updateOne(
                {
                    _id: new ObjectId(req.params.id),
                },
                {
                    $set: {
                        food_status: "requested",
                        request_date: req.body.request_date
                    },
                    $inc: {
                        foodqty: -1,
                        request_count: 1
                    }
                },
                { upsert: true }
            );    
            res.send(myRequest);
        });

        app.post("/request-foods", async(req, res) => {
            const food = await foodCollection.findOne({
                _id: new ObjectId(req.body.foodid)
            })
            food.reqid = req.body.uid
            const result = await requestFoodCollection.insertOne(food)
            res.send(result)
        })

        // get mylist specific item
        app.get("/update-foods/:id", async (req, res) => {
            const data = await foodCollection.findOne({
                _id: new ObjectId(req.params.id),
            });
            res.send(data);
        });

        // update mylist item
        app.put("/update-foods/:id", async (req, res) => {
            const {
                donator_email,
                donator_image,
                donator_name,
                expired_date,
                foodImage,
                foodname,
                foodqty,
                notes,
                pickup_location,
            } = req.body;

            const mylist = await foodCollection.updateOne(
                {
                    _id: new ObjectId(req.params.id),
                },
                {
                    $set: {
                        donator_email,
                        donator_image,
                        donator_name,
                        expired_date,
                        foodImage,
                        foodname,
                        foodqty,
                        notes,
                        pickup_location,
                    },
                },
                { upsert: true }
            );
            res.send(mylist);
        });

        // find one and delete item from mylist
        app.delete("/manage-foods/:id", async (req, res) => {
            const mylistItem = await foodCollection.deleteOne({
                _id: new ObjectId(req.params.id),
            });
            res.send(mylistItem);
        });

        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        //await client.close();
    }
}
run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
