const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// *********************************  MONGODB ************************************************ \\

const uri =
  "mongodb+srv://simpleCrud:nIczBcE8MFWJclbo@simple-crud-server.g63foxm.mongodb.net/?retryWrites=true&w=majority&appName=simple-crud-server";

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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // Send a ping to confirm a successful connection
    //! APIs for send data on MongoDB server / database

    const database = client.db('usersDB');
    const usersCollection = database.collection('users');

    app.get('/crudusers', async (req, res) => {
      const cursor = usersCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    app.post('/crudusers', async(req, res) => {
      const user = req.body;
      console.log('new user: ', user);
      const result = await usersCollection.insertOne(user);
      res.send(result)


    })


    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

//****************************************** MONGODB ENDS ******************************************************\\ 
//! Middleware
app.use(cors());
app.use(express.json());
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    age: 30,
  },
];

app.get("/", (req, res) => {
  res.send(
    "Hello Ayaaz, your user mnagement server is running at http://localhost"
  );
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.post("/users", (req, res) => {
  console.log(req.body);
  const newUser = req.body;
  newUser.id = users.length + 1;
  users.push(newUser);
  res.send(newUser);
});

app.listen(port, () => {
  console.log(`Server is running on Port: ${port}`);
});
