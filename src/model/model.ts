import { DataTypes, Model, Optional, Sequelize } from "sequelize";
const sequelize = new Sequelize("bookapi", "root", "", {
    host: "localhost",
    dialect: "mysql"
});

interface AuthorAttributes {
    id: number;
    name: string;
    surname: string;
    age: number;
    email: string;
    password: string;
    token: string;
};

interface AuthorCreationAttributes extends Optional<AuthorAttributes, "id"> { };

class Author extends Model<AuthorAttributes, AuthorCreationAttributes> implements AuthorAttributes {
    declare id: number;
    declare name: string;
    declare surname: string;
    declare age: number;
    declare email: string;
    declare password: string;
    declare token: string;
};

Author.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: new DataTypes.STRING(255),
    surname: new DataTypes.STRING(255),
    age: DataTypes.INTEGER,
    email: new DataTypes.STRING(255),
    password: new DataTypes.STRING(255),
    token: new DataTypes.STRING(255)
}, {
    modelName: "authors",
    sequelize
});

Author.sync();

interface BookAttributes {
    id: number,
    name: string
};

interface BookCreationAttributes extends Optional<BookAttributes, "id"> { };

class Book extends Model<BookAttributes, BookCreationAttributes>
    implements BookAttributes {
    declare id: number;
    declare name: string;
};

Book.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: new DataTypes.STRING(255),
}, {
    modelName: "books",
    sequelize
});

Book.belongsTo(Author);
Author.hasMany(Book);
Book.sync();

module.exports = { Author, Book, sequelize }