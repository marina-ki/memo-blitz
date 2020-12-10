import { ReactNode } from "react"
import { Head } from "blitz"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <div className="flex bg-gray-100">
      <aside className="bg-white w-64 min-h-screen flex flex-column">サイドバー</aside>
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
