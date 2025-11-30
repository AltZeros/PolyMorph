// Simulates the 'Items' table entities
export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  mediaUrl: string;
  type: 'code' | 'image' | 'blog';
  date: string;
  tags: string[]; // stored as JSON in DB, array here
}

// Simulates the 'Templates' table entities
export interface Template {
  id: number;
  nameInternal: string;
  componentName: 'terminal' | 'gallery'; // Maps to PHP file concept
}

// Simulates the 'Profiles' table entities
export interface Profile {
  id: number;
  name: string;
  slugUrl: string;
  templateId: number;
  tagsFilter: string[]; // The logic for filtering items
}

// Combined type for the view
export interface ProfileContextData {
  profile: Profile;
  template: Template;
  items: PortfolioItem[];
}
