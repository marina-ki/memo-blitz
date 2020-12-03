import React from "react"

type MemoFormProps = {
  initialValues: any
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

const MemoForm = ({ initialValues, onSubmit }: MemoFormProps) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(event)
      }}
    >
      <input placeholder="タイトル" defaultValue={initialValues.title} />
      <br />
      <textarea placeholder="本文" defaultValue={initialValues.body} />
      <br />
      <button>Submit</button>
    </form>
  )
}

export default MemoForm
