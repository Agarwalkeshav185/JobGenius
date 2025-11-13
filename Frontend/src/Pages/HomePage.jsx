import TestimonialCard from "../Components/Cards/TestimonialCard"

import HeroSection from "../Components/Layout/Home/HeroSection.jsx"
import CategorySection from "../Components/Layout/Home/CategorySection";
import RecentJobsSection from "../Components/Layout/Home/RecentJobsSection.jsx";
import NewsSection from "../Components/Layout/Home/News.jsx";
import GoodLifeSection from '../Components/Layout/Home/GoodLifeSection.jsx';
import CreateBetterFuture from "../Components/Layout/Home/CreateBetterFuture.jsx";

function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <RecentJobsSection />
      <CategorySection />
      <GoodLifeSection />
      <CreateBetterFuture />

      

      {/* Testimonials Section */}

      <section className="py-16 relative overflow-hidden bg-white">
        {/* Glassy overlay with 40% opacity teal */}
        <div className="absolute inset-0 bg-[#30968940] backdrop-blur-md rounded-xl z-0 border border-[#30968922] shadow-inner"></div>

        <div className="container relative z-10 mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Testimonials from Our Customers</h2>
          <p className="text-gray-600 text-center mb-12">
            At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementum...
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <TestimonialCard
              name="Marco Kim"
              role="Happy Client"
              avatar="/placeholder-avatar.jpg"
              rating={5}
              testimonial="Amazing services"
              content="Morbi faucibus sed magna lectus feugiat tincidunt. Etiam sed tincidunt in dolor. Mea etiam et vestibulum elementis. Max etiam et vestibulum elementis"
            />

            <TestimonialCard
              name="Kristin Hexter"
              role="Happy Client"
              avatar="/placeholder-avatar.jpg"
              rating={5}
              testimonial="Everything simple"
              content="Max etiam et vestibulum elementis viverra aliquor faucibus. Vestibulum ullamcorper aliquor faucibus"
            />

            <TestimonialCard
              name="Zion Clemens"
              role="Happy Client"
              avatar="/placeholder-avatar.jpg"
              rating={5}
              testimonial="Awesome, thank you!"
              content="Pharetra and tincidunt in dolor. Max etiam et vestibulum elementis viverra aliquor faucibus. Nulla et aliquor maximus"
            />
          </div>
        </div>
      </section>
      {/* News and Blog Section */}
      {/* <NewsSection /> */}      
    </main>
  )
}

export default HomePage
