import react from 'react';
import HeroSection from "../Components/Layout/Home/HeroSection.jsx"
import CategorySection from "../Components/Layout/Home/CategorySection";
import RecentJobsSection from "../Components/Layout/Home/RecentJobsSection.jsx";
import NewsSection from "../Components/Layout/Home/News.jsx";
import GoodLifeSection from '../Components/Layout/Home/GoodLifeSection.jsx';
import CreateBetterFuture from "../Components/Layout/Home/CreateBetterFuture.jsx";
import Testimonials from '../Components/Layout/Home/Testimonials.jsx';

function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <RecentJobsSection />
      <CategorySection />
      <GoodLifeSection />
      <CreateBetterFuture />
      <Testimonials />
      {/* News and Blog Section */}
      {/* <NewsSection /> */}      
    </main>
  )
}

export default HomePage
