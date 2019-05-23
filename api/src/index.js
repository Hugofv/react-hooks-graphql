const express = require("express");
const bodyParser = require("body-parser");
const graphHttp = require("express-graphql");
// const schema = require('./schema');
const { buildSchema } = require("graphql");

const bcrypt = require("bcryptjs");

const Event = require("./models/event");
const User = require("./models/user");

const app = express();

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphHttp({
    schema: buildSchema(`
        type Event {
            _id: ID!,
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type User {
            _id: ID!
            email: String!,
            password: String!
        }

        input EventInput {
            title: String!,
            description: String!,
            price: Float!,
            date: String!
        }

        input UserInput {
            email: String!
            password: String!
        }

        type RootQuery {
            events: [Event!]!
            users: [User!]!
        }

        type RootMutation {
            createEvent(eventIpunt: EventInput): Event
            createUser(userInput: UserInput): User
        }
        
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      events: () => {
        return Event.find({})
          .then(data => {
            return data.map(e => {
              return { ...e._doc };
            });
          })
          .catch(err => {
            throw err;
          });
      },
      createEvent: args => {
        const event = new Event({
          title: args.eventIpunt.title,
          description: args.eventIpunt.description,
          price: +args.eventIpunt.price,
          date: new Date(args.eventIpunt.date),
          creator: "5ce5db3e012d3339fc0d18ce"
        });

        return event
          .save()
          .then(result => {
            return User.findById("5ce5db3e012d3339fc0d18ce");
          })
          .then(user => {
            if (!user) {
              throw new Error("User not found.");
            }

            user.createdEvents.push(event);
            return user.save();
          })
          .then(result => {
            return { ...result._doc };
          })
          .catch(err => {
            console.log(err);
            throw err;
          });
      },
      users: () => {
        return User.find({})
          .then(data => {
            return data.map(e => {
              return { ...e._doc };
            });
          })
          .catch(err => {
            throw err;
          });
      },
      createUser: args => {
        return User.findOne({ email: args.userInput.email })
          .then(user => {
            if (user) {
              throw new Error("User exists already.");
            }
            return bcrypt.hash(args.userInput.password, 12);
          })
          .then(hashedPassword => {
            const user = new User({
              email: args.userInput.email,
              password: hashedPassword
            });
            return user.save();
          })
          .then(result => {
            console.log(result);
            return { ...result._doc };
          })
          .catch(err => {
            console.log(err);
            throw err;
          })
          .catch(err => {
            throw err;
          });
      }
    },
    graphiql: true
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
