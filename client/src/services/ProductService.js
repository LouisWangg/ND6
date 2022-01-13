import Api from '@/services/Api'

export default {
  showProductList () {
    return Api().get('productList')
  },
  detailProduct (productId) {
    return Api().post('detailProduct', productId)
  },
  addProduct (product) {
    return Api().post('addProduct', product)
  },
  editProduct (productDetail) {
    return Api().put('editProduct', productDetail)
  },
  deleteProduct (productId) {
    return Api().delete('deleteProduct', {
      data: { productId: productId }
    })
  },
}
