import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MultiStepForm from "./components/MultiStepForm";
import AdminPanel from "./components/AdminPanel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MultiStepForm />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
