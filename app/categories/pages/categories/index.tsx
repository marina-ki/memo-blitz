import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getCategories from "app/categories/queries/getCategories"
import { useCurrentUser } from "app/hooks/useCurrentUser"

const ITEMS_PER_PAGE = 100

export const CategoriesList = () => {
  const router = useRouter()
  const currentUser = useCurrentUser()
  const page = Number(router.query.page) || 0
  const [{ categories, hasMore }] = usePaginatedQuery(getCategories, {
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
        {categories.map((category) => (
          <li key={category.id}>
            <Link href={`/categories/${category.id}`}>
              <a>{category.name}</a>
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

const CategoriesPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/categories/new">
          <a>Create Category</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <CategoriesList />
      </Suspense>
    </div>
  )
}

CategoriesPage.getLayout = (page) => <Layout title={"Categories"}>{page}</Layout>

export default CategoriesPage
