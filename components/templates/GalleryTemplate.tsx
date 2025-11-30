import React from 'react';
import { ProfileContextData } from '../../types';
import { Camera, Instagram, Globe, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  data: ProfileContextData;
}

const GalleryTemplate: React.FC<Props> = ({ data }) => {
  const { profile, items } = data;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-serif">
      
      {/* Elegant Navbar */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 py-6">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center gap-6">
                <Link to="/" className="text-slate-400 hover:text-black transition-colors" title="Back to Hub">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div className="text-2xl tracking-widest font-light uppercase border-2 border-black px-4 py-1">
                    {profile.name}
                </div>
            </div>
            <div className="flex gap-4 text-slate-400">
                <Instagram className="w-5 h-5 hover:text-black cursor-pointer transition-colors" />
                <Globe className="w-5 h-5 hover:text-black cursor-pointer transition-colors" />
            </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Intro */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-slate-500 italic mb-4">A collection of moments</h2>
            <div className="w-12 h-1 bg-slate-200 mx-auto rounded-full"></div>
            
            <div className="flex justify-center gap-3 mt-6">
                {profile.tagsFilter.map(tag => (
                    <span key={tag} className="text-xs uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1 rounded-sm">
                        {tag}
                    </span>
                ))}
            </div>
        </div>

        {/* Masonry Grid Layout */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {items.map((item) => (
            <div key={item.id} className="break-inside-avoid group cursor-pointer">
              <div className="relative overflow-hidden bg-slate-100 shadow-sm hover:shadow-xl transition-shadow duration-500 ease-in-out">
                <img 
                    src={item.mediaUrl} 
                    alt={item.title} 
                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105" 
                />
                
                {/* Overlay only visible on hover */}
                <div className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-6">
                    <span className="text-slate-400 text-xs uppercase tracking-widest mb-2">{item.type}</span>
                    <h3 className="text-2xl font-normal text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600 italic font-sans max-w-xs">{item.description}</p>
                    <div className="mt-6 flex items-center gap-2 text-xs font-sans text-slate-400">
                        <Camera className="w-3 h-3" />
                        <span>{item.date}</span>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-slate-50 py-12 border-t border-slate-100 mt-12">
        <div className="text-center text-slate-400 text-sm font-sans">
            &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default GalleryTemplate;