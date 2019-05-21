const { GraphQLObjectType , GraphQLString, GraphQLSchema} = require('graphql');

const ClienteType = new GraphQLObjectType({
    nome: 'Cliente',
    fields: () => ({
        nome: { type: GraphQLString },
        celular: { type: GraphQLString },
        telefone: { type: GraphQLString },
        documento: { type: GraphQLString },
        email: { type: GraphQLString },
        tipo: { type: GraphQLString }
    })
});

module.exports = new GraphQLSchema({
    
})