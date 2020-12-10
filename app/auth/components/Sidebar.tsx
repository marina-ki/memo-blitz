import React, { FC, useState, useEffect } from "react"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getCategories from "app/categories/queries/getCategories"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { useCategoriesContext } from "../../contexts/categoriesContext"

export const Sidebar = () => {
  // const currentUser = useCurrentUser()

  // const [{ categories, hasMore }] = usePaginatedQuery(getCategories, {
  //   orderBy: { id: "asc" },
  //   where: { userId: currentUser?.id },
  // })

  // if (!currentUser) return null

  const { categories } = useCategoriesContext()

  return (
    <aside className="bg-white w-64 min-h-screen flex-column">
      <div className="bg-white border-b px-4 h-10 flex item-center">
        <span className="text-blue-900 py-2">Application</span>
      </div>
      <div className="flex-grow">
        <ul>
          {categories.map((category) => (
            <li className="py-1 px-4" key={category.name}>
              <a href={`/categories/${category.id}`}>{category.name}</a>
            </li>
          ))}
        </ul>
        <ul>
          <li className="py-1 px-4">
            <a href={`/categories/1`}>{"aaaa"}</a>
          </li>
          <li className="py-1 px-4">
            <a href={`/categories/1`}>{"aaaa"}</a>
          </li>
          <li className="py-1 px-4">
            <a href={`/categories/1`}>{"aaaa"}</a>
          </li>
          <li className="py-1 px-4">
            <a href={`/categories/1`}>{"aaaa"}</a>
          </li>
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
