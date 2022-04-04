import "./App.css";
import MainPage from "./pages/MainPage";
import ProductListManager from "./components/ProductListManager";

function App() {
  //create new plm object from ProductListManager(our db), use it as a prop for MainPage component
  const plm = new ProductListManager();

  return (
    <div className="App">
      <MainPage plm={plm}></MainPage>
    </div>
  );
}
export default App;
