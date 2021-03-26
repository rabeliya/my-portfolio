import Router from "next/router"

interface Props {
  path: string;
  text: string;
}

export default function LeadBtn({ path, text } :Props) {
  function clickHandler() {
    Router.push(`${path}`)
    return
  }
  return (
    <button className='leadButton shadow pointer' onClick={clickHandler}>
      <p>
        {text}
      </p>
    </button>
  )
}