import Layout from "app/layouts/Layout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createCategory from "app/categories/mutations/createCategory"
import CategoryForm from "app/categories/components/CategoryForm"

const NewCategoryPage: BlitzPage = () => {
  const router = useRouter()
  const [createCategoryMutation] = useMutation(createCategory)

  return (
    <div>
      <h1>Create New Category</h1>

      <CategoryForm
        initialValues={{}}
        onSubmit={async () => {
          try {
            const category = await createCategoryMutation({ data: { name: "MyName" } })
            alert("Success!" + JSON.stringify(category))
            router.push(`/categories/${category.id}`)
          } catch (error) {
            alert("Error creating category " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/categories">
          <a>Categories</a>
        </Link>
      </p>
    </div>
  )
}

NewCategoryPage.getLayout = (page) => <Layout title={"Create New Category"}>{page}</Layout>

export default NewCategoryPage
