import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { collection, addDoc, getFirestore, getDocs } from "firebase/firestore";

import styles from "./style.module";
import { config } from "../../editorConfig";

export const CodeEditor = () => {
  const db = getFirestore();
  const editorRef = useRef(null);
  const [tasks, setTasks] = useState([]);
  const [level, setLevel] = useState(0);

  const [currentTask, setCurrentTask] = useState();

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function runCode() {
    const currentAnswer = eval(editorRef.current.getValue());
    if (currentAnswer === currentTask.answer) {
      alert("Успех");
      setCurrentTask(tasks[1]);
    }
    if (currentAnswer === undefined) {
      alert("Не забывай вызвать функцию.");
    }
  }

  useEffect(() => {
    (async() => {
      const data = [];
      const tasksArray = await getDocs(collection(db, "tasks"));
      tasksArray.forEach((doc) => {
        data.push(doc.data());
      })
      setTasks(data);
    })();
  }, []);

  useEffect(() => {
    if (tasks.length) {
      setCurrentTask(tasks[level])
    }
  }, [tasks]);


  return (
    <div className={styles.editor__component}>
      <div className={styles.editor__wrap}>
        <Editor
          width="800px"
          height="60vh"
          defaultLanguage="javascript"
          onMount={handleEditorDidMount}
          theme="vs-dark"
          className={styles.editor}
          options={config}
          value={currentTask ? currentTask.task : ''}
        />
        <button onClick={runCode} className={styles.editor__button}>
          run
        </button>
      </div>
    </div>
  );
};
