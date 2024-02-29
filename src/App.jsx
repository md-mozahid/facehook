import { Route, Routes } from 'react-router-dom'
import { Home, Login, NotFound, Profile, Register } from './pages'
import PrivateRoutes from './routes/PrivateRoutes'

function App() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="/Login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/not-found" element={<NotFound />} />
    </Routes>
  )
}

export default App
