import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getCategory from "app/categories/queries/getCategory"
import updateCategory from "app/categories/mutations/updateCategory"
import CategoryForm from "app/categories/components/CategoryForm"
import { useCurrentUser } from "app/hooks/useCurrentUser"

export const EditCategory = () => {
  const router = useRouter()
  const currentUser = useCurrentUser()
  const categoryId = useParam("categoryId", "number")
  const [category, { setQueryData }] = useQuery(getCategory, { where: { id: categoryId } })
  const [updateCategoryMutation] = useMutation(updateCategory)

  return (
    <div>
      <h1>Edit Category {category.id}</h1>
      <pre>{JSON.stringify(category)}</pre>

      <CategoryForm
        initialValues={category}
        onSubmit={async (event) => {
          if (currentUser) {
            try {
              const updated = await updateCategoryMutation({
                where: { id: category.id },
                data: { name: event.target[0].value, user: { connect: { id: currentUser.id } } },
              })
              await setQueryData(updated)
              alert("Success!" + JSON.stringify(updated))
              router.push(`/categories/${updated.id}`)
            } catch (error) {
              console.log(error)
              alert("Error creating category " + JSON.stringify(error, null, 2))
            }
          }
        }}
      />
    </div>
  )
}

const EditCategoryPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditCategory />
      </Suspense>

      <p>
        <Link href="/categories">
          <a>Categories</a>
        </Link>
      </p>
    </div>
  )
}

EditCategoryPage.getLayout = (page) => <Layout title={"Edit Category"}>{page}</Layout>

export default EditCategoryPage
