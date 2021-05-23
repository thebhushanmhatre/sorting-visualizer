
function Bar(props) {
  return (
    <>
      <p className='bar' >{props.num}</p>
    </>
  )
}

export default function Bars(props) {
  return <div>{props.items.map((i,j) => <Bar num={i} key={j} />)}</div>
}
