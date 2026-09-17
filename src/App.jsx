import { Suspense } from "react";
import "./App.css";
import AppNavigator from "./config/routes/AppNavigator";

function App() {
  return (
    <>
    <AppNavigator />
    </>
    // <Suspense fallback={<div>Loading...</div>}>
    //   <AppNavigator />
    // </Suspense>
  );
}

export default App;