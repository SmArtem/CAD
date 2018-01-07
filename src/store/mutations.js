export const state = {
  listOfNets: [{name: 'dfe', kek: []}]
}

export const mutations = {
  addNet (state, ElementNet) {
    state.todos.push(ElementNet)
  }
}
