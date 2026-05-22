const { DataTypes } = require("sequelize")

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.changeColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.changeColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
      allowNull: false
    })
  }
}
