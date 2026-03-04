import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookDetails from "./components/BookDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/book/:id" element={<BookDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
