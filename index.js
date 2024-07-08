const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 3000;

//midlewares
app.use(cors());
app.use(express.json());

//pass-44KsD00rTSMqZRkL
//user-Jakuan

const uri =
  "mongodb+srv://Jakuan:44KsD00rTSMqZRkL@cluster0.jkydfau.mongodb.net/?appName=Cluster0";

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

    //create collection || make putting data in db
    const UserCollection = client.db("userDB").collection("users");
    //get || read = single doc
    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await UserCollection.findOne(query);
      res.send(user);
    });
    //get || read = multiple doc
    app.get("/users", async (req, res) => {
      const cursor = UserCollection.find();
      const user = await cursor.toArray();
      res.send(user);
    });

    //create || post
    app.post("/users", async (req, res) => {
      const newUser = req.body;
      console.log("new user", newUser);
      const result = await UserCollection.insertOne(newUser);
      res.send(result);
    });

    //update || put 
    app.put("/users/:id",async (req, res) => {
      const id=req.params.id;
      const user=req.body
      console.log('updated user',user)
      const filter={_id : new ObjectId(id)}
      const option={upsert:true}
      const updateUser={
        $set:{
          name:user.name,
          email:user.email,
        }
      }
      const result=await UserCollection.updateOne(filter,updateUser,option);
      res.send(result)

    });

    //delete || remove
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      console.log("please delete this FROM DATABASE", id);
      const query = { _id: new ObjectId(id) };
      const deleteUser = await UserCollection.deleteOne(query);
      console.log("Successfully deleted this user", deleteUser);
      res.send(deleteUser);
    });

    // Send a ping to confirm a successful connection
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

app.get("/", (req, res) => {
  res.send("SIMPLE CRUD IS RUNNING");
});

//listen
app.listen(port, (req, res) => {
  console.log(`SIMPLE CRUD IS RUNNING ON PORT ${port}`);
});
