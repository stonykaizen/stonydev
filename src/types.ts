export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'frontend' | 'fullstack' | 'ecommerce' | 'design';
  tags: string[];
  image: string;
  details: string;
  features: string[];
  techStack: string[];
  duration: string;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  basePrice: number;
}

export interface TechItem {
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'mobile';
  iconName: string;
  level: number; // 0 to 100
  color: string; // Tailwind accent color
}

export interface CalculatorStep {
  id: string;
  title: string;
  description: string;
  options: {
    id: string;
    label: string;
    description: string;
    cost: number;
    icon: string;
  }[];
}
