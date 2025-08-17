import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

function BlogCard({ image, category, date, title }) {
  return (
    <div className="border rounded-md overflow-hidden bg-white">
      <div className="relative">
        <img src={image || "/placeholder-blog.jpg"} alt={title} className="w-full h-48 object-cover" />
        <span className="absolute top-3 left-3 bg-teal-500 text-white text-xs px-2 py-1 rounded">{category}</span>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-500 mb-2">{date}</p>
        <h3 className="font-bold text-lg mb-4">{title}</h3>
        <Link to="/blog/post" className="text-teal-500 text-sm font-medium flex items-center">
          Read more
          <ArrowRight className="ml-1 h-3 w-3" />
        </Link>
      </div>
    </div>
  )
}

export default BlogCard
