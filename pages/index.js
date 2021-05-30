import Head from 'next/head'
import { useState, useEffect } from 'react'
import Bars from '../components/Bars'

function generateArray(num) {
  if (validate_n_set(num)){
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

function isSorted(items){
  let sortedItems = [...items].sort((a, b) => { return a - b })
  return (JSON.stringify(items) == JSON.stringify(sortedItems))
}

export default function Home() {

  let [num, setNum] = useState(20)
  let [items, setItems] = useState([...Array(20)].map(() => Math.floor(Math.random() * 200 + 5)))
  let [compareItems, setCompareItems] = useState([-1, -1])
  let [sortedIndex, setSortedIndex] = useState([-1])
  let [unequalItems, setUnequalItems] = useState([-1, -1])
  let [summary, setSummary] = useState('')
  var [steps, setSteps] = useState(0)

  let resetArray = () => {
    setItems(generateArray(num))
    setCompareItems([-1, -1])
    setSortedIndex(-1)
    setSummary('')
    setUnequalItems([-1, -1])
    var id = window.setTimeout(function () { }, 0);
    while (id--) {
      window.clearTimeout(id);
    }
    document.getElementById("startSort").disabled = false;
  }
  
  let finishSorting = () => {
    let sorted_items = getsortArray(items)
    setItems(sorted_items)
    setCompareItems([0, 0])
    setSortedIndex(sorted_items.length)
    setUnequalItems([-1, -1])
    setSummary('Finished Sorting, All the numbers are in Ascending Order')
    
    var id = window.setTimeout(function () { }, 0);
    while (id--) {
      window.clearTimeout(id);
    }

  }

  let startSorting = () => {
    document.getElementById("startSort").disabled = true;
    let [i, j] = [...compareItems]
    let incorrectOrder = [-1, -1]
    let newItems = [...items]
    let newIndex = sortedIndex
    let summaryText = ''
    let newStep = steps

    if (newIndex < items.length-1) {
      if (i < 0) {
        i = 0
        j = 1
        summaryText = `Comparing number ${newItems[i]} with ${newItems[j]}`
        if (newItems[i] > newItems[j]) {
          summaryText += `, Incorrect Order: ${newItems[i]} > ${newItems[j]}`
          incorrectOrder = [i, j]
        }
      } else if (i >= 0 && i < items.length - 2) {
        if (j < items.length - 1) {
          
          if (newItems[i] > newItems[j]) {
            let temp = newItems[j]
            newItems[j] = newItems[i]
            newItems[i] = temp
            summaryText = `Interchanged larger number ${newItems[i]} with smaller number ${newItems[j]}`
          } else {
            j += 1
            summaryText = `Comparing number ${newItems[i]} with ${newItems[j]}`
            if (newItems[i] > newItems[j]) {
              summaryText += `, Incorrect Order: ${newItems[i]} > ${newItems[j]}`
              incorrectOrder = [i, j]
            }
          }
        } else if (j == items.length - 1) {
          if (newItems[i] > newItems[j]) {
            let temp = newItems[j]
            newItems[j] = newItems[i]
            newItems[i] = temp
            summaryText = `Interchanged larger number ${newItems[i]} with smaller number ${newItems[j]}`
          } else {
            j = i + 2
            newIndex = i
            i += 1
            summaryText = `Comparing number ${newItems[i]} with ${newItems[j]}`
            if (newItems[i] > newItems[j]) {
              summaryText += `, Incorrect Order: ${newItems[i]} > ${newItems[j]}`
              incorrectOrder = [i, j]
            }
          }
        }
      } else if (i == items.length-2) {
        if (newItems[i] > newItems[j]) {
          let temp = newItems[j]
          newItems[j] = newItems[i]
          newItems[i] = temp
          summaryText = `Interchanged larger number ${newItems[i]} with smaller number ${newItems[j]}`
        } else {
          j = items.length
          newIndex = items.length
          i = items.length
          summaryText +=  'Finished Sorting, All the numbers are in Ascending Order'
        }
      }
      newStep ++
    } else {
      summaryText = 'Finished Sorting, All the numbers are in Ascending Order'
    }
    
    setItems(newItems)
    setCompareItems([...[i, j]])
    setSortedIndex(newIndex)
    setSummary(summaryText)
    setUnequalItems(incorrectOrder)
    setSteps(newStep)
  }

  useEffect(() => {
    steps > 0 ? setTimeout(() => {
      startSorting()
    }, 500) : undefined
  }, [steps])

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
          <button id="startSort" type="submit" onClick={() => startSorting()} > Start Sorting </button>
          <button type="submit" onClick={() => finishSorting()}> Finish </button>
        </div>
      </div>

      <div className='chart'>
        <Bars items={items} obj={{ 'compareItems': compareItems, 'sortedIndex': sortedIndex,
         'incorrectOrder': unequalItems}} />
      </div>

      <div className="result">
        <p>{summary}</p>
      </div>

    </div>
  )
}
