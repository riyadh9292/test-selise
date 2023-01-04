import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import { ToastContainer, toast } from "react-toastify";
import Table from "./pages/Table";
import Dashboard from "./pages/Dashboard";

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <div className="flex items-center gap-10">
        <div
          onClick={() => navigate("/dashboard")}
          className=" cursor-pointer p-4 w-fit border border-[#e6e6e6] rounded bg-pink-300 text-white"
        >
          dashboard
        </div>
        <div
          onClick={() => navigate("/")}
          className=" cursor-pointer p-4 w-fit border border-[#e6e6e6] rounded bg-pink-300 text-white"
        >
          home
        </div>
        <div
          onClick={() => navigate("/table")}
          className=" cursor-pointer p-4 w-fit border border-[#e6e6e6] rounded bg-pink-300 text-white"
        >
          table
        </div>
      </div>

      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* {/* <Route path="about" element={ <About/> } /> */}
        <Route path="table" element={<Table />} />
        <Route path="dashboard" element={<Dashboard />} />
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
