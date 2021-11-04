import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { getTasks } from '../../api';
import { Loading } from '../../components/Loading';

import styles from "./style.module";
import { config } from "../../editorConfig";

export const CodeEditor = () => {
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
      setLevel((prev) => prev += 1);
    }
    if (currentAnswer === undefined) {
      alert("Не забывай вызвать функцию.");
    }
  }

  useEffect(() => {
    getTasks()
      .then((data) => {
        setTasks(data);
      })
      .catch((e) => { throw new Error(e) });
  }, []);

  useEffect(() => {
    if (tasks.length) {
      setCurrentTask(tasks[level])
    }
  }, [level, tasks]);


  return (
    <div className={styles.editor__component}>
      <div className={styles.editor__wrap}>
        <Editor
          width="800px"
          height="60vh"
          defaultLanguage="javascript"
          onMount={handleEditorDidMount}
          theme="vs-dark"
          loading={<Loading />}
          className={styles.editor}
          options={config}
          value={currentTask ? currentTask.task : ''}
        />
        <button onClick={runCode} className={styles.editor__button}>
          run code
        </button>
      </div>
    </div>
  );
};
