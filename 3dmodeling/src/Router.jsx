import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App"
import Graphpage from "./pages/Graphpage"
const AppRouter = () => {
  return (
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route exact path="/Graph" element={<Graphpage/>} />
    </Routes>
  );
};

export default AppRouter;
