import { useState } from 'react';
import GameContainer from "./GameContainer";


export default function Body({darkMode}) {
    const [selectedNotes, setSelectedNotes] = useState([]);
    const [showNonChromatic, setShowNonChromatic] = useState(false);
    const [isStarted, setIsStarted] = useState(false);

    const allNotes = [
        "A", "A𝄲", "A♯/B♭", "B𝄳",
        "B", "B𝄲/C𝄳",
        "C", "C𝄲", "C♯/D♭", "D𝄳",
        "D", "D𝄲", "D♯/E♭", "E𝄳",
        "E", "E𝄲/F𝄳",
        "F", "F𝄲", "F♯/G♭", "E𝄲/F𝄳",
        "G", "G𝄲", "G♯/A♭", "G𝄳"
    ];

    // Standard Chromatic Scale (excluding quarter tones)
    const chromaticScale = [
        "A", "A♯/B♭", "B", 
        "C", "C♯/D♭", "D", 
        "D♯/E♭", "E", "F", 
        "F♯/G♭", "G", "G♯/A♭"
    ];

    // Reset the selected notes
    const resetNotes = () => setSelectedNotes([]);

    // Select all notes
    const selectAllNotes = () => setSelectedNotes([...allNotes]);

    // Select only the standard chromatic scale
    const selectChromaticScale = () => setSelectedNotes([...chromaticScale]);

    // Toggle visibility of non-chromatic notes
    const toggleNonChromaticNotes = () => {
        setShowNonChromatic(!showNonChromatic);
    };

    return (
        <div className={`min-h-screen flex flex-col justify-start items-center h-full p-4 ${darkMode ? 'bg-darkGrey' : 'bg-white'} transition-all`}>

            <div className="flex justify-center items-start w-full gap-4">
                <div className="w-1/4 p-4 bg-cppLight rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold text-white">Instructions</h2>
                    <ul className="list-disc text-lg font-medium list-inside text-white mt-2">
                        <li>Select the notes you want to include.</li>
                        <li>Click "Start Game" to begin.</li>
                        <li>Identify the played note correctly!</li>
                        <li>Click "End Game" when done!</li>
                    </ul>
                    {!isStarted ? 
                    <>
                    <button 
                        className="w-full mt-4 py-2 bg-cppDark hover:scale-105 duration-100 rounded-lg text-white"
                        onClick={resetNotes}
                    >
                        Reset Notes
                    </button>
                    <button 
                        className="w-full mt-2 py-2 bg-cppDark hover:scale-105 duration-100 rounded-lg text-white"
                        onClick={selectAllNotes}
                    >
                        Select All Notes
                    </button>
                    <button 
                        className="w-full mt-2 py-2 bg-cppDark hover:scale-105 duration-100 rounded-lg text-white"
                        onClick={selectChromaticScale}
                    >
                        Select Chromatic Scale
                    </button>
                    <button 
                        className={`w-full mt-2 py-2 bg-cppDark hover:scale-105 duration-100 rounded-lg text-white`}
                        onClick={toggleNonChromaticNotes}
                    >
                        {showNonChromatic ? "Hide Non-Chromatic Notes" : "Show All Notes"}
                    </button>
                    </>
                    : <></>}
                </div>

                <GameContainer 
                    selectedNotes={selectedNotes} 
                    setSelectedNotes={setSelectedNotes} 
                    showNonChromatic={showNonChromatic} 
                    isStarted={isStarted}
                    setIsStarted={setIsStarted}
                />

                <div className="w-1/4 p-4 bg-cppLight rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold text-white">Selected Notes</h2>
                    <div className={`text-white font-medium mt-2 ${selectedNotes.length > 0 ? 'grid grid-cols-3' : ''}`}>
                        {selectedNotes.length > 0 
                            ? selectedNotes.map((note) => <p>{note}</p>)
                            : <p className="text-gray-300">No notes selected</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}