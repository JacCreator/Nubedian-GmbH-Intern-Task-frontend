import "./App.css";
import ResponsiveAppBar from "./components/Bar";
import CollapsibleTable from "./components/Table";
import useFetch from "./useFetch";

function App() {
  const { data, loading, erorr } = useFetch("http://localhost:8080/cpu/get/2");

  if (loading) return <h1> LOADING... </h1>;
  if (erorr) console.log(erorr);

  return (
    <div className="App">
      <ResponsiveAppBar />
      <CollapsibleTable />
    </div>
  );
}

export default App;
