const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json());

// Get ALL of something
app.get('/people', async (req, res) => {
  const people = await prisma.person.findMany();
  res.send(people);
});

app.get('/cars', async (req, res) => {
  const cars = await prisma.car.findMany();
  res.send(cars);
});

// Get a SPECIFIC instance of something
app.get('/person/:id', async (req, res) => {
  const { id } = req.params;
  const specificperson = await prisma.person.findUnique({
    where: { PersonID: parseInt(id, 10) }
  });
  res.send(specificperson);
});

app.get('/car/:id', async (req, res) => {
  const { id } = req.params;
  const specificcar = await prisma.car.findUnique({
    where: { CarID: parseInt(id, 10) }
  });
  res.send(specificcar);
});

// Add something
app.post('/person', async (req, res) => {
  const { FirstName, LastName, Age, Zip } = req.body;
  const newperson = await prisma.person.create({
    data: {
      FirstName,
      LastName,
      Age,
      Zip
    }
  });
  res.send(newperson);
});

app.post('/car', async (req, res) => {
  const { Make, Model, Year, Vin, PersonID } = req.body;
  const newcar = await prisma.car.create({
    data: {
      Make,
      Model,
      Year: Year.toString(),
      Vin,
      PersonID
    }
  });
  res.send(newcar);
});

// Get joined results
app.get('/person/:id/all', async (req, res) => {
  const { id } = req.params;
  const specificperson = await prisma.person.findUnique({
    where: { PersonID: parseInt(id, 10) },
    include: { Cars: true }
  });
  res.send(specificperson);
});

app.get('/car/:id/all', async (req, res) => {
  const { id } = req.params;
  const specificcar = await prisma.car.findUnique({
    where: { CarID: parseInt(id, 10) },
    include: { Owner: true }
  });
  res.send(specificcar);
});


const server = app.listen(3000);