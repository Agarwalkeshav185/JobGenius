export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Create Account",
      description: "Create your account to get started with our platform",
    },
    {
      number: "02",
      title: "Upload Resume",
      description: "Upload your resume and let employers find you",
    },
    {
      number: "03",
      title: "Find Job",
      description: "Browse through thousands of job opportunities",
    },
    {
      number: "04",
      title: "Apply Job",
      description: "Apply to jobs that match your skills and interests",
    },
  ]

  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How it works</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Get started with our simple 4-step process to find your dream job
        </p>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
