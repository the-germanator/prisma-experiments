const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json());

app.get('/people', async (req, res) => {
  const people = await prisma.person.findMany()
  res.send(people)
})

app.post('/people', async (req, res) => {
  const { first, last, age } = req.body
  const newperson = await prisma.person.create({
    data: {
      FirstName: first,
      LastName: last,
      Age: age
    }
  })
  res.send(newperson)
})
app.get('/person/:id', async (req, res) => {
  const { id } = req.params
  const specificperson = await prisma.person.findMany({
    where: { Personid: parseInt(id, 10) }
  })
  res.send(specificperson)
})

const server = app.listen(3000, () =>
  console.log(`🚀 Server ready at: http://localhost:3000`)
)