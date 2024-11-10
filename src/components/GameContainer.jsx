import {useState} from 'react';

export default function() {
    const [isStarted, setIsStarted] = useState(false);
    const [showMicrotones, setShowMicrotones] = useState(false);
    const [allNotes, setAllNotes] = useState([
        "A", "A𝄲", "A♯/B♭", "A-♯/B𝄳",
        "B", "B𝄲/C𝄳",
        "C", "C𝄲", "C♯/D♭", "C-♯/D𝄳",
        "D", "D𝄲", "D♯/E♭", "D-♯/E𝄳",
        "E", "E𝄲/F𝄳",
        "F",  "F𝄲", "F♯/G♭", "F-♯/F𝄳",
        "G", "G𝄲", "G♯/A♭", "G-♯/G𝄳"
    ]);
    const [notes, setNotes] = useState([]);

    return (
        <div className="my-4 border-2 border-cppBlue rounded-md px-12 py-2">

            {!isStarted ? 
            <div className="flex-col">
                <p>Options</p>
                <div className="grid grid-cols-12">
                    {allNotes.map(note => (
                        <button id={note}
                            className={`p-1 m-1 rounded-lg text-white  hover:scale-105 
                                ${notes.includes(note) ? 'bg-cppDark' : 'bg-cppLight'}`}
                            onClick={() => {notes.includes(note) 
                                ? setNotes(prevNotes => prevNotes.filter((n) => n !== note)) 
                                : setNotes((prevNotes => [...prevNotes, note]))
                            }}
                        >
                            {note}
                        </button>
                    ))}
                </div>
            
                <button 
                    className="font-bold text-white rounded-md bg-cppBlue hover:bg-cppLight border-2 border-cppDark p-2"
                    onClick={() => setIsStarted(true)}
                >
                    Start Game
                </button>
            </div>
            : <div>
                

                <button className="font-bold text-white bg-cppBlue rounded-md hover:bg-cppLight border-2 border-cppDark p-2"
                    onClick={() => setIsStarted(false)}
                >
                    End Game
                </button>
            </div>}
        </div>
    );
};