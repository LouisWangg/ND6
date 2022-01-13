module.exports = (sequelize, DataTypes) => {
    const StockDetail = sequelize.define('StockDetail', {
        stockDetailId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        batchId: {
            type: DataTypes.INTEGER
        },
        expiredDate: {
            type: DataTypes.DATE,
        },
        quantity: {
            type: DataTypes.INTEGER,
        },
        price: {
            type: DataTypes.INTEGER,
        },
        currentQty: {
            type: DataTypes.INTEGER,
        },
        status: {
            type: DataTypes.STRING,
        },
    })

    StockDetail.associate = models => {
        StockDetail.belongsTo(models.Stock, {
            foreignKey: 'stockId',
            onDelete: "cascade"
        }),
        StockDetail.belongsTo(models.Product, {
            foreignKey: 'productId',
            onDelete: "cascade"
        })
    }

    return StockDetail
}
