import { useState } from "react";
import "./App.css";
import Main from "./component/Main";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Main></Main>
    </>
  );
}

export default App;
