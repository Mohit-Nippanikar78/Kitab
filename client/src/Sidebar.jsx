import axios from "axios";
import React, { useEffect, useState } from "react";
import { serverUrl } from "./utils";

const Sidebar = ({ setCurNoteId, editor }) => {
  const [notesBar, setNotesBar] = useState([]);
  useEffect(() => {
    axios.get(serverUrl + "/note/notes").then((res) => {
      setNotesBar(res.data.notes);
      setCurNoteId(res.data.notes[0].noteId);
    });
  }, []);

  const createNote = () => {
    axios.post(serverUrl + "/note/new").then((res) => {
      setNotesBar((prev) => [res.data.newNote, ...prev]);
      setCurNoteId(res.data.newNote.noteId);
    });
  };
  return (
    <>
      <aside
        id="default-sidebar"
        class=" z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div class="h-full px-2 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul class=" font-medium">
            <li
              onClick={() => {
                editor && createNote();
              }}
            >
              <div class="cursor-pointer flex items-center my-1.5 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg
                  aria-hidden="true"
                  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth={1.6}
                  viewBox="0 0 23 23"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  ></path>
                </svg>
                <span class="ml-3">New Note</span>
              </div>
            </li>
            <div className="h-[1px] bg-gray-500 w-full"></div>
            {notesBar?.map((item, i) => {
              return (
                <li key={i}>
                  <div
                    onClick={() => {
                      setCurNoteId(item.noteId);
                    }}
                    class="cursor-pointer flex items-center p-2 my-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <svg
                      aria-hidden="true"
                      class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.6}
                      viewBox="0 0 23 23"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                    <span class="flex-1 ml-3 whitespace-nowrap">
                      {item.noteTitle}
                    </span>
                    {item.modified && (
                      <span class="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                        M
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
