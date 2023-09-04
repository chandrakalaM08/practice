import "./App.css";
import AddGroceryForm from "./components/AddGrocery";
import GroceryList from "./components/GroceryList";

function App() {
  return (
    <div className="App">
      <h1>Grocery App</h1>
      <div>
        <AddGroceryForm />
      </div>
      <GroceryList />
    </div>
  );
}

export default App;
