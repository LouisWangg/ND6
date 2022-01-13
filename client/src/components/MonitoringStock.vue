<template>
  <v-container>
    <v-row no-gutters>
      <v-col align="center">
        <panel title="Document Stock List">
          <v-row no-gutters>
            <v-spacer class="mr-16 pr-16" /> <v-spacer class="mr-16 pr-16" />
            <v-spacer class="mr-16 pr-16" /> <v-spacer class="mr-16 pr-16" />
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search by ID, Date, Description or Status" class="mb-3 search mx-4" hide-details />
          </v-row>
          <v-data-table :headers="headers" :items="stockList" :search="search" class="elevation-1" @click:row="navigateToDetail" />
        </panel>
      </v-col>
    </v-row>
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
      search: null,
      stockList: [],
      headers: [
        { text: 'Document ID', value: 'stockId', align: 'center' },
        { text: 'Date', value: 'createdAt', align: 'center' },
        { text: 'Description', value: 'description', sortable: false, align: 'center'  },
        { text: 'Quantity', value: 'StockDetails[0].qty', filterable: false, align: 'center' },
        { text: 'Status', value: 'status', align: 'center' },
      ],
    }
  },
  async mounted () {
    this.stockList = (await StockService.showStockList()).data
  },
  methods: {
    navigateToDetail: function (item, row) {    
      console.log(this.stockList)
      this.$router.push({path: '/detailStock/' + item.stockId})
    }
  }
}
</script>

<style scoped>
.search {
  width: 400px;
  margin-left: 720px;
}

.v-data-table {
  margin-bottom: 10px;
}
</style>
