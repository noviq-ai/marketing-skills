import { Navigate, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { DocsPage } from './pages/DocsPage'
import { HomePage } from './pages/HomePage'
import { EnDocsPage } from './pages/docs/EnDocsPage'
import { JaDocsPage } from './pages/docs/JaDocsPage'

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/docs/en" element={<EnDocsPage />} />
        <Route path="/docs/ja" element={<JaDocsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
