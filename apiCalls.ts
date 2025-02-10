

import React from "react";



type setState<T> = React.Dispatch<React.SetStateAction<T>>

export async function dictionaryCall(word: string, setData: setState<any>) {
    try {

        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        if (!response.ok) {
            throw new Error("Word not found");
        }
        const data = await response.json()
        
        
        const extractedData = data.map((entry: any) => ({
            word: entry.word,
            phonetics: entry.phonetics.map((p: any) => p.text).filter(Boolean), // Get phonetics
            meanings: entry.meanings.map((meaning: any) => ({
                partOfSpeech: meaning.partOfSpeech,
                definitions: meaning.definitions.map((def: any) => ({
                    definition: def.definition,
                    example: def.example || "",
                    synonyms: def.synonyms || [],
                    antonyms: def.antonyms || [],
                })),
            })),
        }));
        console.log(extractedData)
        setData(extractedData)
    }
    catch (error) {
        console.error("Error fetching definition:", error)
        setData({error: "No Data Found."})
    }
}


export async function thesaurusCall(word: string, setData: setState<any>) {
    try {
        const response = await fetch(`https://api.api-ninjas.com/v1/thesaurus?word=${word}`, {
          method: "GET",
          headers: {
            "X-Api-Key": process.env.NEXT_PUBLIC_API_KEY as string,
          },
        });
  
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
  
        const data = await response.json();
        setData(data.synonyms || []);
      } catch (err: any) {
        console.error(err)
        
      }


}
