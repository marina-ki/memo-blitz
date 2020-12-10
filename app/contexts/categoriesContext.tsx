import React, { useEffect, useReducer, Reducer, useContext } from "react"
import { Link, useQuery, useRouter, BlitzPage } from "blitz"
import getCategories from "app/categories/queries/getCategories"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { Category } from "@prisma/client"

type State = {
  categories: Category[]
}

const CategoriesContext = React.createContext<State>({
  categories: [],
})

export const useCategoriesContext = () => useContext(CategoriesContext)

export const CategoriesProvider: React.FC = ({ children }) => {
  const currentUser = useCurrentUser()
  const [{ categories }] = useQuery(getCategories, {
    orderBy: { id: "desc" },
    where: { userId: currentUser?.id },
  })

  return <CategoriesContext.Provider value={{ categories }}>{children}</CategoriesContext.Provider>
}
