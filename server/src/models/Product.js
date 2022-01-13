module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        productName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })

    Product.associate = models => {
        Product.hasMany(models.StockDetail, {
            foreignKey: 'productId',
            onDelete: "cascade"
        })
    }

    return Product
}