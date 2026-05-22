const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db')

class Session extends Model { }

Session.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    validate: {
      isInt: true
    }
  },
  session: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id'}
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'Session',
  tableName: '_sessions_'
})

module.exports = Session
