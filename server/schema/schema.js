const graphql = require('graphql');
const _ = require('lodash');
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;
var books = [
    { id: '1', name: 'Faizan-e-Sunnat', Author: 'Hazrat Ilyas Qadri', genre: 'Sunnat' },
    { id: '2', name: 'Kashf-al-Mahjoob', Author: 'Ali bin Usman Hajveri', genre: 'Tasawwuf' },
    { id: '3', name: 'Seerat-e-Mustafa', Author: 'Noor Baksh Twakali', genre: 'Biography' },
    { id: '4', name: 'Bahaar-e-Shariyat', Author: 'Amjid Ali Aazmi', genre: 'Fiqh' }
]
const BookType = new GraphQLObjectType({
    name: "book",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
})
const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                return _.find(books, { id: args.id })
            }
        }


    }

})
module.exports = new GraphQLSchema({
    query: RootQuery
})