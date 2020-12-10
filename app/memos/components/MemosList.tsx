import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getMemos from "app/memos/queries/getMemos"
import { useCurrentUser } from "app/hooks/useCurrentUser"

const ITEMS_PER_PAGE = 100

type Props = {
  categoryId?: number
}

export const MemosList = ({ categoryId }: Props) => {
  const router = useRouter()
  const currentUser = useCurrentUser()
  const page = Number(router.query.page) || 0
  const [{ memos, hasMore }] = usePaginatedQuery(getMemos, {
    orderBy: { updatedAt: "desc" },
    where: { userId: currentUser?.id, categoryId },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <section className="text-gray-700 body-font w-full">
      <div className="px-5 py-12">
        <div className="flex flex-wrap">
          {memos.map((memo) => (
            <Link href={`/memos/${memo.id}`}>
              <article className="w-full lg:w-1/3" key={memo.id}>
                <div className="py-8 px-4 m-2 border border-gray-200 rounded-lg bg-white ">
                  {categoryId ? null : (
                    <h2 className="tracking-widest text-xs title-font font-medium text-indigo-500 mb-1">
                      {memo.category.name}
                    </h2>
                  )}
                  <h1 className="title-font text-xl font-medium text-gray-900 mb-3">
                    {memo.title}
                  </h1>
                  <p className="leading-relaxed mb-5 truncate">{memo.body}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </section>
  )
}
