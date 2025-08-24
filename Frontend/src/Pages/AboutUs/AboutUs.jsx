
import HeroSection from "../../Components/Layout/AboutUs/hero-section.jsx";
import HowItWorks from "../../Components/Layout/AboutUs/how-it-works.jsx"
import VideoSection from "../../Components/Layout/AboutUs/video-section.jsx"
import FAQ from "../../Components/Layout/AboutUs/faq.jsx"
import Statistics from "../../Components/Layout/AboutUs/statistics.jsx"
import NewsBlog from "../../Components/Layout/AboutUs/news-blog.jsx"


export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-black text-white py-12 text-center">
          <h1 className="text-4xl font-bold">About Us</h1>
      </div>
      <HeroSection />
      <HowItWorks />
      <VideoSection />
      <FAQ />
      <Statistics />
      <NewsBlog />
    </div>
  )
}
