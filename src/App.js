import "./App.css";
import ResponsiveAppBar from "./components/Bar";
import Footer from "./components/Footer";
import CollapsibleTable from "./components/main_page/Table";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EditCpu from "./pages/EditCpu";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CollapsibleTable />}></Route>
        <Route path="/edit-cpu/:id" element={<EditCpu />} />
      </Routes>
      {/* <ResponsiveAppBar />
      <CollapsibleTable />
      <Footer /> */}
    </div>
  );
}

export default App;
