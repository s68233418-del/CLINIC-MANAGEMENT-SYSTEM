import { Routes, Route } from "react-router"
import Navbar from "./components/Navbar"
import HomePage from "./Pages/HomePage"
import CreatePage from "./Pages/CreatePage"
import PatientDetailPage from "./Pages/PatientDetailPage"
import PatientNotFound from "./components/PatientNotFound"

function App() {
  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <main className="p-4 max-w-7xl mx-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/patient/:id" element={<PatientDetailPage />} />
          <Route path="*" element={<PatientNotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App