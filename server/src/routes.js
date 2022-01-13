const ProductController = require('./controllers/ProductController')
const StockController = require('./controllers/StockController')
const ProductPolicy = require('./policies/ProductPolicy')

module.exports = (app) => {
    app.get('/productList', ProductController.showProductList)
    app.post('/detailProduct', ProductController.showDetailProduct)
    app.post('/addProduct', ProductController.addProduct)
    app.put('/editProduct', ProductController.editProduct)
    app.delete('/deleteProduct', ProductController.deleteProduct)

    app.get('/showStockList', StockController.showStockList)
    app.post('/createStockDetail', StockController.createStockDetail)
    app.post('/createStock', StockController.createStock)
    app.post('/stockDetail', StockController.showStockDetail)
    app.post('/stockHeader', StockController.showStockHeader)
    app.post('/stockTotal', StockController.showStockTotal)
    app.put('/editQuantity', ProductPolicy.editQuantity, StockController.editQuantity)
    app.delete('/deleteStockDetail', StockController.deleteStockDetail)
    app.post('/showLogResult', StockController.showLogResult)
}
