import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Users, 
  Plus, 
  Trash2, 
  Save, 
  Image, 
  Tag, 
  FileText,
  LogOut,
  Monitor
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  getAllItems, 
  getAllProfiles, 
  getAllTemplates, 
  createItem, 
  createProfile, 
  deleteItem, 
  deleteProfile 
} from '../../services/controller';
import { PortfolioItem, Profile, Template } from '../../types';

// Tab definitions
type Tab = 'items' | 'profiles';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('items');
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);

  // Form States - Item
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemUrl, setNewItemUrl] = useState('https://picsum.photos/800/600?random=100');
  const [newItemType, setNewItemType] = useState<'code' | 'image' | 'blog'>('code');
  const [newItemTags, setNewItemTags] = useState('');

  // Form States - Profile
  const [newProfileName, setNewProfileName] = useState('');
  const [newProfileSlug, setNewProfileSlug] = useState('');
  const [newProfileTemplateId, setNewProfileTemplateId] = useState<number>(1);
  const [newProfileTags, setNewProfileTags] = useState('');

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setItems(getAllItems());
    setProfiles(getAllProfiles());
    setTemplates(getAllTemplates());
  };

  const handleCreateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = newItemTags.split(',').map(t => t.trim()).filter(t => t !== '');
    
    await createItem({
        title: newItemTitle,
        description: newItemDesc,
        mediaUrl: newItemUrl,
        type: newItemType,
        date: new Date().toISOString().split('T')[0],
        tags: tagsArray
    });

    // Reset Form
    setNewItemTitle('');
    setNewItemDesc('');
    setNewItemTags('');
    refreshData();
  };

  const handleDeleteItem = (id: number) => {
    if(window.confirm('Are you sure you want to delete this item?')) {
        deleteItem(id);
        refreshData();
    }
  };

  const handleCreateProfile = async (e: React.FormEvent) => {
      e.preventDefault();
      const tagsArray = newProfileTags.split(',').map(t => t.trim()).filter(t => t !== '');

      await createProfile({
          name: newProfileName,
          slugUrl: newProfileSlug.toLowerCase().replace(/\s+/g, '-'),
          templateId: Number(newProfileTemplateId),
          tagsFilter: tagsArray
      });

      setNewProfileName('');
      setNewProfileSlug('');
      setNewProfileTags('');
      refreshData();
  };

  const handleDeleteProfile = (id: number) => {
    if(window.confirm('Delete this profile?')) {
        deleteProfile(id);
        refreshData();
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col md:flex-row">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-slate-950 border-r border-slate-800 flex flex-col">
        <div className="p-6 border-b border-slate-800 flex items-center gap-2">
            <LayoutDashboard className="text-blue-500" />
            <h1 className="font-bold text-lg">Polymorph CMS</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
            <button 
                onClick={() => setActiveTab('items')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'items' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-900'}`}
            >
                <FolderOpen className="w-5 h-5" />
                Repository Items
            </button>
            <button 
                onClick={() => setActiveTab('profiles')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'profiles' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-900'}`}
            >
                <Users className="w-5 h-5" />
                Profiles & Views
            </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
            <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                <LogOut className="w-5 h-5" /> Exit to Frontend
            </Link>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 overflow-y-auto max-h-screen">
        
        {/* === ITEMS TAB === */}
        {activeTab === 'items' && (
            <div className="space-y-8 animate-in fade-in duration-300">
                <header className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold">Content Repository</h2>
                        <p className="text-slate-400">Manage global items. Tags determine visibility in profiles.</p>
                    </div>
                </header>

                {/* CREATE ITEM FORM */}
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                    <h3 className="font-bold mb-4 flex items-center gap-2"><Plus className="w-4 h-4" /> Add New Item</h3>
                    <form onSubmit={handleCreateItem} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-xs text-slate-400 mb-1">Title</label>
                            <input 
                                type="text" 
                                required
                                value={newItemTitle}
                                onChange={e => setNewItemTitle(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded p-2 focus:border-blue-500 focus:outline-none"
                                placeholder="Project Name"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-slate-400 mb-1">Type</label>
                            <select 
                                value={newItemType}
                                onChange={e => setNewItemType(e.target.value as any)}
                                className="w-full bg-slate-900 border border-slate-700 rounded p-2 focus:border-blue-500 focus:outline-none"
                            >
                                <option value="code">Code (Repository)</option>
                                <option value="image">Image (Photography)</option>
                                <option value="blog">Blog Post</option>
                            </select>
                        </div>
                        <div className="col-span-2">
                             <label className="block text-xs text-slate-400 mb-1">Description</label>
                             <textarea 
                                required
                                value={newItemDesc}
                                onChange={e => setNewItemDesc(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded p-2 focus:border-blue-500 focus:outline-none" 
                                rows={2}
                             />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                             <label className="block text-xs text-slate-400 mb-1">Media URL</label>
                             <input 
                                type="text"
                                value={newItemUrl}
                                onChange={e => setNewItemUrl(e.target.value)} 
                                className="w-full bg-slate-900 border border-slate-700 rounded p-2 focus:border-blue-500 focus:outline-none"
                             />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                             <label className="block text-xs text-slate-400 mb-1">Tags (Comma separated)</label>
                             <input 
                                type="text" 
                                placeholder="dev, react, frontend"
                                value={newItemTags}
                                onChange={e => setNewItemTags(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded p-2 focus:border-blue-500 focus:outline-none"
                             />
                        </div>
                        <div className="col-span-2">
                            <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2">
                                <Save className="w-4 h-4" /> Save Item to DB
                            </button>
                        </div>
                    </form>
                </div>

                {/* ITEMS LIST TABLE */}
                <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-950 text-slate-400">
                            <tr>
                                <th className="p-4">ID</th>
                                <th className="p-4">Preview</th>
                                <th className="p-4">Details</th>
                                <th className="p-4">Tags</th>
                                <th className="p-4">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                            {items.map(item => (
                                <tr key={item.id} className="hover:bg-slate-700/50">
                                    <td className="p-4 font-mono text-slate-500">#{item.id}</td>
                                    <td className="p-4">
                                        <div className="w-16 h-12 bg-slate-900 rounded overflow-hidden">
                                            <img src={item.mediaUrl} className="w-full h-full object-cover" alt="" />
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="font-bold">{item.title}</div>
                                        <div className="text-slate-400 text-xs truncate max-w-xs">{item.description}</div>
                                        <div className="text-xs mt-1 uppercase text-blue-400 font-bold">{item.type}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-wrap gap-1">
                                            {item.tags.map(tag => (
                                                <span key={tag} className="px-2 py-0.5 bg-slate-900 rounded text-xs border border-slate-700">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <button onClick={() => handleDeleteItem(item.id)} className="text-red-400 hover:text-red-300 p-2 hover:bg-red-900/20 rounded">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}

        {/* === PROFILES TAB === */}
        {activeTab === 'profiles' && (
            <div className="space-y-8 animate-in fade-in duration-300">
                 <header className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold">Profiles & Templates</h2>
                        <p className="text-slate-400">Create public views and assign templates/filters.</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* CREATE PROFILE */}
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 h-fit">
                        <h3 className="font-bold mb-4 flex items-center gap-2"><Plus className="w-4 h-4" /> Create Profile</h3>
                        <form onSubmit={handleCreateProfile} className="space-y-4">
                            <div>
                                <label className="block text-xs text-slate-400 mb-1">Public Name</label>
                                <input 
                                    type="text" 
                                    required
                                    placeholder="e.g. Game Developer"
                                    value={newProfileName}
                                    onChange={e => setNewProfileName(e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 focus:border-blue-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-slate-400 mb-1">URL Slug</label>
                                <div className="flex items-center">
                                    <span className="bg-slate-950 p-2 text-slate-500 border border-r-0 border-slate-700 rounded-l text-sm">/</span>
                                    <input 
                                        type="text" 
                                        required
                                        placeholder="game-dev"
                                        value={newProfileSlug}
                                        onChange={e => setNewProfileSlug(e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-r p-2 focus:border-blue-500 focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs text-slate-400 mb-1">Visual Template</label>
                                <select 
                                    value={newProfileTemplateId}
                                    onChange={e => setNewProfileTemplateId(Number(e.target.value))}
                                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 focus:border-blue-500 focus:outline-none"
                                >
                                    {templates.map(t => (
                                        <option key={t.id} value={t.id}>{t.nameInternal} ({t.componentName})</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs text-slate-400 mb-1">Filter Tags (Required to show items)</label>
                                <input 
                                    type="text" 
                                    placeholder="dev, game"
                                    value={newProfileTags}
                                    onChange={e => setNewProfileTags(e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 focus:border-blue-500 focus:outline-none"
                                />
                                <p className="text-[10px] text-slate-500 mt-1">Only items with these tags will appear in this profile.</p>
                            </div>
                            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded flex items-center justify-center gap-2">
                                <Save className="w-4 h-4" /> Create Profile
                            </button>
                        </form>
                    </div>

                    {/* PROFILE LIST */}
                    <div className="lg:col-span-2 space-y-4">
                        {profiles.map(profile => {
                            const template = templates.find(t => t.id === profile.templateId);
                            return (
                                <div key={profile.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="font-bold text-xl">{profile.name}</h3>
                                            <Link to={`/${profile.slugUrl}`} target="_blank" className="text-xs bg-slate-950 px-2 py-1 rounded text-blue-400 hover:text-blue-300 flex items-center gap-1">
                                                <Monitor className="w-3 h-3" /> /{profile.slugUrl}
                                            </Link>
                                        </div>
                                        <div className="text-sm text-slate-400 mb-4 flex items-center gap-2">
                                            <LayoutDashboard className="w-4 h-4" /> Template: <span className="text-white">{template?.nameInternal}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            {profile.tagsFilter.map(tag => (
                                                <span key={tag} className="text-xs bg-slate-700 px-2 py-1 rounded text-slate-300">
                                                    Tag: {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <button onClick={() => handleDeleteProfile(profile.id)} className="text-slate-500 hover:text-red-400 p-2">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        )}

      </main>
    </div>
  );
};

export default AdminDashboard;