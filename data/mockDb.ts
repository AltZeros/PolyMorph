import { PortfolioItem, Profile, Template } from '../types';

// TABLE: ITEMS
export const DB_ITEMS: PortfolioItem[] = [
  {
    id: 1,
    title: "Neural Network Optimizer",
    description: "A Python library for optimizing hyper-parameters in deep learning models using genetic algorithms.",
    mediaUrl: "https://picsum.photos/800/600?random=1",
    type: "code",
    date: "2023-10-15",
    tags: ["dev", "python", "ai"]
  },
  {
    id: 2,
    title: "Misty Mountains",
    description: "Long exposure photography taken during a hike in the Swiss Alps.",
    mediaUrl: "https://picsum.photos/600/800?random=2",
    type: "image",
    date: "2023-09-20",
    tags: ["photo", "nature", "landscape"]
  },
  {
    id: 3,
    title: "E-Commerce Microservices",
    description: "Full-stack architecture using Go, Docker, and Kubernetes for high-scale retail.",
    mediaUrl: "https://picsum.photos/800/600?random=3",
    type: "code",
    date: "2023-11-05",
    tags: ["dev", "go", "backend"]
  },
  {
    id: 4,
    title: "Urban Isolation",
    description: "Street photography series capturing the solitude of modern cities.",
    mediaUrl: "https://picsum.photos/600/600?random=4",
    type: "image",
    date: "2023-12-01",
    tags: ["photo", "urban", "bnw"]
  },
  {
    id: 5,
    title: "React Dashboard",
    description: "A highly performant admin dashboard template built with React and Tailwind.",
    mediaUrl: "https://picsum.photos/800/500?random=5",
    type: "code",
    date: "2024-01-10",
    tags: ["dev", "react", "frontend"]
  },
  {
    id: 6,
    title: "Golden Hour at Coast",
    description: "Capturing the perfect light reflection on the ocean surface.",
    mediaUrl: "https://picsum.photos/600/900?random=6",
    type: "image",
    date: "2024-02-14",
    tags: ["photo", "nature", "water"]
  }
];

// TABLE: TEMPLATES
export const DB_TEMPLATES: Template[] = [
  {
    id: 1,
    nameInternal: "Terminal System",
    componentName: "terminal"
  },
  {
    id: 2,
    nameInternal: "Elegant Gallery",
    componentName: "gallery"
  }
];

// TABLE: PROFILES
export const DB_PROFILES: Profile[] = [
  {
    id: 1,
    name: "FullStack Engineer",
    slugUrl: "dev",
    templateId: 1, // Uses Terminal
    tagsFilter: ["dev"] // Shows items with 'dev' tag
  },
  {
    id: 2,
    name: "Visual Artist",
    slugUrl: "photo",
    templateId: 2, // Uses Gallery
    tagsFilter: ["photo"] // Shows items with 'photo' tag
  }
];
