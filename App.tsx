import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import PortfolioRenderer from './components/PortfolioRenderer';
import AdminDashboard from './components/admin/AdminDashboard';
import { DB_ITEMS } from './data/mockDb';
import { 
  Layers, 
  Code2, 
  PaintBucket, 
  Database, 
  LayoutTemplate, 
  Cpu,
  X,
  FileCode,
  Settings
} from 'lucide-react';

// Landing Page "Godot Style" - General View
const Home = () => {
  const [showDocs, setShowDocs] = useState(false);

  return (
    <div className="min-h-screen bg-[#202531] text-white font-sans selection:bg-[#478cbf] selection:text-white relative">
      
      {/* 1. Navbar Godot-style */}
      <nav className="border-b border-slate-700/50 bg-[#202531]/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-8 h-8 text-[#478cbf]" />
            <span className="text-xl font-bold tracking-tight">PolyMorph<span className="text-[#478cbf]">Engine</span></span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <button onClick={() => setShowDocs(true)} className="hover:text-[#478cbf] transition-colors">Architecture Docs</button>
            <a href="#showcase" className="hover:text-[#478cbf] transition-colors">Showcase</a>
            <Link to="/admin" className="flex items-center gap-1 hover:text-[#478cbf] transition-colors text-[#478cbf]">
               <Settings className="w-4 h-4" /> Admin Panel
            </Link>
          </div>
          <div className="flex gap-3">
             <Link to="/dev" className="text-sm font-medium px-4 py-2 rounded bg-[#333b4d] hover:bg-[#404a5f] transition-colors">
               Dev Profile
             </Link>
             <Link to="/photo" className="text-sm font-medium px-4 py-2 rounded bg-[#478cbf] hover:bg-[#5da2d5] transition-colors shadow-lg shadow-blue-900/20">
               Photo Profile
             </Link>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <header className="relative py-20 md:py-32 overflow-hidden">
        {/* Background Abstract decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-10 pointer-events-none">
            <div className="absolute top-10 right-10 w-64 h-64 bg-blue-500 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            The Dynamic Content <br />
            <span className="text-[#478cbf]">Architecture</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            A backend-agnostic portfolio solution. Manage your content in one central 
            database and render completely different visual experiences based on the user profile.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dev" className="w-full sm:w-auto px-8 py-4 bg-[#478cbf] hover:bg-[#5da2d5] rounded text-white font-bold text-lg transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2">
              <Code2 className="w-5 h-5" /> Launch Dev View
            </Link>
            <Link to="/photo" className="w-full sm:w-auto px-8 py-4 bg-[#333b4d] hover:bg-[#404a5f] rounded text-white font-bold text-lg transition-all flex items-center justify-center gap-2">
              <PaintBucket className="w-5 h-5" /> Launch Art View
            </Link>
          </div>
          
          <div className="mt-8 text-sm text-slate-500 flex items-center justify-center gap-6">
            <button onClick={() => setShowDocs(true)} className="flex items-center gap-1 hover:text-[#478cbf] transition-colors">
                <Database className="w-4 h-4" /> View SQL Schema
            </button>
            <span className="flex items-center gap-1"><LayoutTemplate className="w-4 h-4" /> Multi-Template System</span>
          </div>
        </div>
      </header>

      {/* 3. Features Grid (Architecture Explanation) */}
      <section className="bg-[#1b1f29] py-20 border-y border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div onClick={() => setShowDocs(true)} className="cursor-pointer p-6 bg-[#252b38] rounded-lg border border-slate-700/50 hover:border-[#478cbf] transition-colors group">
                <div className="w-12 h-12 bg-[#202531] rounded flex items-center justify-center mb-4 text-[#478cbf] group-hover:scale-110 transition-transform">
                  <Database className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Centralized Data</h3>
                <p className="text-slate-400 leading-relaxed">
                  Items are stored in a strict MySQL schema. Tags determine visibility. 
                  No frontend logic leaks into the database layer.
                </p>
              </div>
              <div className="p-6 bg-[#252b38] rounded-lg border border-slate-700/50 hover:border-[#478cbf] transition-colors group">
                <div className="w-12 h-12 bg-[#202531] rounded flex items-center justify-center mb-4 text-[#478cbf] group-hover:scale-110 transition-transform">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Logic Controller</h3>
                <p className="text-slate-400 leading-relaxed">
                  The PHP Controller intercepts the <code className="text-xs bg-black px-1 py-0.5 rounded text-green-400">/slug</code> route, 
                  fetches the profile configuration, and hydrates the view.
                </p>
              </div>
              <div className="p-6 bg-[#252b38] rounded-lg border border-slate-700/50 hover:border-[#478cbf] transition-colors group">
                <div className="w-12 h-12 bg-[#202531] rounded flex items-center justify-center mb-4 text-[#478cbf] group-hover:scale-110 transition-transform">
                  <LayoutTemplate className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Visual Polymorphism</h3>
                <p className="text-slate-400 leading-relaxed">
                  Templates are strictly separated. A "Dev" profile loads a Terminal CSS, 
                  while an "Artist" profile loads a Masonry Grid.
                </p>
              </div>
           </div>
        </div>
      </section>

      {/* 4. "The Repository" - Showing ALL items (TODO list view) */}
      <section id="showcase" className="py-20 max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Global Repository</h2>
            <p className="text-slate-400">Raw view of all {DB_ITEMS.length} items in the database.</p>
          </div>
          <button onClick={() => setShowDocs(true)} className="px-4 py-2 text-sm border border-slate-600 rounded hover:bg-white/5 transition-colors">
            View JSON Schema
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DB_ITEMS.map((item) => (
            <div key={item.id} className="bg-[#252b38] rounded-lg overflow-hidden border border-slate-700/50 hover:shadow-2xl transition-all hover:-translate-y-1 group">
              {/* Image generic view */}
              <div className="h-48 overflow-hidden relative">
                 <img src={item.mediaUrl} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                 <div className="absolute top-2 right-2 bg-black/70 backdrop-blur px-2 py-1 text-xs uppercase font-bold rounded text-white border border-white/10">
                   {item.type}
                 </div>
              </div>
              
              <div className="p-5">
                <div className="flex gap-2 mb-3">
                  {item.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#333b4d] text-slate-300 border border-slate-600/50">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-[#478cbf] transition-colors">{item.title}</h3>
                <p className="text-sm text-slate-400 mb-4 line-clamp-2">{item.description}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-700/50 text-xs text-slate-500">
                  <span>ID: #{item.id.toString().padStart(4, '0')}</span>
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
             <Link to="/admin" className="px-6 py-3 bg-[#333b4d] hover:bg-[#404a5f] rounded text-sm font-bold transition-colors">
               Manage Database in CMS
             </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#161920] py-12 border-t border-slate-800">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
               <div className="flex items-center gap-2 mb-4">
                  <Layers className="w-6 h-6 text-[#478cbf]" />
                  <span className="text-lg font-bold">PolyMorph Engine</span>
               </div>
               <p className="text-slate-500 text-sm max-w-xs">
                 An educational architecture project demonstrating strict separation of content and presentation logic using a mock-backend approach.
               </p>
            </div>
            <div>
               <h4 className="font-bold mb-4">Profiles</h4>
               <ul className="space-y-2 text-sm text-slate-400">
                  <li><Link to="/dev" className="hover:text-white">Developer (Terminal)</Link></li>
                  <li><Link to="/photo" className="hover:text-white">Photographer (Gallery)</Link></li>
               </ul>
            </div>
            <div>
               <h4 className="font-bold mb-4">Resources</h4>
               <ul className="space-y-2 text-sm text-slate-400">
                  <li><button onClick={() => setShowDocs(true)} className="hover:text-white">System Architecture</button></li>
                  <li><button onClick={() => setShowDocs(true)} className="hover:text-white">SQL Schema</button></li>
               </ul>
            </div>
         </div>
         <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-800 text-center text-slate-600 text-xs">
            © {new Date().getFullYear()} PolyMorph Architecture. Inspired by CMS versatility.
         </div>
      </footer>

      {/* DOCUMENTATION MODAL */}
      {showDocs && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={() => setShowDocs(false)} />
            <div className="bg-[#1b1f29] w-full max-w-4xl rounded-xl border border-slate-700 shadow-2xl relative z-10 flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-5 border-b border-slate-700 bg-[#202531]">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <Database className="w-5 h-5 text-[#478cbf]" /> 
                        System Architecture & SQL Schema
                    </h3>
                    <button onClick={() => setShowDocs(false)} className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                
                <div className="p-6 overflow-y-auto space-y-8 font-mono text-sm">
                    {/* SECTION 1: DATABASE */}
                    <div>
                        <div className="flex items-center gap-2 mb-3 text-[#478cbf]">
                             <FileCode className="w-4 h-4" />
                             <span className="font-bold uppercase tracking-wider">01_Schema.sql</span>
                        </div>
                        <div className="bg-black/50 p-4 rounded border border-slate-700 text-slate-300 overflow-x-auto">
<pre className="whitespace-pre-wrap">{`-- 1. ITEMS (Core Content Repository)
CREATE TABLE items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    media_url VARCHAR(255),
    tipo_contenido ENUM('code', 'image', 'blog'),
    fecha_creacion DATE,
    tags JSON -- Stores ["dev", "python", "photo"]
);

-- 2. PLANTILLAS (Visual Themes / View Controllers)
CREATE TABLE plantillas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_interno VARCHAR(50), -- e.g. "Terminal Theme"
    archivo_php VARCHAR(50)     -- e.g. "terminal.php"
);

-- 3. PERFILES (Public Entry Points)
CREATE TABLE perfiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),       -- e.g. "Backend Dev"
    slug_url VARCHAR(50) UNIQUE, -- e.g. "dev"
    plantilla_id INT,
    tags_filter JSON,          -- e.g. ["dev", "backend"]
    FOREIGN KEY (plantilla_id) REFERENCES plantillas(id)
);`}</pre>
                        </div>
                    </div>

                    {/* SECTION 2: ROUTER */}
                    <div>
                        <div className="flex items-center gap-2 mb-3 text-green-400">
                             <Cpu className="w-4 h-4" />
                             <span className="font-bold uppercase tracking-wider">02_Router_Logic.php</span>
                        </div>
                        <div className="bg-black/50 p-4 rounded border border-slate-700 text-slate-300 overflow-x-auto">
<pre className="whitespace-pre-wrap">{`// index.php (Simplified Controller Logic)

$slug = $_GET['slug'] ?? 'home';

// 1. Fetch Profile Configuration
$profile = $db->query("SELECT * FROM perfiles WHERE slug_url = ?", [$slug]);

if (!$profile) {
    show404();
}

// 2. Fetch Assigned Template
$template = $db->query("SELECT * FROM plantillas WHERE id = ?", [$profile['plantilla_id']]);

// 3. Filter Content (The "Polymorph" step)
// We only fetch items that match the profile's allowed tags
$allowed_tags = json_decode($profile['tags_filter']);
$items = $db->query("SELECT * FROM items WHERE JSON_OVERLAPS(tags, ?)", [$allowed_tags]);

// 4. Render View
// The data is passed to the specific visual template
include "templates/" . $template['archivo_php'];`}</pre>
                        </div>
                    </div>
                </div>
                
                <div className="p-4 border-t border-slate-700 bg-[#202531] text-xs text-slate-500 text-center">
                    This React application simulates the above server-side behavior using a Client-Side Controller pattern.
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        {/* The Magic Route: Matches /dev or /photo */}
        <Route path="/:slug" element={<PortfolioRenderer />} />
      </Routes>
    </HashRouter>
  );
};

export default App;