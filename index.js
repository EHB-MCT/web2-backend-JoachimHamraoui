// coded using our Fullstack Webapp by Cas, Rhys and myself (Joachim) as reference

const bodyParser = require('body-parser');
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config()
const cors = require('cors');

const client = new MongoClient(process.env.FINAL_URL)

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

//CORS error - https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9
//²group project team cas 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/', (req, res) => {
    res.status(500).redirect('/info.html');
})

app.get('/villagers', async (req, res) => {

    try {
        await client.connect();
        const collection = client.db('users').collection('villagers');
        const villagers = await collection.find({}).toArray();

        res.status(200).send(villagers);
    } catch (error) {

        console.log(error);

        res.status(500).send({
            error: 'Something went wrong',
            value: error
        });
    } finally {
        client.close();
    }

})

app.get('/villager/:id', async (req, res) => {

    try {
        await client.connect();
        const collection = client.db('users').collection('villagers');
        const query = { _id: ObjectId(req.params.id) };
        const villager = await collection.findOne(query);

        res.status(200).send(villager);
    } catch (error) {

        console.log(error);

        res.status(500).send({
            error: 'Something went wrong',
            value: error
        });
    } finally {
        client.close();
    }

})

app.post('/villager', async (req, res) => {

    try {
        //connect to the db
        await client.connect();

        //retrieve the challenges collection data
        const collection = client.db('users').collection('villagers');

        // Validation for double challenges
        const villager = await collection.findOne({ _id: ObjectId(req.params.id) });
        if (villager) {
            res.status(400).send(`Bad request: Villager with name ${req.body.name} has already been added`);
            return;
        }
        // Create the new Challenge object
        let newVillager = {
            id: req.body.id,
            filename: req.body.filename,
            name: req.body.name,
            icon: req.body.icon
        }

        // Insert into the database
        let insertResult = await collection.insertOne(newVillager);

        //Send back successmessage
        res.status(201).json(newVillager);
        return;
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: 'Something went wrong',
            value: error
        });
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})