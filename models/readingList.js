const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class ReadingList extends Model { }

ReadingList.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
    validate: {
      isInt: true
    }
  },
  blogId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'blogs', key: 'id' },
    validate: {
      isInt: true
    }
  },
  read: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'reading_list',
  tableName: 'reading_lists'
})

module.exports = ReadingList