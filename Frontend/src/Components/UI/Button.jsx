import * as React from "react"

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "default":
        return "bg-teal-500 text-white hover:bg-teal-600"  // Changed to teal
      case "destructive":
        return "bg-red-500 text-white hover:bg-red-600"
      case "outline":
        return "border border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 text-gray-700"  // Better outline
      case "secondary":
        return "bg-gray-200 text-gray-900 hover:bg-gray-300"
      case "ghost":
        return "bg-transparent hover:bg-gray-100 text-gray-900"
      case "link":
        return "bg-transparent text-teal-600 hover:text-teal-700 hover:underline"  // Changed to teal
      case "teal": // New teal variant
        return "bg-teal-500 text-white hover:bg-teal-600 border-teal-500"
      case "teal-outline": // New teal outline variant
        return "border border-teal-300 bg-white hover:bg-teal-50 hover:border-teal-400 text-teal-700"
      default:
        return "bg-teal-500 text-white hover:bg-teal-600"  // Default to teal
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case "default":
        return "h-10 px-4 py-2 text-sm font-medium"  // Added font-medium
      case "sm":
        return "h-8 px-3 py-1 text-sm font-medium"   // Added font-medium
      case "lg":
        return "h-12 px-6 py-3 text-lg font-medium"  // Added font-medium
      case "icon":
        return "h-10 w-10 p-0"  // Better icon button
      case "pagination": // New size for pagination
        return "h-9 px-3 py-2 text-sm font-medium"
      default:
        return "h-10 px-4 py-2 text-sm font-medium"
    }
  }

  return (
    <button
      className={`inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed ${getVariantClasses()} ${getSizeClasses()} ${className}`}  
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }
