import { useState } from 'react';
import SongCard from './SongCard';

export default function GameContainer({ selectedNotes, setSelectedNotes, showNonChromatic, isStarted, setIsStarted }) {
    const [currentNote, setCurrentNote] = useState(null);
    const [selectedGuess, setSelectedGuess] = useState(null);
    const [accuracy, setAccuracy] = useState({ correct: 0, total: 0 });
    const [feedback, setFeedback] = useState(null);
    const [isHovered, setIsHovered] = useState(false);

    const notes = {
        "A": new Audio('/notes/A.mp3'),
        "A𝄲": new Audio('/notes/Ahs.mp3'),
        "A♯/B♭": new Audio('/notes/As.mp3'),
        "B𝄳": new Audio('./notes/Bhf.mp3'),
        'B': new Audio('/notes/B.mp3'),
        "B𝄲/C𝄳": new Audio('/notes/Bhs.mp3'),
        'C': new Audio('/notes/C.mp3'),
        "C𝄲": new Audio('/notes/Chs.mp3'),
        "C♯/D♭": new Audio('/notes/Cs.mp3'),
        "D𝄳": new Audio('./notes/Dhf.mp3'),
        'D': new Audio('/notes/D.mp3'),
        "D𝄲": new Audio('/notes/Dhs.mp3'),
        "D♯/B♭": new Audio('/notes/Ds.mp3'),
        "E𝄳": new Audio('./notes/Ehf.mp3'),
        'E': new Audio('/notes/E.mp3'),
        "E𝄲/F𝄳": new Audio('/notes/Ehs.mp3'),
        'F': new Audio('/notes/F.mp3'),
        "F𝄲": new Audio('/notes/Fhs.mp3'),
        "F♯/G♭": new Audio('/notes/Fs.mp3'),
        "G𝄳": new Audio('./notes/Ghf.mp3'),
        'G': new Audio('/notes/G.mp3'),
        "G𝄲": new Audio('/notes/Ghs.mp3'),
        "G♯/B♭": new Audio('/notes/Gs.mp3'),
        "A𝄳": new Audio('./notes/Ahf.mp3'),
    }

    const allNotes = [
        "A", "A𝄲", "A♯/B♭", "B𝄳",
        "B", "B𝄲/C𝄳",
        "C", "C𝄲", "C♯/D♭", "D𝄳",
        "D", "D𝄲", "D♯/E♭", "E𝄳",
        "E", "E𝄲/F𝄳",
        "F", "F𝄲", "F♯/G♭", "F𝄳",
        "G", "G𝄲", "G♯/A♭", "G𝄳"
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
            const note = selectedNotes[Math.floor(Math.random() * selectedNotes.length)];
            setCurrentNote(note);
            console.log(notes[note]);
            notes[note].play();
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
                const note = selectedNotes[Math.floor(Math.random() * selectedNotes.length)]
                setCurrentNote(note);
                notes[note].play();
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
        <div>
            {!isStarted ? 
                <div className="flex flex-col space-y-4">
                    

                    <div className={`grid ${gridColumnsClass} gap-2 mb-4`}>
                        {displayedNotes.map(note => (
                            <button
                                key={note}
                                className={`p-1 m-1 rounded-lg text-white font-medium hover:scale-105 w-14 h-14
                                    ${selectedNotes.includes(note) ? 'bg-cppDark' : 'bg-cppLight'}`}
                                onClick={() => handleNoteClick(note)}
                            >
                                {note}
                            </button>
                        ))}
                    </div>
                    {selectedNotes.length > 0 ? 
                        <button 
                            className="font-bold text-white rounded-md bg-cppBlue hover:scale-105 duration-100 border-2 border-cppDark p-2 mt-2"
                            onClick={startGame}
                        >
                            Start Game
                        </button>
                        : <></>
                    }
                    <div className="grid grid-cols-3"> <SongCard imgSrc="/PPPPLogo.png" letter="E" name="Runaway" song="/songs/e/Kanye West - Runaway.mp3"/> <SongCard imgSrc="/PPPPLogo.png" letter="B♭" name="Bohemian Rhapsody" song="/songs/b/Queen - Bohemian Rhapsody.mp3"/> <SongCard imgSrc="/PPPPLogo.png" letter="C" name="Gangsta's Paradise" song="songs/c/Coolio - Gangsta's Paradise.mp3"/>  </div>
                </div>
            : 
                <div className="space-y-4">
                    <div className="text-white text-xl flex justify-between items-center p-2 font-bold bg-cppBlue rounded-lg">
                        <p>Accuracy: {accuracyPercentage.toFixed(2)}% </p><p className="justify-end"> Total: {accuracy.total}</p>
                    </div>
                    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mt-2 relative">
                        <div 
                            className="h-full bg-green-500 text-xs text-white flex items-center justify-center font-semibold"
                            style={{ width: `${accuracyPercentage}%` }}
                        >
                        </div>
                    </div>
                    <button
                        className="relative bg-cppDark text-white font-bold text-xl rounded-lg p-2 hover:scale-105 duration-100 overflow-hidden h-full"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        style={{
                            position: 'relative',
                        }}
                        onClick={() => {notes[currentNote].play()}}
                        >
                        {/* Background Image (Fade-In Effect) */}
                        <span
                            className={`absolute inset-0 bg-center bg-cover transition-opacity duration-500 ease-in-out ${
                            isHovered ? 'opacity-100' : 'opacity-0'
                            }`}
                            style={{
                            backgroundImage: "url('/wave.gif')",
                            }}
                        ></span>

                        {/* Button Text */}
                        <span className="relative z-10">Hear Again</span>
                    </button>


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
                        className="font-bold w-full text-white bg-cppBlue rounded-md hover:bg-cppLight border-2 border-cppDark p-2 mt-2"
                        onClick={endGame}
                    >
                        End Game
                    </button>
                </div>
            }
        </div>
    );

}