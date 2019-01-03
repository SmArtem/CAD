export default function (matrixQ, listOfNets) {
  const miserables = {nodes: [], links: []}
  let listOfElements = []
  for (let e in listOfNets) {
    for (let eName in listOfNets[e].elements) {
      if (!listOfElements.includes(listOfNets[e].elements[eName].elementName)) {
        listOfElements.push(listOfNets[e].elements[eName].elementName)
      }
    }
  }
  listOfElements.sort()
  for (let net of listOfNets) {
    miserables.nodes.push({id: net.name, group: 1})
  }
  for (let name of listOfElements) {
    miserables.nodes.push({id: name, group: 2})
  }
  for (let net in listOfNets) {
    for (let el in listOfElements) {
      if (matrixQ[net][el] === 1) {
        miserables.links.push({source: listOfNets[net].name, target: listOfElements[el], value: 1})
      }
    }
  }
  return miserables
}
