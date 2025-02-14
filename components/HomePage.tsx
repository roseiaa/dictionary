"use client";

import { dictionaryCall } from "@/apiCalls";
import { useState } from "react";


interface Phonetic {
  text: string;
}

interface Definition {
  definition: string;
  example?: string;
  synonyms: string[];
  antonyms: string[];
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
}

interface WordEntry {
  word: string;
  phonetics: Phonetic[];
  meanings: Meaning[];
}

type DictionaryResponse = WordEntry[] | { error: string };




export default function HomeScreen() {
  const [word, setWord] = useState<string>("");
  const [wordData, setData] = useState<DictionaryResponse | null>(null);

  return (
    <div className="flex flex-col justify-start content-center text-base items-center bg-[url(../app/img/background.jpg)] bg-cover h-dvh p-6 theme-white ">
      <h2 className="font-semibold text-4xl p-3">Dictionary!</h2>
      <p>Type a word below to find its definition! </p>
      <div className="bg-secondary flex justify-center flex-col items-center gap-10 p-6 h-100 rounded-md border-2 border-base">
        <form
          className="flex flex-col items-center px-10"
          onSubmit={(e) => e.preventDefault()}
        >
          <label>Enter a word: </label>
          <input
            type="text"
            className="text-black border-2 border-base"
            value={word}
            onChange={(e) => {
              setWord(e.target.value);
            }}
          />
        </form>
        <div className="bg-secondary-200 ">
          <button
            className="bg-primary hover:bg-alt text-base font-medium px-6 py-2 rounded-md border-2 border-base md"
            onClick={() => {
              dictionaryCall(word, setData);

            }}
          >
            SEARCH!
          </button>
        </div>
      </div>
      {wordData && Array.isArray(wordData) ? (
        <div className="text-base mt-4 overflow-auto">
          <h2 className="text-2xl font-bold">{wordData[0].word}</h2>

          {wordData[0].phonetics.length > 0 && (
            <p className="text-lg italic">
              Pronunciation: {wordData[0].phonetics.join(", ")}
            </p>
          )}

          {wordData[0].meanings.map((meaning,  index) => (
            <div key={index} className="my-4 p-4 bg-secondary rounded-md ">
              <h3 className="text-xl font-semibold text-base">{meaning.partOfSpeech}</h3>
              {meaning.definitions.map((def, defIndex) => (
                <div key={defIndex} className="mt-2 text-base">
                  <p>🔹 {def.definition}</p>
                  {def.example && (
                    <p className="italic text-gray-500">
                      Example: "{def.example}"
                    </p>
                  )}
                  {def.synonyms.length > 0 && (
                    <p className="text-white">
                      Synonyms: {def.synonyms.join(", ")}
                    </p>
                  )}
                  {def.antonyms.length > 0 && (
                    <p className="text-red-400">
                      Antonyms: {def.antonyms.join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        wordData?.error && <p className="text-red-500">{wordData.error}</p>
      )}
    </div>
  );
}
