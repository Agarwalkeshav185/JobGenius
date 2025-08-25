import React, { useState, useEffect } from "react";
import CategoryCard from "../../Cards/CategoryCard";
import { fetchCategory } from "../../../api/Home/Categrory";

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [categoryPage, setCategoryPage] = useState(1);
  const [categoryLimit, setCategoryLimit] = useState(8);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await fetchCategory(categoryPage, categoryLimit);
        console.log("Received data:", data); // Debug log
        
        // Handle different response structures
        if (data && data.success && Array.isArray(data.data)) {
          setCategories(data.data);
        } else if (data && Array.isArray(data)) {
          setCategories(data);
        } else {
          setCategories([]);
          console.warn("Unexpected data structure:", data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]); // Ensure categories is always an array
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategories();
  }, [categoryPage, categoryLimit]); // Added dependencies

  if (loading) return (
    <section className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#30968940] backdrop-blur-md rounded-xl z-0"></div>
      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center">Loading categories...</div>
      </div>
    </section>
  );

  if (error) return (
    <section className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#30968940] backdrop-blur-md rounded-xl z-0"></div>
      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center text-red-600">Error: {error}</div>
      </div>
    </section>
  );

  return (
    <section className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#30968940] backdrop-blur-md rounded-xl z-0"></div>

      <div className="container relative z-10 mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-black">Browse by Category</h2>
        <p className="text-black text-center mb-12 max-w-3xl mx-auto">
          Easily explore jobs by the sector that inspires you.
        </p>
        
        {categories.length === 0 && (
          <p className="text-center text-black">No categories found.</p>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard 
              key={category._id} 
              icon={category.icon} 
              title={category.name} 
              count={category.jobCount} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;