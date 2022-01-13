const {Sequelize} = require('../models')
const {Product} = require('../models')
const {Stock} = require('../models')
const {StockDetail} = require('../models')

module.exports = {
    async showProductList (req, res) {
        try {
            const productList = await Product.findAll()
            res.send(productList)
        } catch (error) {
            res.status(500).send({
                error: 'Error on showing the product list'
            })
        }
    },
    async showDetailProduct (req, res) {
        try {
            const {productId} = req.body
            
            const maxQty = await StockDetail.max('currentQty', { where: { productId: productId }})
            const stockDetail = await StockDetail.findOne({
                where: { productId: productId, currentQty: maxQty }
            })
            res.send(stockDetail)
        } catch (err) {
            res.status(500).send({
                error: 'Error on showing detail of selected product'
            })
        }
    },
    async addProduct (req, res) {
        try {
            const {productName, description} = req.body
            const checkProduct = await Product.findOne({
                where: {productName: productName}
            })

            if (checkProduct) {
                return res.status(403).send({
                    error: 'Product already registered on database'
                })
            }

            const product = await Product.create({
                productName: productName,
                description: description
            })
            const stock = await Stock.create({
                description: "Beginning",
                status: "Beginning"
            })
            const stockDetail = await StockDetail.create({
                batchId: 0,
                quantity: 0,
                price: 0,
                status: "Beginning",
                stockId: stock.stockId,
                productId: product.productId
            })
            res.send({product, stock, stockDetail})
        } catch (err) {
            res.status(500).send({
                error: err + 'Error on adding a new product'
            })
        }
    },
    async editProduct (req, res) {
        try {
            const {productId, productName, description} = req.body
            const productList = await Product.update(
                { 
                    productName: productName,
                    description: description
                },
                { where: { productId: productId }}
            )
            console.log("%j", productId)
            res.send(productList)
        } catch (error) {
            res.status(500).send({
                error: 'Error on editing selected product'
            })
        }
    },
    async deleteProduct (req, res) {
        try {
            const {productId} = req.body.productId
            const productList = await Product.findOne({ 
                where: { productId: productId }
            })
            productList.destroy()
            res.send(productList)
        } catch (err) {
            res.status(500).send({
                error: 'Error on deleting selected product'
            })
        }
    },
}