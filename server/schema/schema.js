const graphql = require('graphql');
const _ = require('lodash');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;
//dummy data of books
var books = [
        { id: '1', name: 'Faizan-e-Sunnat', Author: 'Hazrat Ilyas Qadri', genre: 'Sunnat', authorId: '1' },
        { id: '2', name: 'Kashf-al-Mahjoob', Author: 'Ali bin Usman Hajveri', genre: 'Tasawwuf', authorId: '2' },
        { id: '3', name: 'Seerat-e-Mustafa', Author: 'Noor Baksh Twakali', genre: 'Biography', authorId: '3' },
        { id: '4', name: 'Bahaar-e-Shariyat', Author: 'Amjid Ali Aazmi', genre: 'Fiqh', authorId: '4' }
    ]
    //dummy data of Author
var authors = [
    { id: '1', name: 'Hazrat Ilyas Qadri', status: 'Alive' },
    { id: '2', name: 'Ali bin Usman Hajveri', status: 'Late' },
    { id: '3', name: 'Noor Baksh Twakali', status: 'Late' },
    { id: '4', name: 'Amjid Ali Aazmi', status: 'Late' }
]
const BookType = new GraphQLObjectType({
    name: "book",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        // tempo: {
        //     type: AuthorType,
        //     resolve(parent, args) {
        //         return_.find(authors, { id: parent.authorId })
        //     }
        // }
        author: {
            type: AuthorType,
            resolve(parent, args) {
                console.log(parent)
                return _.find(authors, { id: parent.authorId })
            }
        }
    })
})
const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        status: { type: GraphQLString }
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
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                return _.find(authors, { id: args.id })
            }
        }


    }

});
module.exports = new GraphQLSchema({
    query: RootQuery
})