// 'use client'
// import axios from 'axios';
// import React, { useState } from 'react';

// const UserRole = ({id}) => {
//     const [role, setRole] = useState('user'); // Default role is 'user'

//     function handleSubmit(e) {
//         e.preventDefault(); // Prevent the form from submitting traditionally

//         // Handle the role change submission here
//         console.log('Selected role:', role);
//         axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/admin/manageUsers/api`,{role})
//         .then(res=>{
//             console.log(res.data);
            
//         })
//         .catch(err=>{
//             console.log(err);
            
//         })
//         // You can make an API call or perform any action to update the role
//         // For example, using fetch or axios to update the role on the server
//     }

//     return (
//         <div>
//             <form onSubmit={handleSubmit} className='flex gap-2 items-center'>
//                 <div className='border-2'>
//                     <label htmlFor="role">Role:</label>
//                     <select
//                         id="role"
//                         value={role}
//                         onChange={(e) => setRole(e.target.value)}
//                         className="select"
//                     >
//                         <option value="admin">Admin</option>
//                         <option value="seller">Seller</option>
//                         <option value="user">User</option>
//                     </select>
//                 </div>
//                 <div>
//                     <button type="submit" className="btn btn-info">Change</button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default UserRole;


'use client'
import axios from 'axios';
import React, { useState } from 'react';

const UserRole = ({ id }) => {
    const [role, setRole] = useState('user'); // Default role is 'user'
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [message, setMessage] = useState(''); // Message state for success or error feedback

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the form from submitting traditionally
        setIsLoading(true); // Start loading

        try {
            const res = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/admin/manageUsers/api`, { id, role });
            setMessage('Role updated successfully!');
            console.log(res.data);
        } catch (err) {
            setMessage('Failed to update role.');
            console.error(err);
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className='flex gap-2 items-center'>
                <div className='border-2'>
                    <label htmlFor="role">Role:</label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="select"
                    >
                        <option value="admin">Admin</option>
                        <option value="seller">Seller</option>
                        <option value="user">User</option>
                    </select>
                </div>
                <div>
                    <button type="submit" className="btn btn-info" disabled={isLoading}>
                        {isLoading ? 'Changing...' : 'Change'}
                    </button>
                </div>
            </form>
            {message && <p>{message}</p>} {/* Display success or error message */}
        </div>
    );
};

export default UserRole;

