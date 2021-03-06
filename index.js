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

app.delete('/villager/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            error: 'Bad Request',
            value: 'No id available in url'
        });
        return;
    }

    try {
        //connect to the db
        await client.connect();

        //retrieve the challenges collection data
        const colli = client.db('users').collection('villagers');

        // Validation for double challenges
        let result = await colli.deleteOne({ _id: ObjectId(req.params.id) });
        //Send back successmessage
        res.status(201).json(result);
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
})

// fish

app.get('/fish', async (req, res) => {

    try {
        await client.connect();
        const collection = client.db('users').collection('fish');
        const fish = await collection.find({}).toArray();

        res.status(200).send(fish);
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

app.get('/fish/:id', async (req, res) => {

    try {
        await client.connect();
        const collection = client.db('users').collection('fish');
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

app.post('/fish', async (req, res) => {

    try {
        //connect to the db
        await client.connect();

        //retrieve the challenges collection data
        const collection = client.db('users').collection('fish');

        // Validation for double challenges
        const fish = await collection.findOne({ _id: ObjectId(req.params.id) });
        if (fish) {
            res.status(400).send(`Bad request: Villager with name ${req.body.name} has already been added`);
            return;
        }
        // Create the new Challenge object
        let newFish = {
            id: req.body.id,
            filename: req.body.filename,
            name: req.body.name,
            icon: req.body.icon
        }

        // Insert into the database
        let insertResult = await collection.insertOne(newFish);

        //Send back successmessage
        res.status(201).json(newFish);
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

app.delete('/fish/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            error: 'Bad Request',
            value: 'No id available in url'
        });
        return;
    }

    try {
        //connect to the db
        await client.connect();

        //retrieve the challenges collection data
        const colli = client.db('users').collection('fish');

        // Validation for double challenges
        let result = await colli.deleteOne({ _id: ObjectId(req.params.id) });
        //Send back successmessage
        res.status(201).json(result);
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
})

// bugs

app.get('/bugs', async (req, res) => {

    try {
        await client.connect();
        const collection = client.db('users').collection('bugs');
        const bugs = await collection.find({}).toArray();

        res.status(200).send(bugs);
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

app.get('/bugs/:id', async (req, res) => {

    try {
        await client.connect();
        const collection = client.db('users').collection('bugs');
        const query = { _id: ObjectId(req.params.id) };
        const bugs = await collection.findOne(query);

        res.status(200).send(bugs);
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

app.post('/bugs', async (req, res) => {

    try {
        //connect to the db
        await client.connect();

        //retrieve the challenges collection data
        const collection = client.db('users').collection('bugs');

        // Validation for double challenges
        const bugs = await collection.findOne({ _id: ObjectId(req.params.id) });
        if (bugs) {
            res.status(400).send(`Bad request: Villager with name ${req.body.name} has already been added`);
            return;
        }
        // Create the new Challenge object
        let newBug = {
            id: req.body.id,
            filename: req.body.filename,
            name: req.body.name,
            icon: req.body.icon
        }

        // Insert into the database
        let insertResult = await collection.insertOne(newBug);

        //Send back successmessage
        res.status(201).json(newBug);
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

app.delete('/bugs/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            error: 'Bad Request',
            value: 'No id available in url'
        });
        return;
    }

    try {
        //connect to the db
        await client.connect();

        //retrieve the challenges collection data
        const colli = client.db('users').collection('bugs');

        // Validation for double challenges
        let result = await colli.deleteOne({ _id: ObjectId(req.params.id) });
        //Send back successmessage
        res.status(201).json(result);
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
})

// seacreatures

// app.get('/seacreatures', async (req, res) => {

//     try {
//         await client.connect();
//         const collection = client.db('users').collection('seacreatures');
//         const seacreatures = await collection.find({}).toArray();

//         res.status(200).send(seacreatures);
//     } catch (error) {

//         console.log(error);

//         res.status(500).send({
//             error: 'Something went wrong',
//             value: error
//         });
//     } finally {
//         client.close();
//     }

// })

// app.get('/seacreature/:id', async (req, res) => {

//     try {
//         await client.connect();
//         const collection = client.db('users').collection('seacreatures');
//         const query = { _id: ObjectId(req.params.id) };
//         const seacreatures = await collection.findOne(query);

//         res.status(200).send(seacreatures);
//     } catch (error) {

//         console.log(error);

//         res.status(500).send({
//             error: 'Something went wrong',
//             value: error
//         });
//     } finally {
//         client.close();
//     }

// })

// app.post('/seacreature', async (req, res) => {

//     try {
//         //connect to the db
//         await client.connect();

//         //retrieve the challenges collection data
//         const collection = client.db('users').collection('seacreatures');

//         // Validation for double challenges
//         const seacreatures = await collection.findOne({ _id: ObjectId(req.params.id) });
//         if (seacreatures) {
//             res.status(400).send(`Bad request: Villager with name ${req.body.name} has already been added`);
//             return;
//         }
//         // Create the new Challenge object
//         let newSeaCreature = {
//             id: req.body.id,
//             filename: req.body.filename,
//             name: req.body.name,
//             icon: req.body.icon
//         }

//         // Insert into the database
//         let insertResult = await collection.insertOne(newSeaCreature);

//         //Send back successmessage
//         res.status(201).json(newSeaCreature);
//         return;
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             error: 'Something went wrong',
//             value: error
//         });
//     } finally {
//         await client.close();
//     }
// });

// app.delete('/seacreature/:id', async (req, res) => {
//     if (!req.params.id) {
//         res.status(400).send({
//             error: 'Bad Request',
//             value: 'No id available in url'
//         });
//         return;
//     }

//     try {
//         //connect to the db
//         await client.connect();

//         //retrieve the challenges collection data
//         const colli = client.db('users').collection('seacreature');

//         // Validation for double challenges
//         let result = await colli.deleteOne({ _id: ObjectId(req.params.id) });
//         //Send back successmessage
//         res.status(201).json(result);
//         return;
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             error: 'Something went wrong',
//             value: error
//         });
//     } finally {
//         await client.close();
//     }
// })

// art

app.get('/art', async (req, res) => {

    try {
        await client.connect();
        const collection = client.db('users').collection('art');
        const art = await collection.find({}).toArray();

        res.status(200).send(art);
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

app.get('/art/:id', async (req, res) => {

    try {
        await client.connect();
        const collection = client.db('users').collection('art');
        const query = { _id: ObjectId(req.params.id) };
        const art = await collection.findOne(query);

        res.status(200).send(art);
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

app.post('/art', async (req, res) => {

    try {
        //connect to the db
        await client.connect();

        //retrieve the challenges collection data
        const collection = client.db('users').collection('art');

        // Validation for double challenges
        const seacreatures = await collection.findOne({ _id: ObjectId(req.params.id) });
        if (seacreatures) {
            res.status(400).send(`Bad request: Villager with name ${req.body.name} has already been added`);
            return;
        }
        // Create the new Challenge object
        let newArtPiece = {
            id: req.body.id,
            filename: req.body.filename,
            name: req.body.name,
            image: req.body.image
        }

        // Insert into the database
        let insertResult = await collection.insertOne(newArtPiece);

        //Send back successmessage
        res.status(201).json(newArtPiece);
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

app.delete('/art/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            error: 'Bad Request',
            value: 'No id available in url'
        });
        return;
    }

    try {
        //connect to the db
        await client.connect();

        //retrieve the challenges collection data
        const colli = client.db('users').collection('art');

        // Validation for double challenges
        let result = await colli.deleteOne({ _id: ObjectId(req.params.id) });
        //Send back successmessage
        res.status(201).json(result);
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
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})