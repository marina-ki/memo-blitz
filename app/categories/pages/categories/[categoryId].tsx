import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getCategory from "app/categories/queries/getCategory"
import deleteCategory from "app/categories/mutations/deleteCategory"
import { MemosList } from "app/memos/components/MemosList"

export const Category = () => {
  const router = useRouter()
  const categoryId = useParam("categoryId", "number")
  const [category] = useQuery(getCategory, { where: { id: categoryId } })
  const [deleteCategoryMutation] = useMutation(deleteCategory)

  return (
    <div>
      <h1>{category.name}</h1>

      <Link href={`/categories/${category.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteCategoryMutation({ where: { id: category.id } })
            router.push("/categories")
          }
        }}
      >
        Delete
      </button>

      <MemosList categoryId={categoryId} />
    </div>
  )
}

const ShowCategoryPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Category />
      </Suspense>
    </div>
  )
}

ShowCategoryPage.getLayout = (page) => <Layout title={"Category"}>{page}</Layout>

export default ShowCategoryPage
