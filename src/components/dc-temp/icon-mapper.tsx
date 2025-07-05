import {
  DollarSign,
  Users,
  Target,
  TrendingUp,
  Briefcase,
  Package,
  BarChart,
  User,
  FileText,
  CheckCircle,
  Clock,
  Menu,
  X,
  ChevronRight,
  ChevronLeft
} from "lucide-react"

export const iconMap = {
  DollarSign,
  Users,
  Target,
  TrendingUp,
  Briefcase,
  Package,
  BarChart,
  User,
  FileText,
  CheckCircle,
  Clock,
  Menu,
  X,
  ChevronRight,
  ChevronLeft
} as const

export type IconName = keyof typeof iconMap

export function getIcon(iconName: IconName) {
  return iconMap[iconName]
}
