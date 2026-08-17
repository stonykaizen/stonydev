export type ProjectCategory = 'frontend' | 'fullstack' | 'ecommerce' | 'design';

// Objetivo de negocio del proyecto — es lo que filtra el visitante PyME,
// que piensa en "quiero reservas" antes que en "quiero un fullstack".
export type ProjectGoal = 'reservas' | 'catalogo' | 'leads';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  goal: ProjectGoal;
  tags: string[];
  image: string;
  details: string;
  features: string[];
  techStack: string[];
  duration: string;
  demoUrl?: string;
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
