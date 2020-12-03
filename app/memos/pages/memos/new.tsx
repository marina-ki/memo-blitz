import Layout from "app/layouts/Layout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createMemo from "app/memos/mutations/createMemo"
import MemoForm from "app/memos/components/MemoForm"

const NewMemoPage: BlitzPage = () => {
  const router = useRouter()
  const [createMemoMutation] = useMutation(createMemo)

  return (
    <div>
      <h1>Create New Memo</h1>

      <MemoForm
        initialValues={{}}
        onSubmit={async () => {
          try {
            const memo = await createMemoMutation({ data: { name: "MyName" } })
            alert("Success!" + JSON.stringify(memo))
            router.push(`/memos/${memo.id}`)
          } catch (error) {
            alert("Error creating memo " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/memos">
          <a>Memos</a>
        </Link>
      </p>
    </div>
  )
}

NewMemoPage.getLayout = (page) => <Layout title={"Create New Memo"}>{page}</Layout>

export default NewMemoPage
