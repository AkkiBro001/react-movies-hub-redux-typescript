import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/header/Header"
import Home from "./pages/home/Home"
import { Provider } from "react-redux"
import { store } from "./store/Store"
import Search from "./pages/search/Search"
import Footer from "./components/footer/Footer"
import Collection from "./pages/collection/Collection"

function App() {


  return (
    <Provider store={store}>
      <div className="app">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:query" element={<Search />} />
            <Route path="/collection/:type" element={<Collection />} />
          </Routes>

        </BrowserRouter>
      </div>
        <Footer/>
    </Provider>
  )
}

export default App
