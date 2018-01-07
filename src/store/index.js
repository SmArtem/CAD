import Vue from 'vue'
import Vuex from 'vuex'
// import { state, mutations } from './mutations'

Vue.use(Vuex)

// export default new Vuex.Store({
//   state: {
//     count: 0
//   },
//   mutations: {
//     increment (state) {
//       state.count++
//     }
//   }
// })

export default new Vuex.Store({
  state: {
    listOfNets: []
  },
  mutations: {
    addTodo (state, newElements) {
      state.listOfNets = newElements
    },
    increment (state) {
      state.listOfNets.push({name: 'dsdsads'})
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
    getListOfChainName: state => {
      let listOfElements = []
      for (let e in state.listOfNets) {
        listOfElements.push(state.listOfNets[e].name)
      }
      return listOfElements
    },
    getMatrixR: (state, getters) => {

    }
  }
})
