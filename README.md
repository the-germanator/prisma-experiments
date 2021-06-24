## Prisma Experiments

### TL;DR
Prisma allows teams to VERY quickly develop APIs and a Database based on abstractions and a shared codebase. Some considerations must be made regarding performance, security and maturity of the product.

### Introduction
During our company's annual hackathon, I've taken it upon myself to learn all I can about Prisma, and how it could make developing, prototyping and maintaining Databases and APIs easier. This document serves to explain the basics of Prisma, the sample code I've provided, and steps to reproduce my results at home.

### ***Q***: What is Prisma?
***A***: Prisma is a tool designed to unify API and Database development under one unified language and set of tools.

### ***Q***: Why is it important?
***A***: Developing a complex backend for an app involves coding in multiple languages, frameworks and paradigms. These monolithic pieces are often not (explicitly) designed to work together, and their integration can be a major hurdle to efficient development. Prisma is designed to help with this problem.

### ***Q***: How does it achieve this?
***A***: Prisma has a few tools aimed at making development of APIs easier. A (non-exhaustive) list is below:
   * A series of type definitions that abstract away the actual database syntax
   * A system to track structural changes to a database to prevent data loss when updating
   * An automatically generated connector for Node.js that hides lots of boilerplate code

### ***Q***: How could this be used?
***A***: As I see it, there are two possible use cases for this.
1. **Local Prototyping**: The main advantage in this area lies in the fact that the backend-agnostic type definitions integrate flawlessly with local databases like sqlite. This reduces the spin-up time for new developers and removes much of the complexity of setting up an environment that mirrors test or production. 

2. **"Real" Development**: For non mission critical apps (will be discussed later), the built in tools allow even inexperienced developers to set up a fully functional API with database in a matter of a few hours, less if they have experience with Prisma. The overall development time for app backends could be reduced by at least 50%.


## Example Code

***Note***: For this repo to work, a ```.env``` file must be present at the root of the repository, containing the database connection string. An example for a mysql database is as follows: ```DATABASE_URL="mysql://<username>:<password>@localhost:3306/<database name>"```. For more information, check the documentation.

There are several pieces of included example code in this repo. First is the prisma specific code located in ```prisma/schema.prisma```. This is an example of a simple type defintition for a table that contains basic information about people and their vehicles.

Once the database connection information has been added, running ```prisma db push``` will take the "models" in the schema.prisma file and attempt to apply them to the database. If the changes conflict with any existing data, a prompt will be shown in the console. This can be automatically avoided with the ```--accept-data-loss``` flag. (Similarly, ```prisma db migrate``` performs the same action, but makes a copy of the generated SQL for reference).

Once this is complete, Prisma will generate your new connectors and you're good to go.

// TODO: More here


## Usage
To use this example code, you should have already created your .env file, and potentially modified your schema.prisma file as needed. Once complete (and verified working), try adding a new model to the types, with a relationship to the **Person** table. Next, apply the changes to your database and then update the API (REST or GRAPHQL) to reflect this change.

