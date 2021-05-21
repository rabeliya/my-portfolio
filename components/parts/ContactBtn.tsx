import Router from 'next/router'

export default function ContactBtn() {
  function clickHandler() {
    Router.push('/contact')
    return
  }
  return (
    <button className='contactButton pointer shadow' onClick={clickHandler}>
      お問い合わせ
    </button>
  )
}