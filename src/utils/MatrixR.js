export default function (state) {
  let listOfElements = []
  for (let e in state.listOfNets) {
    for (let eName in state.listOfNets[e].elements) {
      if (!listOfElements.includes(state.listOfNets[e].elements[eName].elementName)) {
        listOfElements.push(state.listOfNets[e].elements[eName].elementName)
      }
    }
  }
  // console.log(state.listOfNets)
  listOfElements.sort()
  // console.log(listOfElements)
  const countOfElements = listOfElements.length
  let elementsMatrix = createMatrix(countOfElements, countOfElements)
  for (let elemFirst in listOfElements) {
    for (let elemSecond in listOfElements) {
      if (elemFirst === elemSecond) {
        continue
      }
      for (let net of state.listOfNets) {
        if (netHasBothElements(net, listOfElements[elemFirst], listOfElements[elemSecond])) {
          elementsMatrix[elemFirst][elemSecond]++
        }
      }
    }
  }
  // console.log(elementsMatrix)
  return elementsMatrix
}
const netHasBothElements = (net, elementOne, elementTwo) => {
  const elementsArray = net.elements
  let elementOneFound = false
  let elementTwoFound = false
  for (let element of elementsArray) {
    // console.log(element)
    if (element.elementName === elementOne) {
      elementOneFound = true
    }
    if (element.elementName === elementTwo) {
      elementTwoFound = true
    }
    if (elementOneFound && elementTwoFound) {
      break
    }
  }
  return (elementOneFound && elementTwoFound)
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
