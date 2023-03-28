import "./App.css";
import ResponsiveAppBar from "./components/Bar";
import Footer from "./components/Footer";
import CollapsibleTable from "./components/main_page/Table";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <Router>
        <Routes>
          <Route></Route>
        </Routes>
      </Router> */}

      <ResponsiveAppBar />
      <CollapsibleTable />
      <Footer />
    </div>
  );
}

export default App;
