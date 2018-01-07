import Matrix from '@/utils/MatrixQ'

export default function (state) {
  let matrix = Matrix(state)
  let miserables = {nodes: [], links: []}
  let listOfElements = []
  for (let e in state.listOfNets) {
    for (let eName in state.listOfNets[e].elements) {
      if (!listOfElements.includes(state.listOfNets[e].elements[eName].elementName)) {
        listOfElements.push(state.listOfNets[e].elements[eName].elementName)
      }
    }
  }
  listOfElements.sort()
  for (let net of state.listOfNets) {
    miserables.nodes.push({id: net.name, group: 1})
  }
  for (let name of listOfElements) {
    miserables.nodes.push({id: name, group: 2})
  }
  for (let net in state.listOfNets) {
    for (let el in listOfElements) {
      if (matrix[net][el] === 1) {
        miserables.links.push({source: state.listOfNets[net].name, target: listOfElements[el], value: 1})
      }
    }
  }
  console.log(miserables)
  return miserables
}
