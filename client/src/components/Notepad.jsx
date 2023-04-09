import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { serverUrl } from "../utils";
import axios from "axios";
import { TfiReload } from "react-icons/tfi";
import { TiTick } from "react-icons/ti";
const Notepad = ({ editor, setEditorPer, curNoteId, setProgress }) => {
  const noteArea = useRef();
  const noteTitleref = useRef();
  const [timer, setTimer] = useState(false);

  useEffect(() => {
    if (curNoteId) {
      axios
        .get(serverUrl + `/note/noteid/${curNoteId}`, {
          onDownloadProgress: (e) => setProgress((e.loaded / e.total) * 100),
        })
        .then((res) => {
          noteArea.current.value = res.data.note.noteText;
          noteTitleref.current.value = res.data.note.noteTitle;
        });
    }
  }, [curNoteId]);
  const uploadData = () => {
    axios
      .put(serverUrl + `/note/noteid/${curNoteId}`, {
        noteText: noteArea.current.value,
        noteTitle: noteTitleref.current.value,
      })
      .then((res) => set);
  };
  const textAreaChange = () => {
    setTimer(true);
  };
  useEffect(() => {
    if (timer) {
      setTimeout(() => {
        uploadData();
        setTimer(false);
      }, 5000);
    }
  }, [timer]);

  return (
    <div class="w-full min-h-screen border border-gray-200  bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
      <div class="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
        <BarIcons
          setEditorPer={setEditorPer}
          curNoteId={curNoteId}
          editor={editor}
        />
        <div class="flex flex-wrap items-center space-x-1 sm:pl-4 flex-1 mr-2">
          <input
            type="text"
            ref={noteTitleref}
            disabled={!editor}
            class="outline-0  p-2  flex-1 rounded hover:cursor-text sm:ml-auto text-gray-900 bg-gray-100 dark:text-gray-400 dark:text-white dark:bg-gray-600"
            onChange={(e) => {
              textAreaChange();
            }}
          />
        </div>

        {!timer ? (
          <div class=" p-2 text-gray-500 rounded  sm:ml-auto  dark:text-gray-400 ">
            <TiTick className="w-5 h-5" strokeWidth={1} />
          </div>
        ) : (
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity }}
            class=" p-2 text-gray-500 rounded  sm:ml-auto  dark:text-gray-400 "
          >
            <TfiReload strokeWidth={1} />
          </motion.div>
        )}

        {/* <button
          onClick={() => uploadData()}
          type="button"
          class="ml-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-1.5 mr-2 mb dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Save
        </button> */}
        <div
          id="tooltip-fullscreen"
          role="tooltip"
          class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
          Show full screen
          <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
      </div>
      <div class="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
        <label for="editor" class="sr-only">
          Publish post
        </label>
        <textarea
          onChange={(e) => {
            textAreaChange();
          }}
          disabled={!editor}
          rows="8"
          class={` block outline-0 min-h-[70vh] w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800  dark:text-white dark:placeholder-gray-400`}
          placeholder="Write an article..."
          ref={noteArea}
          required
        ></textarea>
      </div>
    </div>
  );
};
const BarIcons = ({ setEditorPer, curNoteId ,editor}) => {
  const deleteNote = () => {
    axios
      .delete(serverUrl + `/note/noteid/${curNoteId}`)
      .then((res) => window.location.reload());
  };
  return (
    <>
      <div class="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600">
        <div class="flex items-center space-x-1 sm:pr-4">
          <button
            onClick={() => {
              setEditorPer(true);
            }}
            type="button"
            class="p-2  text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
          >
            <svg
              fill="none"
              className="w-5 h-5"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              ></path>
            </svg>
            <span class="sr-only">Edit file</span>
          </button>
          <button
            onClick={() => {
              deleteNote();
            }}
            type="button"
            disabled={!editor}
            class="disabled:opacity-50   p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 disabled:dark:hover:bg-none"
          >
            <svg
              class="w-5 h-5"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 23 23"
              strokeWidth="1.5"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>

            <span class="sr-only">Embed map</span>
          </button>
          <button
            type="button"
            class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Upload image</span>
          </button>
          <button
            type="button"
            class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Format code</span>
          </button>
          <button
            type="button"
            class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Add emoji</span>
          </button>
        </div>
        <div class="flex flex-wrap items-center space-x-1 sm:pl-4">
          <button
            type="button"
            class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Add list</span>
          </button>
          <button
            type="button"
            class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Settings</span>
          </button>
          <button
            type="button"
            class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Timeline</span>
          </button>
          <button
            type="button"
            class="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Download</span>
          </button>
        </div>
      </div>
    </>
  );
};
export default Notepad;
