import React, { useRef } from 'react';
import Editor from "@monaco-editor/react";

import styles from './style.module';
import { config } from '../../editorConfig';
 

export const CodeEditor = () => {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor; 
    console.log(editorRef.current)
  }
  
  function showValue() {
    console.log('alert')
    alert(editorRef.current.getValue());
  }
    return (
      <div>
        <button onClick={showValue}>Show value</button>
        <Editor
          height="90vh"
          defaultLanguage="javascript"
          defaultValue="// some comment"
          onMount={handleEditorDidMount}
        />
      </div>
    )
}