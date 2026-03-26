
import React, { useRef, useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { METHODS } from 'http'
import { json } from 'stream/consumers'

const DotLottieReact = dynamic(
  () => import('@lottiefiles/dotlottie-react').then((mod) => mod.DotLottieReact),
  { ssr: false }
)

const Love_response = () => {
  const params = useParams()
  //const name = params.slug ? params.slug.toString().toUpperCase() : 'MY LOVE'
  const cardRef = useRef<HTMLDivElement>(null)
  const [showLottie, setShowLottie] = useState(false)
  // New state to trigger the entrance animation
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({ email: "", reply: "" });


  const handlechange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
try{


    let reply = await fetch("/api/user",
      {
        method:"POST",
        headers: {
          "Content-Type":"application/json"
        
    },

      body:JSON.stringify(formData)
       } );
       const data = await reply.json();
       console.log(data);
         // ✅ Clear the form
    setFormData({
      email: "",
      reply: ""
    });
      }
      catch(error)
      {
        console.error(error);
      
      }
      
    console.log(formData);

  }

  useEffect(() => {
    // Trigger the card "rise" almost immediately
    const appearanceTimer = setTimeout(() => setIsVisible(true), 100);
    // Delay Lottie for a smooth entrance
    const lottieTimer = setTimeout(() => setShowLottie(true), 1000)

    return () => {
      clearTimeout(appearanceTimer);
      clearTimeout(lottieTimer);
    }
  }, [])

  return (
    <main
      className="relative min-h-screen max-h-screen  w-full flex flex-col items-center justify-start md:justify-center p-4 overflow-x-hidden"
      style={{
        backgroundImage: `url('https://wallpapers.com/images/hd/red-heart-3840-x-2344-background-z7knktmfrjsvm20b.jpg')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed', // Note: fixed can be tricky on iOS, 'scroll' is safer for mobile Safari
        width: "100vw",
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] z-0"></div>

      {/* GORGEOUS CARD */}
      <div
        ref={cardRef}

        className={`
    relative z-20   flex-wrap
    bg-white/10 backdrop-blur-2xl 
    w-[95%] md:w-3/4 lg:w-1/2 
    rounded-[40px] md:rounded-[50px] 
    shadow-[0_0_50px_rgba(255,182,193,0.2)]
    flex flex-col items-center justify-center
    p-8 md:p-16 text-center
    mt-40

    /* ENHANCED ANIMATION LOGIC */
    transition-[transform,opacity] duration-2000 
    cubic-bezier(0.34, 1.56, 0.64, 1) /* This adds a slight, elegant bounce */
  
  `}
      >
        <h1 className="text-white text-4xl md:text-7xl font-serif italic font-bold tracking-tighter">
          I Love You Too, <br />
          <span className="text-pink-200">baby! </span>
        </h1>

        <div className="mt-6 md:mt-8 space-y-4">
          <p className="text-pink-100/90 text-base md:text-xl font-light italic leading-relaxed">
            When I think of you, baby, my heart flutters. Every moment we share builds a beautiful future.
          </p>
          <p className="text-pink-200/80 text-xs md:text-sm uppercase tracking-[0.3em] font-bold animate-pulse">
            Forever & Always
          </p>
        </div>

      </div>
      <form onSubmit={handleSubmit} className="z-20 flex flex-col items-center w-full px-4">

        {/* Email Input */}
        <label htmlFor="email"></label>
        <input
          onChange={handlechange}
          type='email'
          name="email"
          id="email"
          value={formData.email}


          placeholder='Enter your email'
          className='h-12 w-full max-w-md mt-10 text-xl px-4 
               focus:outline-none focus:ring-0 border-2 border-amber-300 
               text-white bg-red-500 font-sans placeholder-amber-100 
               rounded-md shadow-lg transition-all'
        />

        {/* Reply Input */}
        <label htmlFor="reply"></label>
        <textarea

          name="reply"
          id="reply"
          value={formData.reply}
          onChange={handlechange}
          placeholder='REPLY'
          className='h-12 w-full max-w-md mt-6 text-xl px-4 
               focus:outline-none focus:ring-0 border-2 border-amber-300 
               text-white bg-red-500 font-sans placeholder-amber-100 
               rounded-md shadow-lg transition-all'
        />

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            backgroundColor: "#ea1111",
            marginTop: "50px",
            border: "2px solid #fbbf24", // You need to define the type (solid) and color here
            borderRadius: "12px",

            width: "20rem"

          }}>

          SEND RESPONSE
        </button>

      </form>

      {/* LOTTIE RENDERED BELOW THE CARD */}
      <div className="relative z-10 w-full flex justify-center -mt-10 md:-mt-20 pointer-events-none">
        {showLottie && (
          <div className="w-64 h-64 md:w-96 md:h-96 opacity-80 transition-opacity duration-1000">
            <DotLottieReact
              src="https://lottie.host/c7ab4a90-af37-4545-b1e4-1d3efb814c49/3xo4BPZIq9.lottie"
              loop={false}
              autoplay
            />
          </div>
        )}
      </div>
    </main>
  )
}

export default Love_response