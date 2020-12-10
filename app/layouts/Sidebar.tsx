import React, { FC, useState, useEffect } from "react"
import { Link, useQuery, useRouter, BlitzPage } from "blitz"
import getCategories from "app/categories/queries/getCategories"
import { useCurrentUser } from "app/hooks/useCurrentUser"

export const Sidebar = () => {
  const currentUser = useCurrentUser()
  const router = useRouter()
  const currentCategoryId = router.params.categoryId

  const [{ categories, hasMore }] = useQuery(getCategories, {
    orderBy: { id: "desc" },
    where: { userId: currentUser?.id },
  })

  if (!currentUser) return null

  return (
    <aside className="flex flex-col sm:flex-row sm:justify-around">
      <div className="bg-white w-60 min-h-screen flex-column">
        <div className="flex items-center justify-center mt-10">
          <a href="/memos">Application</a>
        </div>
        <nav className="mt-10">
          {categories.map((category) =>
            Number(currentCategoryId) == category.id ? (
              <a
                className="flex items-center py-2 px-8 bg-gray-200 text-gray-700 border-r-4 border-gray-700"
                href={`/categories/${category.id}`}
                key={category.id}
              >
                {category.name}
              </a>
            ) : (
              <a
                className="flex items-center  py-2 px-8 text-gray-600 border-r-4 border-white hover:bg-gray-100 hover:text-gray-700 hover:border-gray-700"
                href={`/categories/${category.id}`}
                key={category.id}
              >
                {category.name}
              </a>
            )
          )}
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
