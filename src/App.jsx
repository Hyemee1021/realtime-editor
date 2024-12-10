import { Login } from "./Login";
import { Doc } from "./Doc";
import { Route, Routes } from "react-router-dom";

import DocPage from "./DocPage";
import { AddDoc } from "./AddDoc";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/doc" element={<Doc />} />
      <Route path="/addDoc" element={<AddDoc />} />
      <Route path="/doc/:documentId" element={<DocPage />} />
    </Routes>
  );
};

export default App;
