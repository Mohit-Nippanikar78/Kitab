import { useEffect, useState } from "react";

import "./App.css";
import Notepad from "./components/Notepad";
import Editor from "./components/Editor";
import EditorStatus from "./components/EditorStatus";
import LoadingBar from 'react-top-loading-bar'

function App() {
  const [editor, setEditor] = useState(false);
  const [editorPer, setEditorPer] = useState(false);
  const [progress, setProgress] = useState(0);

  return (
    <div className="min-h-screen min-w-screen flex justify-center items-start pt-10" style={{ background: "rgba(0,0,0,0.1)" }}>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Notepad editor={editor} setEditorPer={setEditorPer} />
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
