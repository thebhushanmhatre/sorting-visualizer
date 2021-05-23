import Head from 'next/head'
import { useState, useEffect } from 'react'
import Bars from '../components/Bars'

function generateArray(num) {
  console.log('Inside Generate Array')
  let arr = []
  for (let i = 0; i < num; i++) {
    arr.push(Math.round(Math.random() * 200 + 5))
  }
  return arr
}


export default function Home() {

  var [num, setNum] = useState(10)
  var [items, setItems] = useState([159, 190, 20, 198, 14, 25, 70, 134, 164, 190])

  let sortArray = (e) => {
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
          <input type="number" id="length" name="length" min="5" max="200" placeholder="20" onChange={(e) => setNum(e.target.value)} required />
          <button type="submit" onClick={() =>setItems(generateArray(num))}> Generate Array</button>
          <button onClick={(e) => sortArray(e)}>Start Sorting</button>
        </div>
      </div>

      <div className='chart'>
        <Bars items={items}/>
      </div>

    </div>
  )
}
