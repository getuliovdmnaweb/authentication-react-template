import { Provider } from "react-redux";
import SnackProvider from "./providers/SnackProvider";
import { MainRouter } from "./router";
import { store } from "./store";

function App() {
  return (
    <div>
      <Provider store={store}>
        <SnackProvider>
          <MainRouter />
        </SnackProvider>
      </Provider>
    </div>
  );
}

export default App;
