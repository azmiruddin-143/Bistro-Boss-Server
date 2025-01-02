require('dotenv').config()
const express = require('express');
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 5000

const uri = `mongodb+srv://${process.env.BD_BISTROUSER}:${process.env.BD_BISTROPASS}@cluster0.8luat.mongodb.net/?retryWrites=true&w=majority&appName=Cluster01`;

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
    // await client.connect();

    // start back end/

    const database = client.db("restaurant");
    const menuCollection = database.collection("menu");
    const reviewCollection = database.collection("review");

    app.get('/menu', async (req,res) =>{
        const result = await menuCollection.find().toArray();
        res.send(result)
    })
       
    app.get('/review', async (req,res) =>{
        const result = await reviewCollection.find().toArray();
        res.send(result)
    })
       


    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res) =>{
  res.send('Restrurand Website...')
})

app.listen(port,(req,res) =>{
    console.log('server coltace',port);
})
