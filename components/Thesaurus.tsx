"use client";

import { thesaurusCall } from "@/apiCalls";
import { useState } from "react";

export default function ThesaurusPage() {
  const [word, setWord] = useState<string>("");
  const [data, setData] = useState<any>(null);
  const [searchedWord, setSearched] = useState<string>("")

  return (
    <div className="flex flex-col justify-start content-center text-base items-center bg-[url(../app/img/bluebg.jpg)] h-dvh p-6 theme-blue">
      <h2 className="font-semibold text-4xl p-3">Thesaurus!</h2>
      <p>Type a word below to find other related words!</p>
      <div className="bg-secondary flex justify-center flex-col items-center gap-10 p-6 h-100 rounded-md">
        <form
          className="flex flex-col items-center px-10"
          onSubmit={(e) => e.preventDefault()}
        >
          <label>Enter a word: </label>
          <input
            type="text"
            className="text-black"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
        </form>
        <div className="bg-secondary-200">
          <button
            className="bg-primary hover:bg-alt text-base font-medium px-6 py-2 rounded-md"
            onClick={() => {
              thesaurusCall(word, setData);
              setSearched(word)
              console.log(data);
            }}
          >
            SEARCH!
          </button>
        </div>
      </div>

      {data && (
        <div className="text-white mt-4 overflow-auto px-300 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-center bg-secondary px-4 py-1 rounded-md">Synonyms of {searchedWord}</h2>
          {/* Render synonyms or other information */}
          {data && data.length > 0 ? (
            <div className="bg-secondary rounded-md px-7 m-2">
              {/* <h3 className="text-xl font-semibold text-center">Synonyms of {word}</h3> */}
              <ul className="p-3 m-3 grid grid-cols-4 ">
                {data.map((synonym: string, index: number) => (
                  <li key={index} className="text-base bg-primary m-1 p-3  text-center rounded-md">
                    {synonym}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No synonyms found.</p>
          )}
        </div>
      )}
    </div>
  );
}
