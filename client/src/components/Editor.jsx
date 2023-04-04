import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";

const Editor = ({ setEditorPer, setEditor, editorPer }) => {
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (password == "civildept") {
      setEditor(true);
      setEditorPer(false);
    }
  }, [password]);

  return (
    <div
      id="defaultModal"
      tabindex="-1"
      aria-hidden="true"
      class="fixed backdrop-blur-sm flex justify-center items-center top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full"
    >
      <div class="relative  w-full h-full max-w-2xl md:h-auto">
        <OutsideClickHandler
          onOutsideClick={() => {
            console.log("hogaya bro bahar");
            if (editorPer) setEditorPer(false);
          }}
        >
          <div class="relative  rounded-lg shadow dark:bg-gray-700">
            <label
              for="input-group-1"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Enter Password
            </label>
            <div class="relative mb-6">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="text-red-500 animate-pulse w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  ></path>
                </svg>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                autoFocus={true}
                class="bg-gray-50 border border-red-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Contact mohit for password "
              />
            </div>
          </div>
        </OutsideClickHandler>
      </div>
    </div>
  );
};

export default Editor;
