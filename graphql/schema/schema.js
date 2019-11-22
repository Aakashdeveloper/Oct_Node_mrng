const graphql = require('graphql');
const _ = require('lodash');

const{
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema
} = graphql

const products = [
    {
        "Id": 1,
        "productName": "Leaf Rake",
        "productCode": "GDN-0011",
        "releaseDate": "March 19, 2016",
        "description": "Leaf rake with 48-inch wooden handle.",
        "price": 19.95,
        "starRating": 3.5,
        "imageUrl": "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
      },
      {
        "Id": 2,
        "productName": "Garden Cart",
        "productCode": "GDN-0023",
        "releaseDate": "March 18, 2016",
        "description": "15 gallon capacity rolling garden cart",
        "price": 32.99,
        "starRating": 4.2,
        "imageUrl": "http://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png"
      },
      {
        "Id": 3,
        "productName": "Hammer",
        "productCode": "TBX-0048",
        "releaseDate": "May 21, 2016",
        "description": "Curved claw steel hammer",
        "price": 8.9,
        "starRating": 4.8,
        "imageUrl": "https://i.ibb.co/TrR7jkM/hammer.png"
      }
]

const ProductType = new GraphQLObjectType({
    name:'Product',
    fields:{
        Id: {type:GraphQLInt},
        productName: {type:GraphQLString},
        productCode: {type:GraphQLString},
        releaseDate: {type:GraphQLString},
        description: {type:GraphQLString},
        price: {type:GraphQLInt},
        starRating: {type:GraphQLInt},
        imageUrl: {type:GraphQLString}
    }
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        product:{
            type: ProductType,
            args:{Id:{type:GraphQLInt}},
            resolve(parentValue,args){
                return _.find(products,{Id:args.Id})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})

