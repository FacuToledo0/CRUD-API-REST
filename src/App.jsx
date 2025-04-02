import { useState } from "react";
import CreateObject from "./Components/CreateObject"; // Asegúrate de la ruta correcta
import "./App.css";
import EditObject from "./Components/EditObject";
import DeleteObject from "./Components/DeleteObject";

function App() {
  return (
    <>
      <h1>CRUD - API  - REST</h1>
      <CreateObject />
      <EditObject />
      <DeleteObject />
    </>
  );
}

export default App;
