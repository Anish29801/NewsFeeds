import "./App.css"
import { useState } from "react"
import Navbar from "./component/Navbar.jsx"
import Hero from "./component/Hero.jsx"

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <Navbar onSearch={(term) => setSearchTerm(term)} />
      <Hero searchTerm={searchTerm} />
    </div>
  )
}

export default App