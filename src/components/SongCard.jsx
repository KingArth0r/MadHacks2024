import { FaPlay } from "react-icons/fa";

export default function SongCard({imgSrc, name, letter}) {
    return (
        <div className="flex items-center bg-cppLight border-2 rounded-md border-cppDark hover:cursor-pointer hover:scale-105 duration-100">
            <p className="p-5 text-xl font-bold text-white rounded-lg mx-2">{letter}</p> 
            <div className="relative group w-14 h-14">
                <img
                    src={imgSrc}
                    alt={name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center">
                        <FaPlay></FaPlay>
                    </div>
                </div>
            </div>
            <p className="font-medium text-white text-lg mx-2">{name}</p> 
        </div>
    );
}