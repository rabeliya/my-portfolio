import Router from "next/router"

export default function LeadBtn() {
  return (
    <button className='backButton shadow pointer' onClick={() => Router.back()}>
      <p>
        前のページに戻る
      </p>
    </button>
  )
}