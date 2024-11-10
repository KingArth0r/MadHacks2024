import { useState } from 'react';
import GameContainer from "./GameContainer";

export default function Body() {
    const [selectedNotes, setSelectedNotes] = useState([]);
    const [showNonChromatic, setShowNonChromatic] = useState(false);

    const allNotes = [
        "A", "A𝄲", "A♯/B♭", "A-♯/B𝄳",
        "B", "B𝄲/C𝄳",
        "C", "C𝄲", "C♯/D♭", "C-♯/D𝄳",
        "D", "D𝄲", "D♯/E♭", "D-♯/E𝄳",
        "E", "E𝄲/F𝄳",
        "F", "F𝄲", "F♯/G♭", "F-♯/F𝄳",
        "G", "G𝄲", "G♯/A♭", "G-♯/G𝄳"
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
        <div className="flex flex-col justify-start items-center h-full p-4 gap-4">
            <div className="flex justify-between items-center w-full p-4 bg-cppAccent rounded-lg">
                <h1 className="text-2xl text-white font-bold">Perfect Pitch++</h1>
                <button className="text-white">Audio Library</button>
            </div>

            <div className="flex justify-center items-start w-full gap-4">
                <div className="w-1/4 p-4 bg-cppLight rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold text-white">Instructions</h2>
                    <ul className="list-disc list-inside text-white mt-2">
                        <li>Select the notes you want to include.</li>
                        <li>Click "Start Game" to begin.</li>
                        <li>Identify the played note correctly!</li>
                    </ul>
                    <button 
                        className="w-full mt-4 py-2 bg-cppDark hover:scale-105 rounded-lg text-white"
                        onClick={resetNotes}
                    >
                        Reset Notes
                    </button>
                    <button 
                        className="w-full mt-2 py-2 bg-cppDark hover:scale-105 rounded-lg text-white"
                        onClick={selectAllNotes}
                    >
                        Select All Notes
                    </button>
                    <button 
                        className="w-full mt-2 py-2 bg-cppDark hover:scale-105 rounded-lg text-white"
                        onClick={selectChromaticScale}
                    >
                        Select Chromatic Scale
                    </button>
                    <button 
                        className={`w-full mt-2 py-2 ${showNonChromatic ? 'bg-red-500' : 'bg-green-500'} hover:scale-105 rounded-lg text-white`}
                        onClick={toggleNonChromaticNotes}
                    >
                        {showNonChromatic ? "Hide Non-Chromatic Notes" : "Show All Notes"}
                    </button>
                </div>

                <GameContainer 
                    selectedNotes={selectedNotes} 
                    setSelectedNotes={setSelectedNotes} 
                    showNonChromatic={showNonChromatic} 
                />

                <div className="w-1/4 p-4 bg-cppLight rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold text-white">Selected Notes</h2>
                    <div id="selected-notes" className="text-white mt-2">
                        {selectedNotes.length > 0 
                            ? selectedNotes.join(', ') 
                            : <p className="text-gray-300">No notes selected</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}