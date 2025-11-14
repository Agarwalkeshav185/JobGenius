import Stats2 from '../../../assets/About/stats2.avif'
export default function HeroSection() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Building a Better Future for Job Seekers and Employers</h1>
            <p className="text-lg text-gray-600 leading-relaxed text-justify">
              At JobGenius, we aim to simplify the hiring process by connecting skilled candidates with the right opportunities. Our platform provides trusted job listings, powerful search tools, and a seamless application experience. Whether you're looking to start your career or hire top talent, we make the journey easier, faster, and more effective.
            </p>
          </div>
          <div className="relative">
            <img
              src={Stats2}
              alt="Office workspace"
              className="w-full h-80 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
