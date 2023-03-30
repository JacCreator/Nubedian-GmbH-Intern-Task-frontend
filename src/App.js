import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EditCpu from "./pages/EditCpu";
import Main from "./pages/Main";
import CpuValidation from "./validations/CpuValidation";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/edit-cpu/:id" element={<EditCpu />} />
        <Route path="/test" element={<CpuValidation />} />
      </Routes>
    </div>
  );
}

export default App;
