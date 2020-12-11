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
      {/* <style jsx global>{`
        .button:hover {
          background-color: #45009d;
        }

        .button-outline {
          border: 2px solid #6700eb;
          padding: 1rem 2rem;
          color: #6700eb;
          text-align: center;
        }

        .button-outline:hover {
          border-color: #45009d;
          color: #45009d;
        }
        .js-focus-visible :focus:not(.focus-visible) {
          outline: 0 !important;
        }
        button:focus-visible {
          outline: 0 !important;
        }
      `}</style> */}
    </div>
  )
}

export default Layout
