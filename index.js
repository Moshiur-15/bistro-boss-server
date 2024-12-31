require('dotenv').config();
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT||3000

app.use(express.json())
app.use(cors())

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://bistro-boss:UNDkK1LieTTsdSn8@cluster0.c3dgh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    // Create a collection
    const menuCollection = client.db("bistro-boss").collection("menu");
    const reviewCollection = client.db("bistro-boss").collection("reviews");
    // Create a  document
    app.get('/menu', async(req, res)=>{
        const menu = await menuCollection.find().toArray();
        res.send(menu);
    })
    
    app.get('/reviews', async(req, res)=>{
        const review = await reviewCollection.find().toArray();
        res.send(review);
    })

} finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('bistro-boss-server')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})