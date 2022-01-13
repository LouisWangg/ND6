<template>
  <v-container grid-list-md>
    <v-row no-gutters>
      <v-col md="4">
        <div class="elevation-2 sideBar">
          <v-toolbar flat class="blue-grey lighten-1" dark>
              <v-toolbar-title>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" class="mb-3 search" single-line hide-details />
              </v-toolbar-title>
          </v-toolbar>

          <v-data-table :headers="headers" :items="productList" :search="search" class="elevation-1 grey lighten-4">
            <template v-slot:[`item.actions`]="{ item }">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                    <v-icon class="mr-5" small dark color="grey darken-1"
                      @click="showDetailProduct(item)" v-bind="attrs" v-on="on">mdi-note-search-outline</v-icon>
                </template>
                <span>Detail</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                    <v-icon class="mr-5" small dark color="grey darken-1" 
                      @click="openEditDialog(item)" v-bind="attrs" v-on="on">mdi-pencil</v-icon>
                </template>
                <span>Edit</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                    <v-icon small dark color="grey darken-1" 
                      @click="openDeleteDialog(item)" v-bind="attrs" v-on="on">mdi-delete</v-icon>
                </template>
                <span>Delete</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </div>
      </v-col>

      <v-col offset-md="1">
        <div class="elevation-2 sideBar">
          <v-toolbar flat class="blue-grey lighten-1">
            <v-toolbar-title class="title">Product Detail</v-toolbar-title>
            <v-spacer />
            <v-toolbar-title>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="mx-5" small 
                    @click="openAddDialog" v-bind="attrs" v-on="on">
                    <v-icon dark>mdi-plus</v-icon>
                  </v-btn>
                </template>
                <span>Add Product</span>
              </v-tooltip>
            </v-toolbar-title>
          </v-toolbar>

          <div class="pl-4 pr-4 pt-2 pb-2">
            <v-text-field v-model="detailProduct.productId" label="Product ID" class="mt-2 ml-4"></v-text-field>
            <v-text-field v-model="detailProduct.productName" label="Product Name" class="mt-2 ml-4"></v-text-field>
            <v-text-field v-model="detailProduct.description" label="Description" class="mt-2 ml-4"></v-text-field>
            <v-text-field v-model="detailStock.expiredDate" label="Expired Date" class="mt-2 ml-4"></v-text-field>
            <v-text-field v-model="detailStock.currentQty" label="Quantity" class="mt-2 ml-4"></v-text-field>
            <v-text-field v-model="detailStock.price" label="Price" class="mt-2 ml-4"></v-text-field>
          </div>
        </div>
      </v-col>
    </v-row>
    
    <v-dialog v-model="addProductDialog" dark width="500">
      <v-card>
        <v-card-title class="headline">Add Product</v-card-title>
        <v-card-text>
          <v-text-field v-model="detailProduct.productName" label="Product Name" />
          <v-text-field v-model="detailProduct.description" label="Description" />
        </v-card-text>
        <div class="error" v-html="error" />
        <br />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue lighten-2 mb-4 mr-2" @click="add">Add</v-btn>
          <v-btn color="red darken-2 mb-4" @click="addProductDialog = false, error = null">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="addProductSnackbar" :timeout="timeout">
      Add product successful!
      <template v-slot:action="{ attrs }">
        <v-btn color="blue lighten-2" text v-bind="attrs" @click="addProductSnackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
    
    <v-dialog v-model="editDialog" dark width="500">
      <v-card>
        <v-card-title>Edit Product</v-card-title>
        <v-card-text>
          <v-text-field v-model="detailProduct.productId" disabled label="Product ID" />
          <v-text-field v-model="detailProduct.productName" label="Product Name" />
          <v-text-field v-model="detailProduct.description" label="Description" />
          <v-text-field v-model="detailStock.expiredDate" disabled label="Expired Date" />
          <v-text-field v-model="detailStock.currentQty" disabled label="Quantity" />
          <v-text-field v-model="detailStock.price" disabled label="Price" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue lighten-2 mb-4 mr-2" @click="save">Save</v-btn>
          <v-btn color="red darken-2 mb-4" @click="editDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="editSnackbar" :timeout="timeout">
      Edit successful!
      <template v-slot:action="{ attrs }">
        <v-btn color="blue lighten-2" text v-bind="attrs" @click="editSnackbar = false">Close</v-btn>
      </template>
    </v-snackbar>

    <v-dialog v-model="deleteDialog" dark width="500">
      <v-card>
        <v-card-title class="headline">Delete Product</v-card-title>
        <v-card-text>
          <h3 class="text-center mt-8 mb-2">Are you sure of deleting selected product?</h3>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-2 mb-4 mr-2" @click="deletes">Delete</v-btn>
          <v-btn color="blue lighten-2 mb-4" @click="deleteDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="deleteSnackbar" :timeout="timeout">
      Delete successful!
      <template v-slot:action="{ attrs }">
        <v-btn color="blue lighten-2" text v-bind="attrs" @click="deleteSnackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import ProductService from '@/services/ProductService'

export default {
  data () {
    return {
      search: null,
      error: null,
      addProductDialog: false,
      addProductSnackbar: false,
      editDialog: false,
      editSnackbar: false,
      deleteDialog: false,
      deleteSnackbar: false,
      timeout: 2000,
      productList: [],
      headers: [
        { text: 'ID', align: 'center', sortable: false, value: 'productId' },
        { text: 'Name', align: 'center', value: 'productName' },
        { text: '', value: 'actions', sortable: false }
      ],
      detailProduct: {
        productId: null,
        productName: null,
        description: null
      },
      detailStock: {
        expiredDate: null,
        currentQty: null,
        price: null
      },
      detailProductIndex: 0,
      error: null
    }
  },
  async mounted () {
    this.productList = (await ProductService.showProductList()).data
  },
  methods: {
    async showDetailProduct (item) {
      this.detailProductIndex = this.productList.indexOf(item)
      this.detailProduct = Object.assign({}, item)
      const stock = await ProductService.detailProduct({
        productId: this.detailProduct.productId
      })
      if (stock.data.currentQty == null) {
        this.detailStock.expiredDate = 0,
        this.detailStock.currentQty = 0,
        this.detailStock.price = 0
      }
      this.detailStock = stock.data
    },
    async openAddDialog (item) {
      this.addProductDialog = true
      this.detailProduct = {}
      this.detailStock = {}
    },
    async add () {
      try {
        await ProductService.addProduct({
          productName: this.detailProduct.productName,
          description: this.detailProduct.description
        })
        this.addProductDialog = false
        this.addProductSnackbar = true
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async openEditDialog (item) {
      this.detailProductIndex = this.productList.indexOf(item)
      this.detailProduct = Object.assign({}, item)
      const stock = await ProductService.detailProduct({
        productId: this.detailProduct.productId
      })
      this.detailStock = stock.data
      this.editDialog = true
    },
    async save () {
      await ProductService.editProduct({
        productId: this.detailProduct.productId,
        productName: this.detailProduct.productName,
        description: this.detailProduct.description
      })
      this.productList[this.detailProductIndex].productName = this.detailProduct.productName
      this.productList[this.detailProductIndex].description = this.detailProduct.description
      this.editDialog = false
      this.editSnackbar = true
    },
    async openDeleteDialog (item) {
      this.detailProductIndex = this.productList.indexOf(item)
      this.detailProduct = Object.assign({}, item)
      this.detailStock = Object.assign({}, item)
      this.deleteDialog = true
    },
    async deletes () {
      await ProductService.deleteProduct({productId: this.detailProduct.productId})
      this.productList.splice(this.detailProductIndex, 1)
      this.deleteDialog = false
      this.deleteSnackbar = true
    }
  },
}
</script>

<style scoped>
.error {
  color: black;
  width: 350px;
  margin-left: 75px;
}

.v-text-field {
  width: 350px;
}

.v-select {
  width: 250px;
}

.sideBar {
  background-color: #EEEEEE;
}

.title {
  color: white;
  margin-left: 12px;
}
</style>
