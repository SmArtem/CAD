import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import CAD from '@/components/CAD'
import Linker from '@/components/Linker'
import MatrixR from '@/components/MatrixR'
import MatrixQ from '@/components/MatrixQ'
Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Hello',
    //   component: Hello
    // },
    {
      path: '/MatrixR',
      name: 'matrixR',
      component: MatrixR
    },
    {
      path: '/MatrixQ',
      name: 'matrixQ',
      component: MatrixQ
    },
    {
      path: '/',
      name: 'CAD',
      component: CAD
    },
    {
      path: '/Linker',
      name: 'Linker',
      component: Linker
    }
  ]
})
