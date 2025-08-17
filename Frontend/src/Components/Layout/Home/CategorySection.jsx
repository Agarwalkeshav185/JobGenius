import React, { useEffect } from "react";
import CategoryCard from "../../Cards/CategoryCard";
import { fetchCategory } from "../../../api/Home/Categrory";

const CategorySection = () =>{
  const [categories, setCategories] = React.useState([]);

  useEffect(() => {
    try{
      const fetchCategories = async () => {
        const data = await fetchCategory();
        setCategories(data);
      };
      fetchCategories();
    }
    catch(error){
      console.log("Error fetching categories:", error);
    }
  }, []);

    return (
      <section className="py-12 relative overflow-hidden">
        {/* Glassy Layer Background */}
        <div className="absolute inset-0 bg-[#30968940] backdrop-blur-md rounded-xl z-0"></div>

        <div className="container relative z-10 mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-black">Browse by Category</h2>
          <p className="text-black text-center mb-12 max-w-3xl mx-auto">
            Easily explore jobs by the sector that inspires you.
          </p>
          {
            categories.length === 0 && (<p className="text-center text-black">No categories found.</p>)
          }
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category._id} icon={category.icon} title={category.name} count={category.jobCount} />
            ))}
            {/* <CategoryCard icon="hard-hat" title="Construction" count={1520} />
            <CategoryCard icon="hotel" title="Hotels & Tourism" count={1022} />
            <CategoryCard icon="graduation-cap" title="Education" count={1496} />
            <CategoryCard icon="dollar-sign" title="Financial Services" count={1529} />
            <CategoryCard icon="truck" title="Transport" count={1244} /> */}
          </div>
        </div>
      </section>
    )
}






export default CategorySection;