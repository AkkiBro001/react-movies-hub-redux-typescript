import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/header/Header"
import Home from "./pages/home/Home"
import { Provider } from "react-redux"
import { store } from "./store/Store"
import Search from "./pages/search/Search"
import Footer from "./components/footer/Footer"
import Collection from "./pages/collection/Collection"
import Details from "./pages/details/Details"
import ErrorPage from "./pages/error/ErrorPage"
import { ErrorBoundary } from "react-error-boundary"


function App() {



  return (
    <Provider store={store}>
      <div className="app">
        <BrowserRouter>
          <Header />
            <ErrorBoundary
              FallbackComponent={ErrorPage}
            >
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search/:query" element={<Search />} />
              <Route path="/collection/:type" element={<Collection />} />
              <Route path="/:type/:id" element={<Details />} />
            {/* <Route path="*" element={<ErrorPage icon={ErrorIcon} title="Page not Found" link={"/"} linkTitle="Go to home page" errorType="page error" />} /> */}
          </Routes>
            </ErrorBoundary>

        </BrowserRouter>
      </div>
      <Footer />
    </Provider>
  )
}

export default App
