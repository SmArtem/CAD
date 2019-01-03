import Vue from 'vue'
import Vuex from 'vuex'

import linker from '@/utils/linker'
import matrixR from '@/utils/matrixR'
import matrixQ from '@/utils/matrixQ'
import mack from '@/utils/mack'

import {scaleOrdinal, schemeCategory10} from 'd3'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listOfNets: [],
    boardCount: 4,
    colorScheme: scaleOrdinal(schemeCategory10)
  },
  mutations: {
    setList (state, {name, list}) {
      state[name] = list || []
    },
    setProp (state, {name, value}) {
      state[name] = value
    }
  },
  getters: {
    getListOfElements: state => {
      let listOfElements = []
      for (let e in state.listOfNets) {
        for (let eName in state.listOfNets[e].elements) {
          if (!listOfElements.includes(state.listOfNets[e].elements[eName].elementName)) {
            listOfElements.push(state.listOfNets[e].elements[eName].elementName)
          }
        }
      }
      return listOfElements.sort()
    },
    getListOfChainName: state => state.listOfNets.map(el => el.name),
    matrixR: state => matrixR(state),
    matrixQ: state => matrixQ(state),
    linker (state, getters) {
      return state.boardCount > 1 ? linker(getters.matrixR, state.listOfNets, state.boardCount) : {links: [], nodes: []}
    },
    mack (state, getters) {
      return state.boardCount > 1 ? mack(getters.matrixQ, state.listOfNets) : {links: [], nodes: []}
    }
  }
})
