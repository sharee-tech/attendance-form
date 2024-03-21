import * as React from "react";
import Form from "./components/Form";
import Copyright from "./components/Copyright";

function App() {
  return (
    <>
      <form>
        <Form />
      </form>
      <footer>
        <Copyright />
      </footer>
    </>
  );
}

export default App;
