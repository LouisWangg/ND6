<template>
  <v-container grid-list-md>
    <v-row no-gutters>
      <v-col align="center">
        <panel title="Transaction">
          <v-row class="mt-2">
            <div>
              <v-text-field v-model="stockId" label="Transaction Number" class="mt-2 ml-4"></v-text-field>
            </div>
          </v-row>

          <v-row>
            <div>
              <v-text-field v-model="description" label="Description" class="mt-2 ml-4 mr-4"></v-text-field>
            </div>
            <div>
              <v-select :items="items" v-model="status" label="Status" outlined dense class="mt-3 ml-12"></v-select>
            </div>
          </v-row>

          <v-row class="mt-16 mb-2" no-gutters>
            <v-spacer class="mr-16 pr-16" />
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="mx-2 mb-4" dark color="grey darken-1" 
                  @click="save" v-bind="attrs" v-on="on">
                  <v-icon dark>mdi-content-save-check</v-icon>
                </v-btn>
              </template>
              <span>Save</span>
            </v-tooltip>

            <v-spacer />

            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="mx-2 mb-2" dark color="grey darken-1" 
                  @click="addProductDialog = true, error = null, detailProduct.expiredDate = null, detailProduct.quantity = null, detailProduct.price = null" v-bind="attrs" v-on="on">
                  <v-icon dark>mdi-plus</v-icon>
                </v-btn>
              </template>
              <span>Add Product</span>
            </v-tooltip>
            <v-spacer class="mr-16 pr-16" />
          </v-row>
        </panel>
      </v-col>
    </v-row>

    <v-dialog v-model="addProductDialog" dark width="500">
      <div v-if="status == null" dark>
        <h3 class="my-2 error">Please insert the status of this document first!</h3>
      </div>

      <v-card v-if="status == 'In'">
        <v-card-title class="headline">Add Product</v-card-title>
        <v-card-text>
          <v-text-field v-model="detailProduct.productId" label="Product ID" />
          <v-text-field v-model="detailProduct.expiredDate" label="Expired Date" />
          <v-text-field v-model="detailProduct.quantity" label="Quantity" />
          <v-text-field v-model="detailProduct.price" label="Price" />
        </v-card-text>
        <div class="error" v-html="error" />
        <br />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue lighten-2 mb-4 mr-2" @click="add">Add</v-btn>
          <v-btn color="red darken-2 mb-4" @click="addProductDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
      
      <v-card v-if="status == 'Out'">
        <v-card-title class="headline">Add Product</v-card-title>
        <v-card-text>
          <v-text-field v-model="detailProduct.productId" label="Product ID" />
          <v-text-field v-model="detailProduct.quantity" label="Quantity" />
        </v-card-text>
        <div class="error" v-html="error" />
        <br />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue lighten-2 mb-4 mr-2" @click="add">Add</v-btn>
          <v-btn color="red darken-2 mb-4" @click="addProductDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
      
      <v-card v-if="status == 'End'">
        <v-card-title class="headline">Add Product</v-card-title>
        <v-card-text>
          <v-text-field v-model="detailProduct.productId" label="Product ID" />
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

    <v-snackbar v-model="addProductSnackbar" :timeout="timeout">
      Add product successful!
      <template v-slot:action="{ attrs }">
        <v-btn color="red darken-2" text v-bind="attrs" @click="addProductSnackbar = false">Close</v-btn>
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
      id: null,
      stockId : null,
      description: null,
      status: null,
      items: ['In', 'Out', 'End'],
      addProductDialog: null,
      addProductSnackbar: false,
      timeout: 2000,
      detailProductIndex: null,
      stockDetailList: [],
      headersIn: [
        { text: 'ID', value: 'productId', sortable: false },
        { text: 'Name', value: 'productName' },
        { text: 'Expired Date', value: 'expiredDate', sortable: false  },
        { text: 'Quantity', value: 'quantity', filterable: false },
        { text: 'Price', value: 'price' },
        { text: '', value: 'actions', sortable: false }
      ],
      headersOut: [
        { text: 'ID', value: 'productId', sortable: false },
        { text: 'Name', value: 'productName' },
        { text: 'Quantity', value: '', filterable: false },
        { text: '', value: 'actions', sortable: false }
      ],
      headersEnd: [
        { text: 'ID', value: 'productId', sortable: false },
        { text: 'Name', value: 'productName' },
        { text: '', value: 'actions', sortable: false }
      ],
      detailProduct: {
        productId: null,
        expiredDate: null,
        quantity: null,
        price: null,
      },
    }
  },
  methods: {
    async add () {
      try {
        if (this.id == null) {
          const stock = await StockService.createStock({
            stockId: this.stockId,
            description: this.description,
            status: this.status,
            productId: this.detailProduct.productId,
            expiredDate: this.detailProduct.expiredDate,
            quantity: this.detailProduct.quantity,
            price: this.detailProduct.price
          })
          this.id = stock.data.stockId
        } else {
          await StockService.createStockDetail({
            stockId: this.id,
            status: this.status,
            productId: this.detailProduct.productId,
            expiredDate: this.detailProduct.expiredDate,
            quantity: this.detailProduct.quantity,
            price: this.detailProduct.price
          })
        }
        this.addProductDialog = false
        this.addProductSnackbar = true
      } catch (error) {
        this.error = error.response.data.error
      }
    },
    async save () {
      this.$router.push('monitoringStock')
    },
  }
}
</script>

<style scoped>
.error {
  color: black;
}

.v-text-field {
  width: 400px;
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
