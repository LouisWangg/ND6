<template>
  <v-container>
    <v-row no-gutters>
      <v-col align="center">
        <panel title="Log">
          <v-row class="mt-2">
            <div>
              <v-text-field v-model="productId" label="Product ID" class="mt-2 ml-4"></v-text-field>
            </div>
          </v-row>

          <v-row class="mb-4">
            <div>
              <v-text-field v-model="date.startDate" label="Start Date (YYYY-MM-DD)" class="mt-2 ml-4 mr-4 date"></v-text-field>
            </div>
            <div>
              <v-text-field v-model="date.endDate" label="End Date (YYYY-MM-DD)" class="mt-2 ml-4 mr-4 date"></v-text-field>
            </div>
          </v-row>

          <div class="error" v-html="error" />
          <br />
          
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="mx-2 mb-4" dark color="grey darken-1" 
                @click="showLogResult" v-bind="attrs" v-on="on">
                <v-icon dark>mdi-magnify</v-icon>
              </v-btn>
            </template>
            <span>Search</span>
          </v-tooltip>
        </panel>
      </v-col>
    </v-row>

    <v-dialog v-model="resultDialog">
      <panel title="Document Stock List">
        <v-data-table :headers="headers" :items="stockList" class="elevation-1" />
      </panel>
    </v-dialog>
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
      productId: null,
      date: {
        startDate: null,
        endDate: null
      },
      resultDialog: false,
      stockList: [],
      headers: [
        { text: 'Date', value: 'createdAt', align: 'center' },
        { text: 'Document ID', value: 'stockId', align: 'center' },
        { text: 'Status', value: 'Stock.status', align: 'center' },
        { text: 'Batch Id', value: 'batchId', align: 'center' },
        { text: 'Price', value: 'price', filterable: false, align: 'center' },
        { text: 'Expired Date', value: 'expiredDate', filterable: false, align: 'center' },
        { text: 'Issued', value: 'quantity', filterable: false, align: 'center' },
        { text: 'Balance', value: 'currentQty', filterable: false, align: 'center' },
      ],
    }
  },
  async mounted () {
  },
  methods: {
    async showLogResult() {
      try {
        this.stockList = (await StockService.showLogResult({
          productId: this.productId,
          startDate: this.date.startDate,
          endDate: this.date.endDate,
        })).data
        this.resultDialog = true
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
.date {
  width: 250px;
}
</style>
