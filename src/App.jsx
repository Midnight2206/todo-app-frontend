import './App.css'
import AppRouter from "@/components/AppRouter"
import ErrorBoundary from '@/components/ErrorBoundary'
function App() {

  return (
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  )
}

export default App
