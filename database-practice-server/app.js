const express = require("express")
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require("cors")
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000


app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@project-0.p8l0k.mongodb.net/?retryWrites=true&w=majority&appName=Project-0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = client.db('usersDB')
    const userCollection = database.collection("users")

    // Get all user 
    app.get("/users", async(req, res) => {
        const cursor = userCollection.find()
        const users = await cursor.toArray()
        res.send(users)
    })

    // Get specific users 
    app.get("/users/:id", async(req, res) => {
        const id = req.params.id
        const query = {_id: new ObjectId(id)}
        const findItem = await userCollection.findOne(query)
        res.send(findItem)
    })

    // Add New user 
    app.post("/users", async (req, res) => {
        const user = req.body
        const result = await userCollection.insertOne(user);
        res.send(result)
    })

    // Remove user 
    app.delete("/users/:id", async(req, res) => {
        const id = req.params.id
        const query = {_id: new ObjectId(id)}
        const result = await userCollection.deleteOne(query)
        res.send(result)
    })

    // Update user 
    app.put("/users/:id", async (req, res) => {
        const id = req.params.id;
        const info = req.body;
        const filter = {_id: new ObjectId(id)};
        const options = {upsert: true};
        const updateInfo = {
            $set: {
                name: info.name,
                email: info.email
            }
        }
        const result = await userCollection.updateOne(filter, updateInfo, options)
        res.send(result)
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get("/", (req, res) => {
    res.send("server run successfully")
})

app.listen(port, () => {
    console.log(`This server run on ${port}`)
})

