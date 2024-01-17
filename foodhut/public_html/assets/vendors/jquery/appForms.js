const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const uri = "mongodb+srv://Zeniki2:Beta1996@clusterboda.doj7sbc.mongodb.net/Boda1DB?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.post('/guardar-invitado', async (req, res) => {
  const formData = req.body;

  try {
    await client.connect();
    const database = client.db('Boda1DB');
    const collection = database.collection('Boda');

    // Insertar datos en MongoDB
    const result = await collection.insertOne(formData);
    console.log(`Documento insertado con el ID: ${result.insertedId}`);

    res.json({ success: true, message: 'Datos guardados exitosamente' });
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});