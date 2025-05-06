import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config';

const Book = sequelize.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING
    },
}, {
    timestamps: true
});

export default Book;