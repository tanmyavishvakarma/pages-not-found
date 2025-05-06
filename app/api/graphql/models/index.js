import Author from "./author.model";
import Book from "./book.model";

Author.hasMany(Book, { foreignKey: 'authorId' });
Book.belongsTo(Author, { foreignKey: 'authorId' });

export { Author, Book };