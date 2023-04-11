import { useEffect, useState } from "react";

import "./App.css";
import Notepad from "./components/Notepad";
import Editor from "./components/Editor";
import EditorStatus from "./components/EditorStatus";
import LoadingBar from "react-top-loading-bar";
import Sidebar from "./Sidebar";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
function App() {
  const [editor, setEditor] = useState(false);
  const [editorPer, setEditorPer] = useState(false);
  const [progress, setProgress] = useState(0);
  const [curNoteId, setCurNoteId] = useState(null);

  return (
    <div className="dark dark:bg-blue-300 min-h-screen min-w-screen flex justify-center items-start ">
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="flex w-full min-h-screen">
        <Sidebar setCurNoteId={setCurNoteId} editor={editor} />

        <Notepad
          editor={editor}
          setEditorPer={setEditorPer}
          curNoteId={curNoteId}
          setProgress={setProgress}
        />
      </div>

      {editorPer && (
        <Editor
          setEditorPer={setEditorPer}
          editorPer={editorPer}
          editor={editor}
          setEditor={setEditor}
        />
      )}

      <EditorStatus editor={editor} />
    </div>
  );
}

export default App;
