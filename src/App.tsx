import { Route, Routes } from "react-router-dom";
import HomePage from "./view/pages/Home";

function App() {
  console.log("App component rendering");
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
}

export default App;
