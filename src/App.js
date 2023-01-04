import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { ToastContainer, toast } from "react-toastify";
import Table from "./pages/Table";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* {/* <Route path="about" element={ <About/> } /> */}
        <Route path="table" element={<Table />} />
      </Routes>

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
