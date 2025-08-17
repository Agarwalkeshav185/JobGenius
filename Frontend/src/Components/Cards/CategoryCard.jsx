import { TreesIcon as Plant, Target, ShoppingBag, HardHat, Hotel, GraduationCap, DollarSign, Truck } from "lucide-react"

function CategoryCard({ icon, title, count }) {
  const getIcon = () => {
    switch (icon) {
      case "plant":
        return <Plant className="h-6 w-6 text-teal-500" />
      case "target":
        return <Target className="h-6 w-6 text-teal-500" />
      case "shopping-bag":
        return <ShoppingBag className="h-6 w-6 text-teal-500" />
      case "hard-hat":
        return <HardHat className="h-6 w-6 text-teal-500" />
      case "hotel":
        return <Hotel className="h-6 w-6 text-teal-500" />
      case "graduation-cap":
        return <GraduationCap className="h-6 w-6 text-teal-500" />
      case "dollar-sign":
        return <DollarSign className="h-6 w-6 text-teal-500" />
      case "truck":
        return <Truck className="h-6 w-6 text-teal-500" />
      default:
        return <ShoppingBag className="h-6 w-6 text-teal-500" />
    }
  }

  return (
    <div className="border rounded-md hover:shadow-md transition-shadow bg-white">
      <div className="p-8 flex flex-col items-center text-center">
        <div className="border border-teal-100 rounded-full p-4 mb-4">{getIcon()}</div>
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <span className="bg-teal-50 text-teal-600 text-sm px-3 py-1 rounded-full">{count} jobs</span>
      </div>
    </div>
  )
}

export default CategoryCard
