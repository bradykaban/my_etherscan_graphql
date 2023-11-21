const { ApolloServer } = require('apollo-server'); // Import Apollo Server for building GraphQL server

const { importSchema } = require('graphql-import'); // Import schema from .graphql files

const EtherDataSource = require('./datasource/ethDatasource'); // Import custom data source for fetching Ethereum data

const typeDefs = importSchema('./schema.graphql'); // Load schema from .graphql file

require('dotenv').config(); // Load environment variables from .env file

const resolvers = {
  Query: {
    etherBalanceByAddress: (
      root,
      _args,
      { dataSources } // dataSources injected by Apollo Server to access data sources
    ) => dataSources.ethDataSource.etherBalanceByAddress(), // Resolver to get ether balance

    totalSupplyOfEther: (
      root,
      _args,
      { dataSources } // dataSources injected by Apollo Server to access data sources
    ) => dataSources.ethDataSource.totalSupplyOfEther(), // Resolver to get total ether supply

    latestEthereumPrice: (
      root,
      _args,
      { dataSources } // dataSources injected by Apollo Server to access data sources
    ) => dataSources.ethDataSource.getLatestEthereumPrice(), // Resolver to get latest ether price

    blockConfirmationTime: (
      root,
      _args,
      { dataSources } // dataSources injected by Apollo Server to access data sources
    ) => dataSources.ethDataSource.getBlockConfirmationTime(), // Resolver to get block confirmation time
  },
};

const server = new ApolloServer({
  // Create Apollo Server
  typeDefs,
  resolvers,

  dataSources: () => ({
    ethDataSource: new EtherDataSource(), // Instantiate Ethereum data source
  }),
});

server.timeout = 0;

server.listen('9000').then(({ url }) => {
  // Start server
  console.log(`🚀 Server ready at ${url}`);
});
