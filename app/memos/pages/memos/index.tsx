import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getMemos from "app/memos/queries/getMemos"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { MemosList } from "app/memos/components/MemosList"

const ITEMS_PER_PAGE = 100

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
