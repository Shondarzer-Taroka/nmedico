


// 'use client'
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import axios from 'axios';
// import { useSession } from 'next-auth/react';
// import React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';

// const MyBlogs = () => {
//     const { data: session, status } = useSession();
//     const queryClient = useQueryClient();

//     // Fetch the blogs
//     const { data: blogs, isLoading, isError } = useQuery({
//         queryKey: ['my-blogs', session?.user?.email],
//         queryFn: async () => {
//             const result = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/my-blogs/api/${session?.user?.email}`);
//             return result.data.result;
//         },
//         enabled: !!session?.user?.email
//     });

//     // Mutation for deleting a blog
//     const deleteMutation = useMutation({
//         mutationFn: async (blogId) => {
//             await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/my-blogs/delete/${blogId}`);
//         },
//         onSuccess: () => {
//             // Refetch the blogs after deletion
//             queryClient.invalidateQueries(['my-blogs', session?.user?.email]);
//         },
//         onError: (error) => {
//             console.error('Error deleting the blog:', error);
//         }
//     });

//     // Handle blog deletion
//     const handleDelete = (blogId) => {
//         if (window.confirm('Are you sure you want to delete this blog?')) {
//             deleteMutation.mutate(blogId); // Trigger the mutation
//         }
//     };

//     if (isLoading) {
//         return <p>Loading blogs...</p>;
//     }

//     if (isError) {
//         return <p>There was an error fetching your blogs. Please try again later.</p>;
//     }

//     return (
//         <Box sx={{ width: '100%', overflowX: 'auto', padding: '20px' }}>
//             <h1 className="text-lg font-bold mb-4">My Blogs</h1>

//             <TableContainer component={Paper} sx={{ minWidth: 320 }}>
//                 <Table sx={{ minWidth: 320 }} size="small" aria-label="a dense table">
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Name</TableCell>
//                             <TableCell align="right">Title</TableCell>
//                             <TableCell align="right">Role</TableCell>
//                             <TableCell align="right">Update</TableCell>
//                             <TableCell align="right">Delete</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {blogs.map((row) => (
//                             <TableRow
//                                 key={row._id}
//                                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                             >
//                                 <TableCell component="th" scope="row">
//                                     {row.name}
//                                 </TableCell>
//                                 <TableCell align="right" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
//                                     {row.title}
//                                 </TableCell>
//                                 <TableCell align="right">Admin</TableCell>
//                                 <TableCell align="right">
//                                     <Button variant="contained" size="small">Update</Button>
//                                 </TableCell>
//                                 <TableCell align="right">
//                                     <Button
//                                         variant="contained"
//                                         color="error"
//                                         size="small"
//                                         onClick={() => handleDelete(row._id)}
//                                     >
//                                         Delete
//                                     </Button>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </Box>
//     );
// };

// export default MyBlogs;





'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Swal from 'sweetalert2'; // Import SweetAlert2

const MyBlogs = () => {
    const { data: session, status } = useSession();
    const queryClient = useQueryClient();

    // Fetch the blogs
    const { data: blogs, isLoading, isError } = useQuery({
        queryKey: ['my-blogs', session?.user?.email],
        queryFn: async () => {
            const result = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/my-blogs/api/${session?.user?.email}`);
            return result.data.result;
        },
        enabled: !!session?.user?.email
    });

    // Mutation for deleting a blog
    const deleteMutation = useMutation({
        mutationFn: async (blogId) => {
            await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/my-blogs/delete/${blogId}`);
        },
        onSuccess: () => {
            // Refetch the blogs after deletion
            queryClient.invalidateQueries(['my-blogs', session?.user?.email]);
        },
        onError: (error) => {
            console.error('Error deleting the blog:', error);
        }
    });

    // Handle blog deletion with SweetAlert
    const handleDelete = (blogId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Trigger the mutation
                deleteMutation.mutate(blogId);
                Swal.fire(
                    'Deleted!',
                    'Your blog has been deleted.',
                    'success'
                );
            }
        });
    };

    if (isLoading) {
        return <p>Loading blogs...</p>;
    }

    if (isError) {
        return <p>There was an error fetching your blogs. Please try again later.</p>;
    }

    return (
        <Box sx={{ width: '100%', overflowX: 'auto', padding: '20px' }}>
            <h1 className="text-lg font-bold mb-4">My Blogs</h1>

            <TableContainer component={Paper} sx={{ minWidth: 320 }}>
                <Table sx={{ minWidth: 320 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Title</TableCell>
                            <TableCell align="right">Role</TableCell>
                            <TableCell align="right">Update</TableCell>
                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {blogs.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right" sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                    {row.title}
                                </TableCell>
                                <TableCell align="right">Admin</TableCell>
                                <TableCell align="right">
                                    <Button variant="contained" size="small">Update</Button>
                                </TableCell>
                                <TableCell align="right">
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        onClick={() => handleDelete(row._id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default MyBlogs;
