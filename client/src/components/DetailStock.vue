<template>
  <v-container grid-list-md>
    <v-row no-gutters>
      <v-col align="center">
        <panel title="Transaction Header">
          <v-row>
            <div>
              <v-text-field v-model="stockHeader.stockId" label="Document Number" class="mt-2 ml-4 textField" disabled></v-text-field>
            </div>
          </v-row>
          <v-row>
            <div>
              <v-text-field v-model="stockHeader.description" label="Description" class="mt-2 ml-4 mr-4 description" disabled></v-text-field>
            </div>
            <div>
              <v-text-field v-model="stockHeader.status" label="Status" class="mt-3 ml-12 textField" disabled></v-text-field>
            </div>
          </v-row>
        </panel>

        <panel title="Transaction Total">
          <v-row v-if="stockHeader.status == 'In'">
            <div>
              <v-text-field v-model="stockTotal.itemType" label="Type of items" class="mt-2 ml-4 textField" disabled></v-text-field>
            </div>
            <div>
              <v-text-field v-model="stockTotal.totalQty" label="Quantity" class="mt-2 ml-16 textField" disabled></v-text-field>
            </div>
            <div>
              <v-text-field v-model="stockTotal.amount" label="Amount" class="mt-3 ml-16 textField" disabled></v-text-field>
            </div>
          </v-row>
          
          <v-row v-if="stockHeader.status == 'Out' || stockHeader.status == 'End'">
            <div>
              <v-text-field v-model="stockTotal.itemType" label="Type of items" class="mt-2 ml-4 textField" disabled></v-text-field>
            </div>
            <div>
              <v-text-field v-model="stockTotal.totalQty" label="Quantity" class="mt-2 ml-16 textField" disabled></v-text-field>
            </div>
          </v-row>
        </panel>

        <panel title="Transaction Detail">
          <v-row no-gutters>
            <v-spacer class="mr-16 pr-16" />
            <v-btn @click="addProductDialog = true, error = null" class="mx-2 mb-4" dark color="grey darken-1">
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </v-row>
          <v-data-table v-if="stockHeader.status == 'In'" :headers="headersIn" :items="detailStock" :search="search" class="elevation-1">
            <template v-slot:[`item.actions`]="{ item }">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                    <v-icon class="mr-5" small dark color="grey darken-1" 
                      @click="openEditDialog(item), error = null" v-bind="attrs" v-on="on">mdi-pencil</v-icon>
                </template>
                <span>Edit</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                    <v-icon small dark color="grey darken-1" 
                      @click="openDeleteDialog(item), error = null" v-bind="attrs" v-on="on">mdi-delete</v-icon>
                </template>
                <span>Delete</span>
              </v-tooltip>
            </template>
          </v-data-table>
          
          <v-data-table v-if="stockHeader.status == 'Out'" :headers="headersOut" :items="detailStock" :search="search" class="elevation-1">
            <template v-slot:[`item.actions`]="{ item }">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                    <v-icon class="mr-5" small dark color="grey darken-1" 
                      @click="openEditDialog(item), error = null" v-bind="attrs" v-on="on">mdi-pencil</v-icon>
                </template>
                <span>Edit</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                    <v-icon small dark color="grey darken-1" 
                      @click="openDeleteDialog(item), error = null" v-bind="attrs" v-on="on">mdi-delete</v-icon>
                </template>
                <span>Delete</span>
              </v-tooltip>
            </template>
          </v-data-table>
          
          <v-data-table v-if="stockHeader.status == 'Beginning'  || stockHeader.status == 'End'" :headers="headersEnd" :items="detailStock" :search="search" class="elevation-1">
            <template >
            </template>
          </v-data-table>
        </panel>
      </v-col>
    </v-row>

    <v-dialog v-model="addProductDialog" dark width="500">
      <v-card v-if="stockHeader.status == 'In'">
        <v-card-title>Add Product</v-card-title>
        <v-card-text>
          <v-text-field v-model="stock.productId" label="Product ID" />
          <v-text-field v-model="stock.expiredDate" label="Expired Date" />
          <v-text-field v-model="stock.quantity" label="Quantity" />
          <v-text-field v-model="stock.price" label="Price" />
        </v-card-text>
        <div class="error" v-html="error" />
        <br />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue lighten-2 mb-4 mr-2" @click="add">Add</v-btn>
          <v-btn color="red darken-2 mb-4" @click="addProductDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
      
      <v-card v-if="stockHeader.status == 'Out'">
        <v-card-title>Add Product</v-card-title>
        <v-card-text>
          <v-text-field v-model="stock.productId" label="Product ID" />
          <v-text-field v-model="stock.quantity" label="Quantity" />
        </v-card-text>
        <div class="error" v-html="error" />
        <br />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue lighten-2 mb-4 mr-2" @click="add">Add</v-btn>
          <v-btn color="red darken-2 mb-4" @click="addProductDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
      
      <v-card v-if="stockHeader.status == 'End'">
        <v-card-title>Add Product</v-card-title>
        <v-card-text>
          <v-text-field v-model="stock.productId" label="Product ID" />
        </v-card-text>
        <div class="error" v-html="error" />
        <br />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue lighten-2 mb-4 mr-2" @click="add">Add</v-btn>
          <v-btn color="red darken-2 mb-4" @click="addProductDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editDialog" dark width="500">
      <v-card>
        <v-card-title>Edit Product</v-card-title>
        <v-card-text>
          <v-text-field v-model="stock.productId" disabled label="Product ID" />
          <v-text-field v-model="stock.quantity" label="Quantity" />
        </v-card-text>
        <div class="error" v-html="error" />
        <br />
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
import Panel from '@/components/Panel'
import StockService from '@/services/StockService'

export default {
  components: {
    Panel
  },
  data () {
    return {
      error: null,
      search: null,
      addProductDialog: null,
      addProductSnackbar: false,
      editDialog: null,
      editSnackbar: null,
      deleteDialog: null,
      deleteSnackbar: null,
      timeout: 2000,
      detailStockIndex: null,
      detailStock: [],
      headersIn: [
        { text: 'ID', value: 'Product.productId', align: 'center' },
        { text: 'Name', value: 'Product.productName', align: 'center' },
        { text: 'Expired Date', value: 'expiredDate', align: 'center'  },
        { text: 'Quantity', value: 'quantity', align: 'center' },
        { text: 'Price', value: 'price', align: 'center' },
        { text: '', value: 'actions', sortable: false }
      ],
      headersOut: [
        { text: 'ID', value: 'Product.productId', align: 'center' },
        { text: 'Name', value: 'Product.productName', align: 'center' },
        { text: 'Quantity', value: 'quantity', align: 'center' },
        { text: '', value: 'actions', sortable: false }
      ],
      headersEnd: [
        { text: 'ID', value: 'Product.productId', align: 'center' },
        { text: 'Name', value: 'Product.productName', align: 'center' },
      ],
      stockHeader: {
        stockId: null,
        description: null,
        status: null,
      },
      stockTotal: {
        itemType: null,
        totalQty: null,
        amount: null
      },
      stock: {
        stockDetailId: null,
        productId: null,
        productName: null,
        expiredDate: null,
        quantity: null,
        price: null
      }
    }
  },
  async mounted () {
    this.stockHeader = (await StockService.showStockHeader({stockId: this.$route.params.stockId})).data
    this.stockTotal = (await StockService.showStockTotal({stockId: this.$route.params.stockId})).data
    this.detailStock = (await StockService.showStockDetail({stockId: this.$route.params.stockId})).data
  },
  methods: {
    async add () {
      try {
        await StockService.createStockDetail({
          stockId: this.$route.params.stockId,
          status: this.stockHeader.status,
          productId: this.stock.productId,
          expiredDate: this.stock.expiredDate,
          quantity: this.stock.quantity,
          price: this.stock.price
        })
        this.addProductDialog = false
        this.addProductSnackbar = true
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async openEditDialog (item) {
      console.log(this.stockTotal)
      this.detailStockIndex = this.detailStock.indexOf(item)
      this.stock = Object.assign({}, item)
      this.editDialog = true
    },
    async save () {
      try {
        await StockService.editQuantity({
          stockDetailId: this.stock.stockDetailId,
          productId: this.stock.productId,
          quantity: this.stock.quantity,
          status: this.stockHeader.status
        })
        this.detailStock[this.detailStockIndex].quantity = this.stock.quantity
        this.editDialog = false
        this.editSnackbar = true
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async openDeleteDialog (item) {
      this.detailStockIndex = this.detailStock.indexOf(item)
      this.stock = Object.assign({}, item)
      this.deleteDialog = true
    },
    async deletes () {
      await StockService.deleteStockDetail({stockDetailId: this.stock.stockDetailId})
      this.detailStock.splice(this.detailStockIndex, 1)
      this.deleteDialog = false
      this.deleteSnackbar = true
    }
  }
}
</script>

<style scoped>
.error {
  color: black;
}

.description {
  width: 250px;
}

.textField {
  width: 150px;
}

.v-select {
  width: 250px;
}

.title {
  color: white;
  margin-left: 12px;
}
</style>
