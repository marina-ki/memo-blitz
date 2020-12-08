import { ReactNode, Suspense } from "react"
import { Head } from "blitz"
import { Sidebar } from "app/auth/components/Sidebar"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <div className="flex bg-gray-100">
      <Suspense fallback="Loading...">
        <Sidebar />
      </Suspense>
      <main className="flex-grow flex flex-col min-h-screen">
        <header className="bg-indigo-200 border-b h-10 hlex items-center">
          <h1>ヘッダー</h1>
        </header>
        {children}
      </main>
    </div>
  )
}

export default Layout
