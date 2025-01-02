require('dotenv').config();
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT||3000

app.use(express.json())
app.use(cors())

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    const cardCollection = client.db("bistro-boss").collection("cards");
    // Create a  document
    app.get('/menu', async(req, res)=>{
        const menu = await menuCollection.find().toArray();
        res.send(menu);
    })
    
    app.get('/reviews', async(req, res)=>{
        const review = await reviewCollection.find().toArray();
        res.send(review);
    })
    app.get('/cards', async(req, res)=>{
        const email = req.query.email;
        console.log(email)
        const query = {email: email}
        const card = await cardCollection.find(query).toArray();
        res.send(card);
    })

    app.post('/cards', async (req, res)=>{
      const card = req.body;
      const result= cardCollection.insertOne(card);
      res.send(result); 
    })
    app.delete('/card/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id:new ObjectId (id)}
      const result = await cardCollection.deleteOne(query);
      res.send(result);
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