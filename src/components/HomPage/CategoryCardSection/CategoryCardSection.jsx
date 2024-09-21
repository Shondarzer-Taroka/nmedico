// import CategoryCard from '@/components/CategoryCard/CategoryCard';
// import axios from 'axios';
// import React from 'react';

// const getData = async () => {
//     try {
//         let result = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/category/api`)
//         return result.data
//     } catch (error) {
// console.log(error);

//     }
// }
// const CategoryCardSection = async () => {
//     let getCategory = await getData()
//     // console.log(getCategory);

//     return (
//         <div className='mt-7'>
//             <h1 className='font-bold text-2xl'> Categroy card section</h1>
//             <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
//                 {getCategory && getCategory.length > 0 && getCategory.map(category => <CategoryCard key={category._id} imageUrl={category.imageUrl} categoryName={category._id} medicineCount={category.count} />)}
//             </div>
//         </div>
//     );
// };

// export default CategoryCardSection;













import CategoryCard from '@/components/CategoryCard/CategoryCard';
import axios from 'axios';
import React from 'react';

// Data fetching function with no-store cache policy
const getData = async () => {
  try {
    const result = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/category/api`, {
      headers: {
        'Cache-Control': 'no-store', // Prevent caching
      },
    });
    return result.data;
  } catch (error) {
    console.error('Error fetching category data:', error);
    return []; // Return an empty array if there's an error
  }
};

// Server Component
const CategoryCardSection = async () => {
  const getCategory = await getData();

  return (
    <div className="mt-7">
      <h1 className="font-bold text-2xl">Category card section</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getCategory && getCategory.length > 0 ? (
          getCategory.map((category) => (
            <CategoryCard
              key={category._id}
              imageUrl={category.imageUrl}
              categoryName={category._id}
              medicineCount={category.count}
            />
          ))
        ) : (
          <p>No categories found.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryCardSection;
