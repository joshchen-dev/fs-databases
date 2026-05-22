const { DataTypes } = require("sequelize")

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('_sessions_', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      session: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
      }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('_sessions_')
  }
}