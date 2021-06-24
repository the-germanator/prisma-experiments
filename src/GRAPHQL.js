// TODO: Implement more routes mirroring REST.js
const { PrismaClient } = require('@prisma/client');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const prisma = new PrismaClient();
const typeDefs = `
  type Person {
    Personid: Int
    LastName: String
    FirstName: String
    Age: Int
    zip: Int
  }
  type Query {
    people: [Person!]!
    person(id: Int!): Person
  }
`;
const resolvers = {
  Query: {
    people: async () => {
      return await prisma.person.findMany();
    },
    async person(parent, args, context, info){
        return await prisma.person.findFirst({
            where: {
                Personid: args.id
            }
        })
    }
  }
};
const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
});
const app = express();
app.use('/graphql', graphqlHTTP({
  schema,
}));
app.listen(4000);