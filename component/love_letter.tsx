
import { useRouter } from "next/navigation";


import { useState } from "react";
const LoveLetter = () => {

const router = useRouter();
     const [position, setposition] = useState({ x: 62, y: 62 });
     const [isMoved, setIsMoved] = useState(false);
    
    
    const handleyesclick = () =>
    {

      router.push("/love_response")
    }
      
      
    const handleNoclick = (e: any) => {
      // These lines stop the phone from scrolling or clicking
      if (e.cancelable) e.preventDefault();
      e.stopPropagation();
    
      const randomX = Math.floor(Math.random() * 60) + 20; 
      const randomY = Math.floor(Math.random() * 60) + 20;
      
      setposition({ x: randomX, y: randomY });
      setIsMoved(true);
    }
  return (
   
    <main className="bg-pink-600 min-h-screen w-full flex justify-center items-center p-4">


      <div className="bg-white/20 backdrop-blur-md border border-white/30 w-[95%] md:w-3/4 lg:w-1/2 min-h-125 h-auto rounded-3xl flex flex-col items-center p-8 shadow-2xl">

        <h1 className="w-full max-w-120 py-5 items-center justify-center text-center font-serif rounded-2xl bg-slate-100 text-pink-900 shadow-md text-xl italic ">
          To the One Who Holds My Heart
        </h1>

        <div className="grow flex justify-center mt-6">
          <p className="text-white  font-light text-4xl italic text-center px-4">
            DO YOU LOVE ME
          </p>
        </div>
        <div className=" text-white flex  justify-center   mt-2 md:space-x-10 space-x-1.5 mb-20 ">
          <button onClick={handleyesclick} className="md:w-30 w-30 h-20 p-2 bg-yellow-500 rounded-2xl ">
            YES
          </button>
          <span className="  bg-yellow-500 text-center font-sans text-3xl rounded-2xl  md:w-20 w-10 h-10 flex justify-around items-center ml-4 mt-2 space-x-10" >
            or
          </span>

          <button onPointerDown={handleNoclick} 
      onTouchStart={handleNoclick}
      onMouseEnter={handleNoclick}
      style={{
        position: isMoved ? 'absolute' : 'relative',
        left: isMoved ? `${position.x}%` : 'auto',
        top: isMoved ? `${position.y}%` : 'auto',
        transform: isMoved ? 'translate(-50%, -50%)' : 'none', // Keeps it centered under touch
        transition: 'all 0.2s ease',
        touchAction: 'none', // ABSOLUTELY REQUIRED for mobile
        userSelect: 'none',
        WebkitUserSelect: 'none',
        padding:"24px",
      }} className="md:w-30 w-30 h-20 p-4 text-white bg-slate-400 rounded-2xl  ">

            NO
          </button>
        </div>


      </div>
    </main>
  )
}


export default LoveLetter;
