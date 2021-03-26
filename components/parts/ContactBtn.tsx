import Router from 'next/router'

export default function ContactBtn() {
  function clickHandler() {
    Router.push('/contact')
    return
  }
  return (
    <button className='contactButton pointer' onClick={clickHandler}>
      <div className="contactButtonInner">
        お問い合わせ
      </div>
    </button>
  )
}