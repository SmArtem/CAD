export default function (state) {
  let listOfElements = []
  for (let e in state.listOfNets) {
    for (let eName in state.listOfNets[e].elements) {
      if (!listOfElements.includes(state.listOfNets[e].elements[eName].elementName)) {
        listOfElements.push(state.listOfNets[e].elements[eName].elementName)
      }
    }
  }
  listOfElements.sort()
  let elementsMatrix = createMatrix(state.listOfNets.length, listOfElements.length)
  for (let elemFirst in state.listOfNets) {
    for (let elemSecond in listOfElements) {
      for (let elementIndex of state.listOfNets[elemFirst].elements) {
        if (listOfElements[elemSecond] === elementIndex.elementName) {
          elementsMatrix[elemFirst][elemSecond] = 1
          break
        } else {
          elementsMatrix[elemFirst][elemSecond] = 0
        }
      }
    }
  }
  return elementsMatrix
}

const createMatrix = (m, n) => {
  return Array.from({
    length: m
  }, () => new Array(n).fill(0))
}

//   elementsMatrix.unshift(listOfElements)
//   for (let i = 0; i < elementsMatrix.length; i++) {
//     if (i === 0) {
//       elementsMatrix[i].unshift(' ')
//     } else {
//       elementsMatrix.unshift(listOfElements[i - 1])
//     }
//   }
