import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CategoryCard = ({ imageUrl, categoryName, medicineCount }) => {
  return (
<Link href={`/categorydetails/${categoryName}`}>
<div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-gray-200 h-48 flex items-center justify-center overflow-hidden">
        <Image
          src={imageUrl || '/assets/equipment-3089883_1280.jpg'}
          alt={`${categoryName} Image`}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          width={200}
          height={200}
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">{categoryName}</h2>
        <p className="text-sm text-gray-600 mt-2">Number of Medicines: {medicineCount}</p>
      </div>
    </div>
</Link>
  );
};

export default CategoryCard;
