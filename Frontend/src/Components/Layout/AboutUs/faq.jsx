"use client"

import { useState } from "react"

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "Can I upload a CV?",
      answer:
        "Yes, you can upload your CV in PDF, DOC, or DOCX format. Our system will automatically parse your information and create a professional profile.",
    },
    {
      question: "How long will the recruitment process take?",
      answer:
        "The recruitment process typically takes 2-4 weeks depending on the position and company requirements. We'll keep you updated throughout the entire process.",
    },
    {
      question: "Do you recruit for freelancers, Apprentices and Graduates?",
      answer:
        "Yes, we work with companies that hire freelancers, apprentices, and graduates. We have opportunities for all career levels and employment types.",
    },
    {
      question: "What does the recruitment and selection process involve?",
      answer:
        "Our process includes initial screening, skills assessment, interviews with our team and the client company, and final placement. We guide you through each step.",
    },
    {
      question: "Can I request notification for jobs I have that may interest me?",
      answer:
        "You can set up job alerts based on your preferences including location, salary, job type, and industry. You'll receive notifications when matching jobs are posted.",
    },
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600">Find answers to common questions about our services</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform ${openIndex === index ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 ml-11">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
