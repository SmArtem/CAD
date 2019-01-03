import Vue from 'vue'
import Router from 'vue-router'

import CAD from '@/components/CAD'
import Linker from '@/components/Linker'
import MatrixR from '@/components/MatrixR'
import MatrixQ from '@/components/MatrixQ'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/matrix-r',
      name: 'matrixR',
      component: MatrixR
    },
    {
      path: '/matrix-q',
      name: 'matrixQ',
      component: MatrixQ
    },
    {
      path: '/cad',
      name: 'CAD',
      component: CAD
    },
    {
      path: '/linker',
      name: 'Linker',
      component: Linker
    },
    {
      path: '*',
      redirect: '/cad'
    }
  ]
})
