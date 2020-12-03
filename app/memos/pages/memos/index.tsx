import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getMemos from "app/memos/queries/getMemos"
import { useCurrentUser } from "app/hooks/useCurrentUser"

const ITEMS_PER_PAGE = 100

export const MemosList = () => {
  const router = useRouter()
  const currentUser = useCurrentUser()
  const page = Number(router.query.page) || 0
  const [{ memos, hasMore }] = usePaginatedQuery(getMemos, {
    orderBy: { id: "asc" },
    where: { userId: currentUser?.id },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {memos.map((memo) => (
          <li key={memo.id}>
            <Link href={`/memos/${memo.id}`}>
              <a>{memo.title}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const MemosPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/memos/new">
          <a>Create Memo</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <MemosList />
      </Suspense>
    </div>
  )
}

MemosPage.getLayout = (page) => <Layout title={"Memos"}>{page}</Layout>

export default MemosPage
