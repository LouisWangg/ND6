import Api from '@/services/Api'

export default {
  showStockList () {
    return Api().get('showStockList')
  },
  createStockDetail (product) {
    return Api().post('createStockDetail', product)
  },
  createStock (stock) {
    return Api().post('createStock', stock)
  },
  showStockDetail (stockId) {
    return Api().post('stockDetail', stockId)
  },
  showStockHeader (stockId) {
    return Api().post('stockHeader', stockId)
  },
  showStockTotal (stockId) {
    return Api().post('stockTotal', stockId)
  },
  editQuantity (quantity) {
    return Api().put('editQuantity', quantity)
  },
  deleteStockDetail (stockDetailId) {
    return Api().delete('deleteStockDetail', {
      data: { stockDetailId: stockDetailId }
    })
  },
  showLogResult (date) {
    return Api().post('showLogResult', date)
  },
}
