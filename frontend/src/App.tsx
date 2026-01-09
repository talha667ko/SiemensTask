import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./layouts/Layout";
import ClassifyMaterials from "./pages/ClassifyMaterials";
import ViewClassifications from "./pages/ViewClassifications";
import LoginForm from "./pages/Login";
import AuthLayout from "./layouts/AuthLayout";

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
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
