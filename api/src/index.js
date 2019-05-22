const express = require('express');
const bodyParser = require('body-parser');
const graphHttp = require('express-graphql');
// const schema = require('./schema');
const { buildSchema } = require('graphql');

const app = express();
app.use(bodyParser.json());

app.use('/graphql',
    graphHttp({
        schema: buildSchema(`
        type RootQuery {
            events: [String!]!
        }
        type RootMutation {
            createEvent(name: String): String
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
        rootValue: {
            events: () => {
                return ['Romantic Cooking', 'Sailing', 'All-Night Coding'];
            },
            createEvent: (args) => {
                const eventName = args.name;
                return eventName;
            }
        },
        graphiql: true
    })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))