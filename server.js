const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/nationalParks', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to MongoDB!");
});

const parkSchema = new mongoose.Schema({
  name: String,
  lat: Number,
  lng: Number
});

const Park = mongoose.model('Park', parkSchema);

app.use(express.json()); // This middleware is used to parse JSON bodies

// CREATE a new park
app.post('/parks', (req, res) => {
  const newPark = new Park(req.body);
  newPark.save((err, park) => {
    if (err) return console.error(err);
    res.status(200).json(park);
  });
});

// READ all parks
app.get('/parks', (req, res) => {
  Park.find((err, parks) => {
    if (err) return console.error(err);
    res.status(200).json(parks);
  });
});

// UPDATE a park
app.put('/parks/:id', (req, res) => {
  const id = req.params.id;
  Park.findByIdAndUpdate(id, req.body, { new: true }, (err, park) => {
    if (err) return console.error(err);
    res.status(200).json(park);
  });
});

// DELETE a park
app.delete('/parks/:id', (req, res) => {
  const id = req.params.id;
  Park.findByIdAndRemove(id, (err) => {
    if (err) return console.error(err);
    res.status(200).send(`Park ${id} deleted.`);
  });
});


// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
});
