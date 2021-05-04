import Router from "next/router"

export default function LeadBtn() {
  
  function clickHandler() {
    Router.push('/')
  }
  return (
    <button className='backButton shadow pointer' onClick={clickHandler}>
      <p>
        ホームに戻る
      </p>
    </button>
  )
}