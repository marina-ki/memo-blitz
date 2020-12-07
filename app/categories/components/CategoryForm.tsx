import React from "react"

type CategoryFormProps = {
  initialValues: any
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

const CategoryForm = ({ initialValues, onSubmit }: CategoryFormProps) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(event)
      }}
    >
      <input placeholder="カテゴリー名" defaultValue={initialValues.name} />
      <button>Submit</button>
    </form>
  )
}

export default CategoryForm
