import { ReactNode, Suspense } from "react"
import { Head } from "blitz"
import { Sidebar } from "./Sidebar"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "memoApp"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex bg-gray-100 min-h-screen w-screen">
        <Suspense fallback="Loading...">
          <Sidebar />
        </Suspense>
        <main className="w-full">{children}</main>
      </div>
    </>
  )
}

export default Layout
