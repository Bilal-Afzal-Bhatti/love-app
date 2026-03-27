"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import Lottie to prevent SSR errors on Vercel
const DotLottieReact = dynamic(
  () => import('@lottiefiles/dotlottie-react').then((mod) => mod.DotLottieReact),
  { ssr: false }
);

const Love_response = () => {
  const params = useParams();
  const [showLottie, setShowLottie] = useState(false);
  const [formData, setFormData] = useState({ email: "", reply: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlechange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setFormData({ email: "", reply: "" });
        alert("Response sent successfully!");
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Small delay to ensure the page has hydrated before showing the animation
    const lottieTimer = setTimeout(() => setShowLottie(true), 800);
    return () => clearTimeout(lottieTimer);
  }, []);

  return (
    <main
      className="relative min-h-screen w-full flex flex-col items-center justify-start p-4 overflow-x-hidden bg-red-950"
      style={{
        backgroundImage: `url('https://wallpapers.com/images/hd/red-heart-3840-x-2344-background-z7knktmfrjsvm20b.jpg')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed', // 'fixed' is more stable on mobile browsers (192.168... testing)
      }}
    >
      {/* Dark overlay to ensure text readability across all screens */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] z-0 pointer-events-none"></div>

      {/* Hero Card - Added 'isolate' to ensure backdrop-blur works consistently on Vercel */}
      <div className="relative z-20 isolate flex flex-col items-center justify-center bg-white/10 backdrop-blur-2xl border border-white/20 w-[95%] md:w-3/4 lg:w-1/2 rounded-[40px] md:rounded-[60px] shadow-[0_0_50px_rgba(255,182,193,0.3)] p-8 md:p-20 text-center mt-16 md:mt-28">
        <h1 className="text-white text-4xl md:text-7xl font-serif italic font-bold tracking-tighter leading-tight">
          I Love You Too, <br />
          <span className="text-pink-300 drop-shadow-md">baby! </span>
        </h1>

        <div className="mt-8 md:mt-10 space-y-4">
          <p className="text-pink-100/90 text-lg md:text-2xl font-light italic leading-relaxed max-w-md mx-auto">
            When I think of you, baby, my heart flutters. Every moment we share builds a beautiful future.
          </p>
          <p className="text-pink-300 text-xs md:text-sm uppercase tracking-[0.4em] font-black animate-pulse">
            Forever & Always
          </p>
        </div>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="relative z-20 flex flex-col items-center w-full px-4 mb-8">
        <input
          onChange={handlechange}
          type="email"
          name="email"
          value={formData.email}
          placeholder="Enter your email"
          required
          className="h-14 w-full max-w-md mt-12 text-lg px-6 focus:ring-4 focus:ring-amber-400/50 outline-none border-2 border-amber-300 text-white bg-red-600/90 font-sans placeholder-red-200 rounded-2xl shadow-2xl transition-all"
        />

        <textarea
          name="reply"
          value={formData.reply}
          onChange={handlechange}
          placeholder="TYPE YOUR REPLY HERE..."
          required
          className="h-40 w-full max-w-md mt-6 text-lg p-6 focus:ring-4 focus:ring-amber-400/50 outline-none border-2 border-amber-300 text-white bg-red-600/90 font-sans placeholder-red-200 rounded-2xl shadow-2xl resize-none transition-all"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-10 w-full max-w-88 py-5 bg-[#ea1111] hover:bg-[#ff1f1f] text-white font-black border-4 border-[#fbbf24] rounded-2xl shadow-2xl active:scale-95 hover:scale-105 transition-all uppercase tracking-[0.2em] disabled:opacity-50"
        >
          {isSubmitting ? "SENDING..." : "SEND RESPONSE"}
        </button>
      </form>

      {/* Lottie Container - Fixed height prevents the footer/page from jumping when Lottie loads */}
      <div className="relative z-10 w-full flex justify-center -mt-12 md:-mt-24 pointer-events-none mb-16 min-h-75 md:min-h-112.5">
        {showLottie && (
          <div className="w-72 h-72 md:w-112.5 md:h-112.5 opacity-90 transition-opacity duration-1000">
            <DotLottieReact
              src="https://lottie.host/c7ab4a90-af37-4545-b1e4-1d3efb814c49/3xo4BPZIq9.lottie"
              loop={false}
              autoplay
            />
          </div>
        )}
      </div>
    </main>
  );
};

export default Love_response;