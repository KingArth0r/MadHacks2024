import { useState } from 'react';

export default function GameContainer({ selectedNotes, setSelectedNotes, showNonChromatic, isStarted, setIsStarted }) {
    const [currentNote, setCurrentNote] = useState(null);
    const [selectedGuess, setSelectedGuess] = useState(null);
    const [accuracy, setAccuracy] = useState({ correct: 0, total: 0 });
    const [feedback, setFeedback] = useState(null);

    const allNotes = [
        "A", "A𝄲", "A♯/B♭", "A-♯/B𝄳",
        "B", "B𝄲/C𝄳",
        "C", "C𝄲", "C♯/D♭", "C-♯/D𝄳",
        "D", "D𝄲", "D♯/E♭", "D-♯/E𝄳",
        "E", "E𝄲/F𝄳",
        "F", "F𝄲", "F♯/G♭", "F-♯/F𝄳",
        "G", "G𝄲", "G♯/A♭", "G-♯/G𝄳"
    ];

    const chromaticScale = [
        "A", "A♯/B♭", "B", 
        "C", "C♯/D♭", "D", 
        "D♯/E♭", "E", "F", 
        "F♯/G♭", "G", "G♯/A♭"
    ];

    const displayedNotes = showNonChromatic ? allNotes : chromaticScale;
    const gridColumnsClass = displayedNotes.length >= 12 
        ? 'grid-cols-12' 
        : displayedNotes.length >= 6 
        ? 'grid-cols-6' 
        : 'grid-cols-4';

    const handleNoteClick = (note) => {
        if (selectedNotes.includes(note)) {
            setSelectedNotes(prevNotes => prevNotes.filter(n => n !== note));
        } else {
            setSelectedNotes(prevNotes => [...prevNotes, note]);
        }
    };

    const startGame = () => {
        if (selectedNotes.length > 0) {
            setCurrentNote(selectedNotes[Math.floor(Math.random() * selectedNotes.length)]);
            setIsStarted(true);
            setFeedback(null);
            setSelectedGuess(null);
        }
    };

    const handleGuess = (note) => {
        setSelectedGuess(note);
        const isCorrect = note === currentNote;

        setAccuracy((prev) => ({
            correct: prev.correct + (isCorrect ? 1 : 0),
            total: prev.total + 1
        }));

        setFeedback(isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            setTimeout(() => {
                setCurrentNote(selectedNotes[Math.floor(Math.random() * selectedNotes.length)]);
                setFeedback(null);
                setSelectedGuess(null);
            }, 1000);
        } else {
            setTimeout(() => setFeedback(null), 500);
        }
    };

    const endGame = () => {
        setIsStarted(false);
        setAccuracy({ correct: 0, total: 0 });
    };

    const accuracyPercentage = accuracy.total > 0 ? (accuracy.correct / accuracy.total) * 100 : 0;

    return (
        <div className="my-4 border-2 border-cppBlue rounded-md px-6 py-4 space-y-4">
            {!isStarted ? 
                <div className="flex flex-col space-y-4">
                    <p className="text-lg font-semibold">Options</p>
                    <div className={`grid ${gridColumnsClass} gap-2 mb-4`}>
                        {displayedNotes.map(note => (
                            <button
                                key={note}
                                className={`p-1 m-1 rounded-lg text-white hover:scale-105 w-14 h-14
                                    ${selectedNotes.includes(note) ? 'bg-cppDark' : 'bg-cppLight'}`}
                                onClick={() => handleNoteClick(note)}
                            >
                                {note}
                            </button>
                        ))}
                    </div>
                    {selectedNotes.length > 0 ? 
                        <button 
                            className="font-bold text-white rounded-md bg-cppBlue hover:scale-105 border-2 border-cppDark p-2 mt-2"
                            onClick={startGame}
                        >
                            Start Game
                        </button>
                        : <></>
                    }
                    
                </div>
            : 
                <div className="space-y-4">
                    <p className="text-white mt-4 text-lg">
                        Accuracy: {accuracyPercentage.toFixed(2)}%
                    </p>
                    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mt-2 relative">
                        <div 
                            className="h-full bg-green-500 text-xs text-white flex items-center justify-center font-semibold"
                            style={{ width: `${accuracyPercentage}%` }}
                        >
                            {accuracyPercentage.toFixed(2)}%
                        </div>
                    </div>
                    <p className="text-white text-lg font-semibold">Guess the Note:</p>
                    <div className={`grid ${gridColumnsClass} gap-2 mb-4`}>
                        {selectedNotes.map(note => (
                            <button
                                key={note}
                                className={`p-1 m-1 rounded-lg text-white hover:scale-105 w-14 h-14
                                    ${note === selectedGuess && feedback === 'incorrect' ? 'bg-red-500' : ''}
                                    ${note === currentNote && feedback === 'correct' ? 'bg-green-500' : 'bg-cppLight'}`}
                                onClick={() => handleGuess(note)}
                            >
                                {note}
                            </button>
                        ))}
                    </div>
                    <button 
                        className="font-bold text-white bg-cppBlue rounded-md hover:bg-cppLight border-2 border-cppDark p-2 mt-2"
                        onClick={endGame}
                    >
                        End Game
                    </button>
                </div>
            }
        </div>
    );

}