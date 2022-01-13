const { Op } = require("Sequelize");
const {Sequelize} = require('../models')
const {Product} = require('../models')
const {Stock} = require('../models')
const {StockDetail} = require('../models')

module.exports = {
    async showStockList (req, res) {
        try {
            const stockList = await Stock.findAll({
                order: [['stockId', 'DESC']],
                include: [
                    {
                        model: StockDetail,
                        attributes: [[Sequelize.fn('COUNT', Sequelize.col('stockDetailId')), 'qty']]
                    }
                ],
                group: ['stockId']
            })
            res.send(stockList)
        } catch (error) {
            res.status(500).send({
                error: error + 'Error on showing the stock list'
            })
        }
    },
    async createStock (req, res) {
        try {
            const {stockId, description, status, productId, expiredDate, quantity, price} = req.body

            if (stockId == null) {
                stockList = await Stock.create({
                    description: description,
                    status: status
                })
            } else {
                stockList = await Stock.create({
                    stockId: stockId,
                    description: description,
                    status: status
                })
            }

            const checkProduct = await Product.findOne({
                where: { productId: productId }
            })
            if (!checkProduct) {
                return res.status(403).send({
                    error: 'Product is not available'
                })
            }

            const lastStockDetail = await StockDetail.findOne({
                where: { productId: productId },
                order: [[ 'stockDetailId', 'DESC']]
            })

            if (stockList.status == 'In') {
                if (lastStockDetail == null) {
                    newQuantity = Number(quantity)
                } else {
                    newQuantity = Number(lastStockDetail.currentQty) + Number(quantity)
                }
                newStatus = 'Active'
                batch = await StockDetail.count({ 
                    where: { productId: checkProduct.productId }
                })
            } else if (stockList.status == 'Out') {
                newQuantity = Number(lastStockDetail.currentQty) - Number(quantity)
                newStatus = 'Active'
                batch = null
                if (lastStockDetail == null || newQuantity < 0) {
                    const lastStock = await Stock.findOne({
                        order: [[ 'stockId', 'DESC']]
                    })
                    lastStock.destroy()
                    return res.status(403).send({
                        error: 'The product quantity is insufficient'
                    })
                }
            } else if (stockList.status == 'End') {
                newQuantity = 0
                newStatus = 'Inactive'
            }

            const stockDetail = await StockDetail.create({
                batchId: batch,
                expiredDate: expiredDate,
                quantity: quantity,
                price: price,
                currentQty: newQuantity,
                status: newStatus,
                stockId: stockList.stockId,
                productId: checkProduct.productId
            })
            res.send(stockList)
        } catch (error) {
            res.status(500).send({
                error: error + ' Error on creating new stock'
            })
        }
    },
    async createStockDetail (req, res) {
        try {
            const {stockId, status, productId, expiredDate, quantity, price} = req.body

            const checkProduct = await Product.findOne({
                where: { productId: productId }
            })
            if (!checkProduct) {
                return res.status(403).send({
                    error: 'Product is not available'
                })
            }

            checkStock = await StockDetail.findOne({
                where: { stockId: stockId, productId: productId }
            })

            const lastStockDetail = await StockDetail.findOne({
                where: { productId: productId },
                order: [[ 'stockDetailId', 'DESC']]
            })

            if (status == 'In') {
                if (lastStockDetail == null) {
                    newQuantity = Number(quantity)
                } else {
                    newQuantity = Number(lastStockDetail.currentQty) + Number(quantity)
                }
                newStatus = 'Active'
                batch = await StockDetail.count({ 
                    where: { productId: checkProduct.productId }
                })
            } else if (status == 'Out') {
                newQuantity = Number(lastStockDetail.currentQty) - Number(quantity)
                newStatus = 'Active'
                batch = null
                if (lastStockDetail == null || newQuantity < 0) {
                    return res.status(403).send({
                        error: ' The product quantity is insufficient'
                    })
                }
            } else if (status == 'End') {
                newQuantity = 0
                newStatus = 'Inactive'
            }

            if (checkStock) {
                updateQuantity = Number(checkStock.quantity) + Number(quantity)
                updateCurrentQty = Number(checkStock.currentQty) + Number(quantity)
                stockDetail = await StockDetail.update(
                    { quantity: updateQuantity, currentQty: updateCurrentQty },
                    { where: { stockId: stockId, productId: productId }}
                )
            } else if (checkStock == null) {
                stockDetail = await StockDetail.create({
                    batchId: batch,
                    expiredDate: expiredDate,
                    quantity: quantity,
                    price: price,
                    currentQty: newQuantity,
                    status: newStatus,
                    stockId: stockId,
                    productId: checkProduct.productId
                })
            }
            res.send(stockDetail)
        } catch (err) {
            res.status(500).send({
                error: err + ' Error on adding a new product'
            })
        }
    },
    async showStockDetail (req, res) {
        try {
            const {stockId} = req.body
            const stockDetail = await StockDetail.findAll({
                where: { stockId: stockId },
                include: [
                    {
                        model: Product,
                        attributes: ['productId', 'productName']
                    },
                    {
                        model: Stock,
                        attributes: ['stockId', 'description', 'status']
                    }
                ]
            })
            res.send(stockDetail)
        } catch (error) {
            res.status(500).send({
                error: err + ' Error on showing the stock detail'
            })
        }
    },
    async showStockHeader (req, res) {
        try {
            const {stockId} = req.body
            const stockHeader = await Stock.findOne(
                { where: { stockId: stockId }}
            )
            res.send(stockHeader)
        } catch (error) {
            res.status(500).send({
                error: err + ' Error on showing the stock header'
            })
        }
    },
    async showStockTotal (req, res) {
        try {
            const {stockId} = req.body
            const itemType = await StockDetail.count({ where: { stockId: stockId }})
            const totalQty = await StockDetail.sum('quantity', { where: { stockId: stockId }})
            const amount = await StockDetail.sum('price', { where: { stockId: stockId }})
            res.send({itemType, totalQty, amount})
        } catch (error) {
            res.status(500).send({
                error: err + ' Error on showing the stock total'
            })
        }
    },
    async editQuantity (req, res) {
        try {
            const {stockDetailId, productId, quantity, status} = req.body

            const lastStockDetail = await StockDetail.findOne({
                where: { productId: productId },
                order: [[ 'createdAt', 'DESC']]
            })
            console.log(" >>> HOIIIII <<< ")

            if (status == 'In') {
                if (quantity > lastStockDetail.quantity) {
                    newQuantity = Number(lastStockDetail.currentQty) + (Number(quantity) - Number(lastStockDetail.quantity))
                } else if (quantity < lastStockDetail.quantity) {
                    newQuantity = Number(lastStockDetail.currentQty) - (Number(lastStockDetail.quantity) - Number(quantity))
                }
            } else if (status == 'Out') {
                if (quantity > lastStockDetail.quantity) {
                    newQuantity = Number(lastStockDetail.currentQty) - (Number(quantity) - Number(lastStockDetail.quantity))
                } else if (quantity < lastStockDetail.quantity) {
                    newQuantity = Number(lastStockDetail.currentQty) + (Number(lastStockDetail.quantity) - Number(quantity))
                }
            }

            if (newQuantity < 0) {
                return res.status(403).send({
                    error: 'The product quantity is insufficient'
                })
            }

            const stockDetail = await StockDetail.update(
                { currentQty: newQuantity, quantity: quantity },
                { where: { stockDetailId: stockDetailId }}
            )
            res.send(stockDetail)
        } catch (error) {
            res.status(500).send({
                error: error + 'Error on editing selected product'
            })
        }
    },
    async deleteStockDetail (req, res) {
        try {
            const {stockDetailId} = req.body.stockDetailId
            const stockDetail = await StockDetail.findOne({ 
                where: { stockDetailId: stockDetailId }
            })
            stockDetail.destroy()
            res.send(stockDetail)
        } catch (err) {
            res.status(500).send({
                error: err + ' Error occured when trying to delete the product'
            })
        }
    },
    async showLogResult (req, res) {
        try {
            const {productId, startDate, endDate} = req.body

            if (productId == null || productId == "") {
                result = await StockDetail.findAll({ 
                    where: { 
                        createdAt: {
                            [Op.between]: [startDate, endDate]
                        }
                    },
                    include: [
                        {
                            model: Stock
                        }
                    ]
                })
            } else {
                result = await StockDetail.findAll({ 
                    where: { 
                        productId: productId,
                        createdAt: {
                            [Op.between]: [startDate, endDate]
                        }
                    },
                    include: [
                        {
                            model: Stock
                        }
                    ]
                })
            }
            res.send(result)
        } catch (err) {
            res.status(500).send({
                error: err + ' Error occured when trying to show the result'
            })
        }
    }
}