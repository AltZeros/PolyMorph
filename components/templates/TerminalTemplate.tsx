import React from 'react';
import { ProfileContextData } from '../../types';
import { Terminal, Code, Cpu, Calendar, ChevronRight, Power } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  data: ProfileContextData;
}

const TerminalTemplate: React.FC<Props> = ({ data }) => {
  const { profile, items } = data;

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-4 md:p-8 selection:bg-green-900 selection:text-white">
      {/* CRT Scanline Effect Overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20"></div>

      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        
        {/* Header */}
        <header className="border-b-2 border-green-700 pb-6 mb-8 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
                <Terminal className="w-8 h-8 animate-pulse" />
                <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-widest text-green-400">
                {profile.name}_
                </h1>
            </div>
            <p className="opacity-80 ml-1">
                <span className="text-green-700">usr@system:~$</span> ./load_portfolio.sh --filter="{profile.tagsFilter.join(',')}"
            </p>
          </div>
          
          <Link to="/" className="group flex items-center gap-2 border border-green-800 hover:bg-green-900/40 px-4 py-2 text-xs uppercase tracking-widest transition-colors">
            <Power className="w-4 h-4 group-hover:text-red-500 transition-colors" />
            <span>sys_exit</span>
          </Link>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
           <div className="border border-green-800 bg-gray-900/50 p-4">
              <div className="text-xs uppercase text-green-700 mb-1">Total_Modules</div>
              <div className="text-2xl font-bold">{items.length}</div>
           </div>
           <div className="border border-green-800 bg-gray-900/50 p-4">
              <div className="text-xs uppercase text-green-700 mb-1">System_Status</div>
              <div className="text-2xl font-bold text-green-400">ONLINE</div>
           </div>
           <div className="border border-green-800 bg-gray-900/50 p-4">
              <div className="text-xs uppercase text-green-700 mb-1">Last_Login</div>
              <div className="text-2xl font-bold">{new Date().toLocaleDateString()}</div>
           </div>
        </div>

        {/* Projects List */}
        <div className="space-y-6">
          <h2 className="text-xl border-b border-green-800 pb-2 flex items-center gap-2">
            <ChevronRight className="w-5 h-5" /> REPOSITORIES
          </h2>

          <div className="grid grid-cols-1 gap-6">
            {items.map((item) => (
              <div 
                key={item.id} 
                className="group relative border border-green-800 bg-black hover:bg-green-900/10 transition-colors p-4 md:flex gap-6"
              >
                {/* Decorative corner brackets */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-green-500 opacity-50"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-green-500 opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-green-500 opacity-50"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-green-500 opacity-50"></div>

                <div className="w-full md:w-48 h-32 shrink-0 bg-green-900/20 border border-green-800 mb-4 md:mb-0 overflow-hidden">
                    <img src={item.mediaUrl} alt={item.title} className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-green-300 group-hover:text-green-100">{item.title}</h3>
                    <span className="text-xs border border-green-800 px-2 py-1 bg-green-900/30 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {item.date}
                    </span>
                  </div>
                  
                  <p className="text-green-600/90 mb-4 font-light leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-0.5 bg-green-900/40 text-green-400 border border-green-800/50">
                        #{tag}
                      </span>
                    ))}
                    {item.type === 'code' && (
                        <span className="ml-auto text-xs flex items-center gap-1 text-green-500">
                            <Code className="w-3 h-3" /> SOURCE
                        </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <footer className="pt-12 pb-6 text-center text-green-800 text-xs">
          <p>SYSTEM_ID: {profile.id} // TERMINAL_V_1.0.4</p>
        </footer>
      </div>
    </div>
  );
};

export default TerminalTemplate;