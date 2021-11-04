import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { CodeEditor } from "./containers/CodeEditor";
import { Intro } from "./containers/Intro";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="editor" element={<CodeEditor />} />
      </Routes>
    </Router>
  );
};

export default App;
