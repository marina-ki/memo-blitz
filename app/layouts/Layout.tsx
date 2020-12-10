import { ReactNode, Suspense } from "react"
import Sidebar from "./Sidebar"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <div className="flex bg-gray-100 min-h-screen w-screen">
      <Suspense fallback="Loading...">
        <Sidebar />
      </Suspense>
      <main className="min-h-screen w-full pr-60">{children}</main>
    </div>
  )
}

export default Layout
