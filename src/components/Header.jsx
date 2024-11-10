import { FaRegMoon, FaSun } from "react-icons/fa";

export default function Header({setDarkMode, darkMode}) {
    return(
        <div className="relative h-40 bg-cppBlue items-center justify-center text-white">
            <div className="absolute inset-0 bg-repeat w-full f-full opacity-70 my-2" style={{backgroundImage: "url('/wave.gif')",}}></div>
            <div className="relative z-10 flex items-center justify-between w-full p-4">
                <img src="/PPPPLogo.png" alt="logo" className="w-28 h-28 hover:cursor-pointer relative transition-all duration-500 ease-in-out hover:animate-rotate360"></img> 
                <p className="font-bold text-white text-6xl hover:cursor-pointer hover:scale-105 hover:border-4 border-cppLight rounded-lg duration-300">Perfect Pitch++ </p>
                <div className="flex items-center hover:cursor-pointer shadow-md hover:scale-105 duration-100"
                    onClick={() => {setDarkMode(!darkMode)}}
                >
                    <p className="font-bold text-white text-2xl mx-2">{darkMode ? <>Light Mode</> : <>Dark Mode</>} </p> 
                    {darkMode ? <FaSun/> : <FaRegMoon/>} 
                </div>
            </div>
        </div>
    )
}