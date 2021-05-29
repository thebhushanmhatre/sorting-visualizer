import Head from 'next/head'
import { useState } from 'react'
import Bars from '../components/Bars'

function generateArray(num) {
  if (validate_n_set(num)){
    console.log('Inside Generate Array')
    let arr = []
    for (let i = 0; i < num; i++) {
      arr.push(Math.round(Math.random() * 200 + 5))
    }
    return arr
  }
}

function validate_n_set(num, setNum) {
  if (num > 4 && num < 26) {
    return true
  }
  return false
}

function getsortArray(items){
  let sorted_items = [...items]
  sorted_items.sort((a, b) => { return a - b })
  return sorted_items
}

function isSorted(arr){
  let sorted_items = [...arr].sort((a, b) => { return a - b })
  return (arr === sorted_items ? true : false)
}

export default function Home() {

  var [num, setNum] = useState(20)
  var [items, setItems] = useState([...Array(20)].map(() => Math.floor(Math.random() * 200 + 5)))
  var [compareItems, setCompareItems] = useState([-1, -1])
  var [sortedIndex, setSortedIndex] = useState([-1])

  // FAILURE:
  // Cannot Change State form Loops or Conditions

  let resetArray = () => {
    setItems(generateArray(num))
    setCompareItems([-1, -1])
    setSortedIndex(-1)
  }
  
  let finishSorting = () => {
    let sorted_items = getsortArray(items)
    setItems(sorted_items)
    setCompareItems([0, 0])
    setSortedIndex(sorted_items.length)
  }

  let startSorting = () => {
    while (!isSorted(items)) {
      let [i, j] = [...compareItems]
      let newItems = [...items]
      
      if (sortedIndex != items.length){
        if (i < 0){
          i = 0
          setCompareItems([...[i, j]])
        }
        if (j < 0 || j < i){
          j = i + 1
          setCompareItems([...[i, j]])
        }
        if (i >= 0 && i < items.length-2){
          if (j < items.length-1){
            j+=1
            
            setCompareItems([...[i, j]])
            
            // setTimeout(function () {
              if (newItems[i] > newItems[j]) {
                let temp = newItems[j]
                newItems[j] = newItems[i]
                newItems[i] = temp

                setCompareItems([...[i, j]])
                setItems(newItems)
              }
            // }, 500)
            
          } else if (j === items.length){
            j = i+2
            i+=1

            // setTimeout(function () {
              if (newItems[i] > newItems[j]) {
                let temp = newItems[j]
                newItems[j] = newItems[i]
                newItems[i] = temp

                setItems(newItems)
                setCompareItems([...[i, j]])
                setSortedIndex(i)
              }
            // }, 500)
          }
        }
      }

      console.log(`i=${i}, j=${j} setCompareItems=${[...[i,j]]} compareItems=${compareItems}  sortedIndex=${sortedIndex}`)

      setItems(newItems)
      setCompareItems([...[i, j]])

      console.log(`i=${i}, j=${j} setCompareItems=${[...[i,j]]} compareItems=${compareItems}  sortedIndex=${sortedIndex}`)
      console.log('done')

      // setTimeout(() => { startSorting() }, 3000);

    }
  }

  return (
    <div>

      <Head>
        <title>SortingApp</title>
        <meta name="description" content="JS based Sorting Visualizer" />
      </Head>

      <div className="navbar">
        <h2>Sorting Visualizer</h2>
        <div className="navbar-items">
          <label htmlFor="length">Number of elements </label>

          <div className="tooltip">
            <input type="number" id="length" name="length" min="5" max="25" placeholder="20"
              onChange={(e) => validate_n_set(e.target.value) ? setNum(e.target.value) : undefined} required />
            <span className="tooltiptext">min 5 - max 25</span>
          </div>

          <button type="submit" onClick={() => resetArray()}> Regenerate ({num})</button>
          <button type="submit" onClick={() => startSorting()} disabled>Start Sorting </button>
          <button type="submit" onClick={() => finishSorting()}>Finish </button>
        </div>
      </div>

      <div className='chart'>
        <Bars items={items} obj={{ 'compareItems': compareItems, 'sortedIndex': sortedIndex}} />
      </div>

    </div>
  )
}
