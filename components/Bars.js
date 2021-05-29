import React, { useState, useEffect } from 'react'

function Bar(props) {
  
  const [width, setWidth] = React.useState(0)

  React.useEffect(() => {
    setWidth(window.innerWidth)
  })

  let extra = props.obj.compareItems.includes(props.pos) ? " bar-compare" : ""
  extra += props.obj.sortedIndex >= props.pos ? " bar-sorted" : ""
  let bar_width = { 
    "width": String(75 + props.num * width * 0.0035) + "px"
  }
  return (
    <p>
      <span className={"bar" + extra} style={bar_width}>
        {props.num}
      </span>
    </p>
  )
}

export default function Bars(props) {
  return (
    <div>
      {props.items.map((i,j) => <Bar num={i} pos={j} key={j} obj={props.obj} />)}
    </div>
  )
}
