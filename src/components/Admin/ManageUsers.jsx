'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import UserRole from './UserRole';

const ManageUsers = () => {
    // Fetch users using react-query
    const { data: users = [], isError, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/admin/manageUsers/api`);
            return res.data.data;
        }
    });

    // console.log(users);

    return (
        <>
            {isLoading ? (
                <h1>Loading...</h1>
            ) : isError ? (
                <h1>Error loading users.</h1>
            ) : (
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Render each user row */}
                            {users.length>0 && users.map((user, index) => (
                                <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td className='w-[350px]'>
                                        <UserRole id={user._id} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default ManageUsers;
