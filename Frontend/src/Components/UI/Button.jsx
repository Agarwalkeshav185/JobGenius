import * as React from "react"

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "default":
        return "bg-green-600 text-white hover:bg-green-700"
      case "destructive":
        return "bg-red-500 text-white hover:bg-red-600"
      case "outline":
        return "border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-900"
      case "secondary":
        return "bg-gray-200 text-gray-900 hover:bg-gray-300"
      case "ghost":
        return "bg-transparent hover:bg-gray-100 text-gray-900"
      case "link":
        return "bg-transparent text-green-600 hover:underline"
      default:
        return "bg-green-600 text-white hover:bg-green-700"
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case "default":
        return "h-10 px-4 py-2"
      case "sm":
        return "h-8 px-3 text-sm"
      case "lg":
        return "h-12 px-6 text-lg"
      case "icon":
        return "h-10 w-10"
      default:
        return "h-10 px-4 py-2"
    }
  }

  return (
    <button
      className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${getVariantClasses()} ${getSizeClasses()} ${className}`}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }
