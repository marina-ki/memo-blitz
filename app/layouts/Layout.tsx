import { ReactNode } from "react"
import { Head } from "blitz"

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
        <aside className="bg-white w-60 h-screen sticky top-0">
          <div className="flex items-center justify-center mt-10">
            <a href="/">Application</a>
          </div>
          <nav className="mt-10">
            <a
              className="flex items-center py-2 px-8 bg-gray-200 text-gray-700 border-r-4 border-gray-700"
              href="#"
            >
              ああああ
            </a>
            <a
              className="flex items-center py-2 px-8 text-gray-600 border-r-4 border-white hover:bg-gray-100 hover:text-gray-700 hover:border-gray-700"
              href="#"
            >
              いいいい
            </a>
          </nav>
        </aside>

        <main className="w-full">{children}</main>
      </div>
    </>
  )
}

export default Layout
