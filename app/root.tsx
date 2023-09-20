import { Outlet,LiveReload, Link, Links, isRouteErrorResponse, useRouteError } from '@remix-run/react'
import stylesheet from "~/tailwind.css";

export const links = () => [
  { rel: "stylesheet", href: stylesheet },
];
export default function () {
  return (
   <Document title="My Remix Blog">
      <Layout>
        <Outlet />
      </Layout>
   </Document>
  );
}

function Document({ children, title }) {
    return (
    <html lang='en'>
      <head>
        <Links />
        <title>{title ? title : "My Remix Blog"}</title>
      </head>
        <body>
        {children}
        <LiveReload />
      </body>
    </html>
    )
}

function Layout({children}) {
  return (
    <div className='w-1/2 m-auto mt-2'>
      <nav className='flex flex-row justify-between py-3 bg-slate-400 text-white h-12 px-9 '>
        <Link to="/" className=''>
          Remix 
        </Link>
        <ul className='nav'>
          <li>
            <Link to="/posts">
              Posts 
            </Link>
          </li>
        </ul>
      </nav>
      <div className="">
        {children}
      </div>
    </div>
  )
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Document title="Error Response">
        <Layout>
          <div>
            <h1>
              {error.status} {error.statusText}
            </h1>
            <p>{error.data}</p>
          </div>
        </Layout>
      </Document>
    )
  } else if (error instanceof Error) {
    return (
      <Document title="Error">
      <Layout>
        <div className='mt-6'>
          <h1>Error</h1>
          <p className='bg-red-500'>{error.message}</p>
        </div>
      </Layout>
    </Document>
    )
  } else {
    return <h1>Unknown Error</h1>
  }
}
