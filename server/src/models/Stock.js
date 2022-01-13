module.exports = (sequelize, DataTypes) => {
    const Stock = sequelize.define('Stock', {
        stockId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })

    Stock.associate = models => {
        Stock.hasMany(models.StockDetail, {
            foreignKey: 'stockId',
            onDelete: "cascade"
        })
    }

    return Stock
}
