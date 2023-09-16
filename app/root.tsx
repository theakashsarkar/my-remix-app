
import { Outlet,LiveReload, Link } from '@remix-run/react'

export default function () {
  return (
   <Document>
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
        <title>{title ? title : "My Remix Blog"}</title>
      </head>
        <body>
          <h1>hello world</h1>
        {children}
        <LiveReload />
      </body>
    </html>
    )
}

function Layout({children}) {
  return (
    <>
      <nav className='navbar'>
        <Link to="/" className=''>
          Remix 
        </Link>
        <ul className='nav'>
          <li>
            <Link to="/">
              Posts 
            </Link>
          </li>
        </ul>
      </nav>
      <div className=''>
        {children}
      </div>
    </>
  )
}