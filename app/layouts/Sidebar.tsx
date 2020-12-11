import React, { FC, useState, useEffect } from "react"
import { Link, useQuery, useRouter, BlitzPage } from "blitz"
import getCategories from "app/categories/queries/getCategories"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { Category } from "@prisma/client"

const NavItem = ({ category, isActive }: { category: Category; isActive: boolean }) => {
  const className = isActive
    ? "bg-gray-200 text-gray-700 border-r-4 border-gray-700"
    : "text-gray-600 border-r-4 border-white hover:bg-gray-100 hover:text-gray-700 hover:border-gray-700"

  return (
    <a className={`flex items-center py-2 px-8 ${className}`} href={`/categories/${category.id}`}>
      {category.name}
    </a>
  )
}

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
          <a href="/">Application</a>
        </div>
        <nav className="mt-10">
          {categories.map((category) => (
            <NavItem
              category={category}
              isActive={Number(currentCategoryId) == category.id}
              key={category.id}
            />
          ))}
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
