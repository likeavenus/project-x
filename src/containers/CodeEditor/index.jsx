import React, { useCallback, useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { getTasks } from '../../api';
import { Loading } from '../../components/Loading';
import { ModalWindow } from '../../components/ModalWindow';

import styles from './style.module';
import { config } from '../../editorConfig';
import { initialState } from './constants';
import { TaskDescription } from './TaskDescription';

export const CodeEditor = () => {
  const editorRef = useRef(null);
  const [tasks, setTasks] = useState([]);
  const [level, setLevel] = useState(0);
  const [isOpen, setModalState] = useState(true);

  const [currentTask, setCurrentTask] = useState();
  const [code, setCode] = useState();
  const [srcDoc, setSrcDoc] = useState('');


  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    setCode(initialState);
  }
  const runCode = useCallback(() => {
    let result = new Function(`return ${code}`);

    const currentAnswer = result()();
    if (currentAnswer === currentTask.answer) {
          alert('Успех');
          setLevel((prev) => prev + 1);
    }
    // let result = new Function(`module.exports = ${code}`);
  }, [code, currentTask?.answer]);

  useEffect(() => {
    getTasks()
      .then((data) => {
        setTasks(data);
      })
      .catch((e) => {
        console.error(e);
      });

    // window.onbeforeunload = function (e) {
    //   const text =
    //     "Вы действительно хотите покинуть страницу? Вы потеряете текущий код";
    //   e.returnValue = text;
    //   return text;
    // };
  }, []);

  useEffect(() => {
    if (tasks.length) {
      setCurrentTask(tasks[level]);
    }
  }, [level, tasks]);

  const toggleModalState = useCallback(() => {
    setModalState((prev) => !prev);
  }, []);

  function handleEditorChange(value) {
    setCode(value);
  }
  return (
    <div className={styles.editor__component}>
      <ModalWindow isOpen={isOpen}>
        <div className={styles.editor__modal}>
          <div className={styles.modal__text}>
            Для решения задачи тебе нужно будет написать функцию в редакторе
            кода аналогичном <b>Visual Studio Code</b>.
          </div>
          <button onClick={toggleModalState} className={styles.modal__button}>
            Окей
          </button>
        </div>
      </ModalWindow>
      <div className={styles.editor__wrap}>
        <Editor
          width="100%"
          height="60vh"
          defaultLanguage="javascript"
          onMount={handleEditorDidMount}
          onChange={handleEditorChange}
          theme="vs-dark"
          loading={<Loading />}
          className={styles.editor}
          options={config}
          value={code}
          defaultValue={code}
        />
        <button onClick={runCode} className={styles.editor__button}>
          Run
        </button>
      </div>
      <TaskDescription />
    </div>
  );
};
