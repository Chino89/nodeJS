const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db-config');

const Library = require('./library');

const Book = sequelize.define('Books', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  isbn: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  library: {
    type: DataTypes.INTEGER,
    allowNull: true,
    require: false,
  },
});

Library.hasMany(Book, {
  foreignKey: 'library',
});

module.exports = Book;
