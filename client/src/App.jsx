import { useEffect, useState } from "react";

import "./App.css";
import Notepad from "./components/Notepad";
import Editor from "./components/Editor";
import EditorStatus from "./components/EditorStatus";
import LoadingBar from "react-top-loading-bar";
import Sidebar from "./Sidebar";

function App() {
  const [editor, setEditor] = useState(false);
  const [editorPer, setEditorPer] = useState(false);
  const [progress, setProgress] = useState(0);

  return (
    <div className="dark dark:bg-blue-300 min-h-screen min-w-screen flex justify-center items-start ">
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="flex w-full min-h-screen">
        <Sidebar />

        <Notepad editor={editor} setEditorPer={setEditorPer} />
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
