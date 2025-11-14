import Stats3 from '../../../assets/About/stats3.webp';
import Stats4 from '../../../assets/About/Stats4.jpg';
import Stats2 from '../../../assets/About/Stats2.avif';

export default function Statistics() {
  const stats = [
    { number: "500+", label: "Quality Jobs" },
    { number: "30+", label: "Quality Companies" },
    { number: "15+", label: "Top Partners" },
  ]

  const features = [
    "We connect talented professionals with leading companies",
    "Our platform ensures quality matches for both employers and job seekers",
    "Dedicated support throughout your job search journey",
  ]

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-2 gap-4">
            <img src={Stats2} alt="Office 1" className="w-full h-48 object-cover rounded-lg" />
            <img src={Stats2} alt="Office 2" className="w-full h-48 object-cover rounded-lg" />
            <img src={Stats3} alt="Office 3" className="w-full h-48 object-cover rounded-lg" />
            <img src={Stats4} alt="Office 4" className="w-full h-48 object-cover rounded-lg" />
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">We're Only Working With The Best</h2>
            <p className="text-gray-600 mb-8">
              We partner with industry-leading companies to provide you with the best career opportunities and
              professional growth prospects.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-teal-500 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <svg
                    className="w-5 h-5 text-teal-500 mr-3 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
