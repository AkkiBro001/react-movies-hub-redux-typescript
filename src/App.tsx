import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/header/Header"
import Home from "./pages/home/Home"
import { Provider } from "react-redux"
import { store } from "./store/Store"
import Search from "./pages/search/Search"


function App() {


  return (
    <Provider store={store}>
      <div className="app">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:query" element={<Search />} />
          </Routes>

        </BrowserRouter>
      </div>
    </Provider>
  )
}

export default App
