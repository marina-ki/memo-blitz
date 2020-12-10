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

  return (
    <div>
      <div className="flex flex-row  w-full m-12 mb-0">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mr-4 text-gray-900">
          {category.name}
        </h1>
        <button>
          <PencilOutlineIcon className="mr-2" />
        </button>
        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteCategoryMutation({ where: { id: category.id } })
              router.push("/categories")
            }
          }}
        >
          <TrashOutlineIcon />
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
