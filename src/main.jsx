import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import Registration from './Registration'
import Enrollment from './Enrollment'
import Terms from './Terms'
import Privacy from './Privacy'

const params = new URLSearchParams(window.location.search)
const page = params.get('page')

function RootRouter() {
  // route: ?page=enroll -> Enrollment, ?page=terms -> Terms, ?page=privacy -> Privacy, else -> Registration
  if (page === 'enroll') return <Enrollment />
  if (page === 'terms') return <Terms />
  if (page === 'privacy') return <Privacy />
  return <Registration />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootRouter />
  </StrictMode>,
)
