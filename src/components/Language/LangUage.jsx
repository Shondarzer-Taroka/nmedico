'use client'
import React, { useState } from 'react';

const LanguageDropdown = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Default language is English

  const handleChange = (event) => {
    const selected = event.target.value;
    setSelectedLanguage(selected);
    // You can perform any action you need with the selected language, like updating the app's language setting
    console.log('Selected language:', selected);
  };

  return (
    <div className="language-dropdown flex items-center">
      <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
        Choose Language:
      </label>
      <select
        id="language"
        value={selectedLanguage}
        onChange={handleChange}
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      >
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="zh">Chinese</option>
        <option value="ja">Japanese</option>
        {/* Add more languages as needed */}
      </select>
    </div>
  );
};

export default LanguageDropdown;
