import { DB_ITEMS, DB_PROFILES, DB_TEMPLATES } from '../data/mockDb';
import { ProfileContextData, PortfolioItem, Profile, Template } from '../types';

// In-memory state initialized from mock data
// This allows the Admin Dashboard to modify data during the session
let itemsStore: PortfolioItem[] = [...DB_ITEMS];
let profilesStore: Profile[] = [...DB_PROFILES];
const templatesStore: Template[] = [...DB_TEMPLATES];

// --- PUBLIC VIEW LOGIC ---

/**
 * Simulates: SELECT * FROM Profiles WHERE slug_url = $slug
 */
export const getPortfolioBySlug = async (slug: string): Promise<ProfileContextData | null> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const profile = profilesStore.find(p => p.slugUrl === slug);
  if (!profile) return null;

  const template = templatesStore.find(t => t.id === profile.templateId);
  if (!template) throw new Error("Template configuration error");

  // Filter Items: Item must have at least one tag that matches the profile's allowed tags
  const items = itemsStore.filter(item => 
    item.tags.some(tag => profile.tagsFilter.includes(tag))
  );

  return {
    profile,
    template,
    items
  };
};

// --- ADMIN / CMS LOGIC ---

export const getAllItems = () => [...itemsStore];

export const getAllProfiles = () => [...profilesStore];

export const getAllTemplates = () => [...templatesStore];

export const createItem = async (newItem: Omit<PortfolioItem, 'id'>) => {
  const id = itemsStore.length > 0 ? Math.max(...itemsStore.map(i => i.id)) + 1 : 1;
  const item: PortfolioItem = { ...newItem, id };
  itemsStore = [item, ...itemsStore]; // Add to top
  return item;
};

export const createProfile = async (newProfile: Omit<Profile, 'id'>) => {
  const id = profilesStore.length > 0 ? Math.max(...profilesStore.map(p => p.id)) + 1 : 1;
  const profile: Profile = { ...newProfile, id };
  profilesStore = [...profilesStore, profile];
  return profile;
};

export const deleteItem = (id: number) => {
  itemsStore = itemsStore.filter(i => i.id !== id);
};

export const deleteProfile = (id: number) => {
    profilesStore = profilesStore.filter(p => p.id !== id);
};