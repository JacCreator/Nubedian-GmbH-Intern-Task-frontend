import "./App.css";
import ResponsiveAppBar from "./components/Bar";
import CollapsibleTable from "./components/Table";
import useFetch from "./useFetch";

function App() {
  const { loading, error } = useFetch("http://localhost:8080/cpu/get/2");

  return (
    <div className="App">
      <ResponsiveAppBar />
      <CollapsibleTable />
    </div>
  );
}

export default App;
