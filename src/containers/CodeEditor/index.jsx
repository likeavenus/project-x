import React, { useRef } from 'react';
import Editor from "@monaco-editor/react";

import styles from './style.module';
import { config } from '../../editorConfig';

 

export const CodeEditor = () => {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor; 
  }
  
  function runCode() {
    // console.log()
    eval(editorRef.current.getValue());
  }
    return (
      <div className={styles.editor__component}>
        <div className={styles.editor__wrap}>
          <Editor
            width="800px"
            height="70vh"
            defaultLanguage="javascript"
            defaultValue="// начнём"
            onMount={handleEditorDidMount}
            theme="vs-dark"
            className={styles.editor}
            options={config}
          />
          <button onClick={runCode} className={styles.editor__button}>Запустить</button>
        </div>
        
      </div>
    )
}