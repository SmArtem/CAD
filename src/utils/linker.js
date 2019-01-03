export default function (matrixR, listOfNets, k) {
  // let matrixR = Matrix(state)
  // matrixR = [[0, 1, 0, 0, 2, 3, 0, 0],
  //   [1, 0, 1, 0, 0, 1, 0, 0],
  //   [0, 1, 0, 2, 0, 0, 1, 0],
  //   [0, 0, 2, 0, 0, 0, 3, 1],
  //   [2, 0, 0, 0, 0, 1, 0, 0],
  //   [3, 1, 0, 0, 1, 0, 0, 1],
  //   [0, 0, 1, 3, 0, 0, 0, 2],
  //   [0, 0, 0, 1, 0, 1, 2, 0]]
  let miserables = {nodes: [], links: []} // Инициализация колекции
  let listOfElements = [] // Виды элементов
  for (let e in listOfNets) {
    for (let eName in listOfNets[e].elements) {
      if (!listOfElements.includes(listOfNets[e].elements[eName].elementName)) {
        listOfElements.push(listOfNets[e].elements[eName].elementName)
      }
    }
  }
  listOfElements.sort()

  // listOfElements = [1, 2, 3, 4, 5, 6, 7, 8]

  let localRank = []
  for (let net of matrixR) {
    let n = 0
    let m = 0
    for (let el of net) {
      n += el
      if (el !== 0) m++
    }
    localRank.push({Pk: n, V: m})
  }
  let xG = []

  let s = 0
  console.log(localRank)
  for (let i = 1; i < matrixR.length; i++) {
    if (i === 1) {
      let minRank = minRankF(localRank)
      // console.log(minRank)
      xG = [localRank.indexOf(minRank)]
      miserables.nodes.push({id: listOfElements[xG[0]], group: 1})
    }
    s++
    for (let j = i; j < s * k && j < matrixR.length; j++) {
      let currentX = xG[i - 1]
      xG.push(getNextX(matrixR[currentX], localRank[currentX], xG))
      // console.log(i)
      // console.log(xG)
      miserables.nodes.push({id: listOfElements[xG[i]], group: s})
      console.log(minRankOF(localRank, xG))
      if (j !== s * k - 1)i++
    }
  }

  // for (let i = 1; i < matrixR.length; i++) {
  //   console.log(k)
  //   s++
  //   let minRank = minRankOF(localRank, xG)
  //   xG.push(localRank.indexOf(minRank))
  //   miserables.nodes.push({id: listOfElements[xG[i-1]], group: s})
  //   for (let j = i; j < s * k && j < matrixR.length; j++) {
  //     console.log('Как?')
  //     let currentX = xG[i - 1]
  //     // console.log(i)
  //     // console.log(xG)
  //     xG.push(getNextX(matrixR[currentX], localRank[currentX], xG))
  //     miserables.nodes.push({id: listOfElements[xG[i]], group: s})
  //     i++
  //   }
  // }

  for (let i in listOfElements) {
    for (let j = i; j < listOfElements.length; j++) {
      if (matrixR[i][j] !== 0) {
        miserables.links.push({source: listOfElements[i], target: listOfElements[j], value: matrixR[i][j]})
      }
    }
  }
  console.log(miserables)
  return miserables
}

const getNextX = (defLine, minRank, arrWithX) => {
  let result = Number.MIN_SAFE_INTEGER
  defLine.reduce(function (reviousValue, currentItem, index, arr) {
    let n = 2 * currentItem
    for (let i of defLine) {
      if (i !== 0 && arrWithX.indexOf(i) !== -1) { n += 2 * i }
    }
    n = n - minRank.Pk
    if ((result < n) && (arrWithX.indexOf(index) === -1)) { result = index }
    return currentItem
  }, Number.MIN_SAFE_INTEGER)
  return result
}
const minRankF = (localRank) => {
  let minR = localRank[0].Pk
  let minV = localRank[0].V
  let minRank = localRank[0]
  for (let el of localRank) {
    if (el.Pk < minR) {
      minRank = el
      minV = el.V
      minR = el.Pk
    }
    if (el.Pk === minR) {
      if (el.V < minV) {
        minRank = el
        minV = el.V
        minR = el.Pk
      }
    }
  }
  return minRank
}
const minRankOF = (localRank, arrWithX) => {
  let minR
  let minV
  let minRank
  for(let i in localRank) {
    if (arrWithX.indexOf(i) === -1) { 
      minR = localRank[i].Pk
      minV = localRank[i].V
      minRank = localRank[i]
    }
  }
  for (let el of localRank) {
    if (arrWithX.indexOf(localRank.indexOf(el)) !== -1) { 
      console.log('continue')
      continue 
    }
    if (el.Pk < minR) {
      minRank = el
      minV = el.V
      minR = el.Pk
    }
    if (el.Pk === minR) {
      if (el.V < minV) {
        minRank = el
        minV = el.V
        minR = el.Pk
      }
    }
  }
  return minRank
}