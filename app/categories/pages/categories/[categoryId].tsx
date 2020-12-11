import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getCategory from "app/categories/queries/getCategory"
import deleteCategory from "app/categories/mutations/deleteCategory"
import { MemosList } from "app/memos/components/MemosList"
import { PencilOutlineIcon } from "app/components/icons/PencilOutlineIcon"
import { TrashOutlineIcon } from "app/components/icons/TrashOutlineIcon"

export const Category = () => {
  const router = useRouter()
  const categoryId = useParam("categoryId", "number")
  const [category] = useQuery(getCategory, { where: { id: categoryId } })
  const [deleteCategoryMutation] = useMutation(deleteCategory)

  const handleEdit = () => router.push(`/categories/${categoryId}/edit`)
  const handleDelete = async () => {
    if (window.confirm("カテゴリーに入っているメモもすべて削除されますがよろしいですか")) {
      await deleteCategoryMutation({ where: { id: category.id } })
      router.push("/categories")
    }
  }

  return (
    <div className="relative">
      <div className="flex flex-row m-12 mb-0">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mr-4 text-gray-900">
          {category.name}
        </h1>
        <a
          role="button"
          className="flex items-center"
          onClick={handleEdit}
          onKeyDown={handleEdit}
          tabIndex={0}
        >
          <PencilOutlineIcon className="mr-2" />
        </a>
        <a
          role="button"
          className="flex items-center"
          onClick={handleDelete}
          onKeyDown={handleDelete}
          tabIndex={0}
        >
          <TrashOutlineIcon />
        </a>
        <button
          className="flex-shrink-0 text-white border-0 py-2 px-8 ml-auto focus:outline-none rounded bg-purple-500 hover:bg-purple-900"
          onClick={() => {
            router.push({ pathname: "/memos/new", query: { categoryId } })
          }}
        >
          <p>New Memo</p>
        </button>
      </div>
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
