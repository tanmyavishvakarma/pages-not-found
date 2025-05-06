import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import pg from 'pg'

dotenv.config();

console.log('herere')

const sequelize = new Sequelize(process.env.NEXT_PUBLIC_POSTGRES_URL, {
    dialect: 'postgres',
    dialectModule: pg,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: false
});

export default sequelize;