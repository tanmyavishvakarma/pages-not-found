import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { NextRequest } from 'next/server';
import { typeDefs } from './schemas'
import { resolvers } from './resolvers';
import sequelize from './config/db.config';
import mongoConnect from './config/mongo.config';
import { Op } from 'sequelize';

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
});

const handler = startServerAndCreateNextHandler(apolloServer, {
    context: async (req) => {
        try {
            await sequelize.authenticate();
            await mongoConnect();
        } catch (error) {
            console.error('Database connection error:', error);
        }

        return {
            req,
            Op
        };
    },
});

export async function GET(request) {
    return handler(request);
}

export async function POST(request) {
    return handler(request);
}