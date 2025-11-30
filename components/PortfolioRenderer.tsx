import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPortfolioBySlug } from '../services/controller';
import { ProfileContextData } from '../types';
import TerminalTemplate from './templates/TerminalTemplate';
import GalleryTemplate from './templates/GalleryTemplate';
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react';

const PortfolioRenderer: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<ProfileContextData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset state when slug changes
    setData(null);
    setLoading(true);
    setError(null);

    if (slug) {
      getPortfolioBySlug(slug)
        .then((result) => {
          if (result) {
            setData(result);
          } else {
            setError("Profile not found");
          }
        })
        .catch((err) => {
          setError("System error: Failed to load template");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-400">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="font-mono text-sm">Loading modules...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-red-800 p-6">
        <AlertCircle className="w-16 h-16 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Error 404</h1>
        <p className="mb-6">{error || "This profile does not exist."}</p>
        <Link to="/" className="px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg transition-colors flex items-center gap-2">
           <ArrowLeft className="w-4 h-4" /> Return to Hub
        </Link>
      </div>
    );
  }

  // THE MAGIC: Dynamic Template Switching
  // This simulates the PHP `include($template_file)` logic
  switch (data.template.componentName) {
    case 'terminal':
      return <TerminalTemplate data={data} />;
    case 'gallery':
      return <GalleryTemplate data={data} />;
    default:
      return <div>Template not implemented</div>;
  }
};

export default PortfolioRenderer;
