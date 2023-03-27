import "./App.css";
import useFetch from "./useFetch";

function App() {
  const { data, loading, erorr } = useFetch("http://localhost:8080/cpu/get/2");

  if (loading) return <h1> LOADING... </h1>;
  if (erorr) console.log(erorr);

  return (
    <div className="App">
      <h1>{data?.socket.name}</h1>
    </div>
  );
}

export default App;
