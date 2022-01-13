import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/Homepage'
import MasterProduct from '@/components/MasterProduct'
import MonitoringStock from '@/components/MonitoringStock'
import AddStock from '@/components/AddStock'
import DetailStock from '@/components/DetailStock'
import Log from '@/components/Log'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: Homepage
    },
    {
      path: '/masterProduct',
      name: 'masterProduct',
      component: MasterProduct
    },
    {
      path: '/monitoringStock',
      name: 'monitoringStock',
      component: MonitoringStock
    },
    {
      path: '/addStock',
      name: 'addStock',
      component: AddStock
    },
    {
      path: '/detailStock/:stockId',
      name: 'detailStock',
      component: DetailStock
    },
    {
      path: '/log',
      name: 'log',
      component: Log
    },
  ]
})
