import "./App.css";
import ResponsiveAppBar from "./components/Bar";
import Footer from "./components/Footer";
import CollapsibleTable from "./components/main_page/Table";

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <CollapsibleTable />
      <Footer />
    </div>
  );
}

export default App;
