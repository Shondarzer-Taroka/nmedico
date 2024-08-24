import React from 'react';
import LanguageDropdown from '../Language/LangUage';

const MiniNavBar = () => {
    return (
        <div className='text-gray-500 flex justify-around items-center'>
            <p>welcome the Nmedico</p>
            <div>
                <span>call us: 01899876867 </span>
            </div>

            <div>
                <LanguageDropdown/>
            </div>
        </div>
    );
};

export default MiniNavBar;