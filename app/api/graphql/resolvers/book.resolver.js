import { Op } from 'sequelize';
import { Book, Author } from '../models/index.js';
import Review from '../models/review.model.js';

export const bookResolvers = {
    Query: {
        books: async (_, { page = 1, limit = 10, filter = {} }) => {
            const offset = (page - 1) * limit;
            const where = {};

            if (filter.title) where.title = { [Op.iLike]: `%${filter.title}%` };
            if (filter.genre) where.genre = { [Op.iLike]: `%${filter.genre}%` };
            if (filter.authorId) where.authorId = filter.authorId;

            const { rows: items, count: totalItems } = await Book.findAndCountAll({
                where,
                limit,
                offset,
                include: [Author],
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
        book: async (_, { id }) => {
            return Book.findByPk(id, { include: [Author] });
        }
    },
    Mutation: {
        createBook: async (_, { input }) => {
            console.log({ input })
            const author = await Author.findByPk(input.authorId);
            if (!author) throw new Error('Author not found');
            return Book.create(input);
        },
        updateBook: async (_, { id, input }) => {
            const book = await Book.findByPk(id);
            if (!book) throw new Error('Book not found');
            return book.update(input);
        },
        deleteBook: async (_, { id }) => {
            const book = await Book.findByPk(id);
            if (!book) throw new Error('Book not found');
            await book.destroy();
            return true;
        }
    },
    Book: {
        author: async (book) => {
            return Author.findByPk(book.authorId);
        },
        reviews: async (book) => {
            return Review.find({ bookId: book.id }).sort({ createdAt: -1 });
        },
        averageRating: async (book) => {
            const reviews = await Review.find({ bookId: book.id });
            if (reviews.length === 0) return null;
            const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
            return sum / reviews.length;
        }
    }
};