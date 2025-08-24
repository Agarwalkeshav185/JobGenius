export default function HeroSection() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Et nunc ut tempus duis nisi sed massa</h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum
              tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas
              semper.
            </p>
          </div>
          <div className="relative">
            <img
              src="/modern-office-workspace-blurred.png"
              alt="Office workspace"
              className="w-full h-80 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
