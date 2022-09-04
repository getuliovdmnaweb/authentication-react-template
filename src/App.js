import { Provider } from "react-redux";
import { MainRouter } from "./router";
import { store } from "./store";

function App() {
  return (
    <div>
      <Provider store={store}>
        <MainRouter />
      </Provider>
    </div>
  );
}

export default App;
