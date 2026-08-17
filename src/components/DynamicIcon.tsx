import {
  Atom,
  Bot,
  Code,
  CreditCard,
  Cpu,
  Database,
  Figma,
  FileText,
  Flame,
  GitBranch,
  Globe,
  HelpCircle,
  Languages,
  Layers,
  Layout,
  Palette,
  Server,
  ShoppingBag,
  Sparkles,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react';

// Mapa explícito de los íconos referenciados por nombre en data.ts.
// Importar solo los que se usan mantiene el tree-shaking de lucide-react
// (importar todo el paquete metía ~1 MB extra al bundle).
const ICON_MAP: Record<string, LucideIcon> = {
  Atom,
  Bot,
  Code,
  CreditCard,
  Cpu,
  Database,
  Figma,
  FileText,
  Flame,
  GitBranch,
  Globe,
  Languages,
  Layers,
  Layout,
  Palette,
  ReactIcon: Atom,
  Server,
  ShoppingBag,
  Sparkles,
  Users,
  Zap,
};

export default function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICON_MAP[name] ?? HelpCircle;
  return <Icon className={className} aria-hidden="true" />;
}
