import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./Layout";
import ClassifyMaterials from "./pages/ClassifyMaterials";
import ViewClassifications from "./pages/ViewClassifications";
import FormValidation from "./pages/Login";

function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/classifymaterials" element={<ClassifyMaterials />} />
            <Route
              path="/viewclassifications"
              element={<ViewClassifications />}
            />
            <Route path="/login" element={<FormValidation />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
