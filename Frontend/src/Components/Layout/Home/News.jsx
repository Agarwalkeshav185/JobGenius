import react from "react";
import BlogCard from "../../Cards/BlogCard"
import { Link } from "react-router-dom"


const NewsSection = () => {
  return (
    <section className="py-12 container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">News and Blog</h2>
          <Link to="/blog" className="text-teal-500 hover:underline">
            View all
          </Link>
        </div>
        <p className="text-gray-500 mb-8">
          Morbi faucibus sed magna lectus feugiat tincidunt. Pharetra sed tincidunt in dolor
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <BlogCard
            image="/placeholder-blog.jpg"
            category="News"
            date="20 March 2024"
            title="Revitalizing Workplace Morale: Innovative Tactics For Boosting Employee Engagement In 2024"
          />

          <BlogCard
            image="/placeholder-blog.jpg"
            category="Tips"
            date="23 March 2024"
            title="How To Avoid The Top Six Most Common Job Interview Mistakes"
          />
        </div>
      </section>
  );
};

export default NewsSection;
