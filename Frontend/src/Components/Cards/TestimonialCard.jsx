import { Star } from "lucide-react"

function TestimonialCard({ name, role, avatar, rating, testimonial, content }) {
  return (
    <div className="border rounded-md overflow-hidden bg-white">
      <div className="p-6">
        <div className="flex mb-4">
          {Array(rating)
            .fill(0)
            .map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ))}
        </div>

        <h3 className="font-bold text-lg mb-2">{testimonial}</h3>
        <p className="text-gray-600 text-sm mb-6">{content}</p>

        <div className="flex items-center gap-3">
          <img src={avatar || "/placeholder-avatar.jpg"} alt={name} className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-sm text-gray-500">{role}</p>
          </div>
          <div className="ml-auto text-teal-500 text-4xl font-serif">"</div>
        </div>
      </div>
    </div>
  )
}

export default TestimonialCard
