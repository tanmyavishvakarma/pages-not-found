import { Op } from 'sequelize';
import { Author, Book } from '../models/index.js';

export const authorResolvers = {
    Query: {
        authors: async (_, { page = 1, limit = 10, filter = {} }) => {
            const offset = (page - 1) * limit;
            const where = {};

            if (filter.name) where.name = { [Op.iLike]: `%${filter.name}%` };
            if (filter.country) where.country = filter.country;

            const { rows: items, count: totalItems } = await Author.findAndCountAll({
                where,
                limit,
                offset,
                include: [Book],
                order: [['createdAt', 'DESC']]
            });

            const totalPages = Math.ceil(totalItems / limit);

            return {
                items,
                totalItems,
                totalPages,
                currentPage: page
            };
        },
        author: async (_, { id }) => {
            return Author.findByPk(id, { include: [Book] });
        }
    },
    Mutation: {
        createAuthor: async (_, { input }) => {
            return Author.create(input);
        },
        updateAuthor: async (_, { id, input }) => {
            const author = await Author.findByPk(id);
            if (!author) throw new Error('Author not found');
            return author.update(input);
        },
        deleteAuthor: async (_, { id }) => {
            const author = await Author.findByPk(id);
            if (!author) throw new Error('Author not found');
            await author.destroy();
            return true;
        }
    },
    Author: {
        books: async (author) => {
            return Book.findAll({ where: { authorId: author.id } });
        }
    }
};