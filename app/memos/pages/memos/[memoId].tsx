import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getMemo from "app/memos/queries/getMemo"
import deleteMemo from "app/memos/mutations/deleteMemo"

export const Memo = () => {
  const router = useRouter()
  const memoId = useParam("memoId", "number")
  const [memo] = useQuery(getMemo, { where: { id: memoId } })
  const [deleteMemoMutation] = useMutation(deleteMemo)

  return (
    <div>
      <h1>Memo {memo.id}</h1>
      <pre>{JSON.stringify(memo, null, 2)}</pre>

      <Link href={`/memos/${memo.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteMemoMutation({ where: { id: memo.id } })
            router.push("/memos")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowMemoPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/memos">
          <a>Memos</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Memo />
      </Suspense>
    </div>
  )
}

ShowMemoPage.getLayout = (page) => <Layout title={"Memo"}>{page}</Layout>

export default ShowMemoPage
