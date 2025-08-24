export default function NewsBlog() {
  const blogPosts = [
    {
      category: "Career",
      title: "Mastering Workplace Mental: Executive Tactics For Boosting Employee Engagement in 2024",
      image: "/placeholder-uepi5.png",
      date: "March 15, 2024",
    },
    {
      category: "Tips",
      title: "How To Build The Top 10 Most Common Job Interview Mistakes",
      image: "/job-interview-preparation.png",
      date: "March 12, 2024",
    },
  ]

  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">News and Blog</h2>
          <p className="text-gray-600">Read our latest articles and stay updated with industry insights</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
                <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">{post.date}</span>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">Read More →</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
