import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import Registration from './Registration'
import Enrollment from './Enrollment'
import Terms from './Terms'
import Privacy from './Privacy'

const pathname = window.location.pathname || '/'

function RootRouter() {
  // route: /enroll -> Enrollment, /terms -> Terms, /privacy -> Privacy, else -> Registration
  if (pathname.includes('/enroll')) return <Enrollment />
  if (pathname.includes('/terms')) return <Terms />
  if (pathname.includes('/privacy')) return <Privacy />
  return <Registration />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootRouter />
  </StrictMode>,
)
