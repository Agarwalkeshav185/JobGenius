import React from "react";
import TestimonialCard from "../../Cards/TestimonialCard"

export default function Testimonials() {
  return (
    <section className="py-16 relative overflow-hidden bg-white rounded-xl">
      {/* glassy overlay */}
      <div className="absolute inset-0 bg-[#30968940] backdrop-blur-md rounded-xl z-0 border border-[#30968922]" />

      <div className="container relative z-10 mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
          Testimonials from Our Customers
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Hear what professionals from different fields say about their experience with our platform and how it helped them grow in their careers.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <TestimonialCard
            name="Aarav Mehta"
            role="Full-stack Developer"
            avatar="/placeholder-avatar.jpg"
            rating={5}
            testimonial="Outstanding Support & Guidance"
            content="The team provided incredible guidance through my job search. The platform made it simple to connect with top employers, and I landed my dream role within weeks."
          />

          <TestimonialCard
            name="Priya Sharma"
            role="UI/UX Designer"
            avatar="/placeholder-avatar.jpg"
            rating={5}
            testimonial="Smooth and Simple Experience"
            content="Finding the right opportunity was effortless. The UI is clean and recommendations were accurate. Support was always available when I needed help."
          />

          <TestimonialCard
            name="Rohit Khanna"
            role="Product Manager"
            avatar="/placeholder-avatar.jpg"
            rating={4}
            testimonial="Professional and Reliable Platform"
            content="This platform stands out. The process is transparent, job listings are genuine, and everything felt professional from start to finish."
          />
        </div>
      </div>
    </section>
  );
}