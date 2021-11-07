import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Menu } from "../components/Menu";
import { CodeEditor } from "./CodeEditor";
import { Intro } from "./Intro";

import styles from "../style.module";

export const Main = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" ? null : <Menu />}
      <div className={styles.app}>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="editor" element={<CodeEditor />} />
        </Routes>
      </div>
    </>
  );
};
