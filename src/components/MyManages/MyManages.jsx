'use client';
import React, { useState } from 'react';
import { Button, FileInput, Label, Modal, Textarea, TextInput } from 'flowbite-react';
import { useFormik } from 'formik';
import convertImageToBase64 from '../hepler/convert';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import toast, { Toaster } from 'react-hot-toast';

const MyManages = () => {
    let { data } = useSession()
    // console.log(data);

    const [openModal, setOpenModal] = useState(true);
    let [file, setFile] = useState('')
    const formik = useFormik({
        initialValues: {
            itemName: '',
            itemGenericName: '',
            shortDescription: '',
            category: '',
            company: '',
            massUnit: '',
            unitPrice: '',
            discountPercentage: '0',

        },
        onSubmit: async (values) => {
            console.log(values);
            values = Object.assign(values, { productImage: file, email: data?.user?.email })

            try {
                let result = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/seller/api`, values);
                console.log(result);
                if (result.status === 200) {
                    toast.success('product added successfully')
                    setFile('');
                    formik.resetForm();
                    setOpenModal(false);
                }
            } catch (error) {
                console.error("Error submitting form", error);
                // You might want to show an error message to the user here
            }



            // handle form submission here
        },
    });

    function onCloseModal() {
        setOpenModal(false);
        formik.resetForm();
    }

    const upload = async (e) => {
        let base64 = await convertImageToBase64(e.target.files[0])
        setFile(base64)
    }

    const { isPending, error, data: sellerData = [] } = useQuery({
        queryKey: ['sellerData', data?.user?.email],
        queryFn: async () => {
            let result = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/getdatas/api/${data?.user?.email}`)
            return result.data.result
        }
    })
    // console.log(sellerData);
    return (
        <div>
            <Toaster />
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th>
                                <>
                                    <Button onClick={() => setOpenModal(true)}>Add product</Button>
                                    <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                                        <Modal.Header />
                                        <Modal.Body>
                                            <div className="space-y-6">
                                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                                    Sign in to our platform
                                                </h3>
                                                <form onSubmit={formik.handleSubmit}>
                                                    <div>
                                                        <div className="mb-2 block">
                                                            <Label htmlFor="itemName" value="Your Item Name" />
                                                        </div>
                                                        <TextInput
                                                            {...formik.getFieldProps('itemName')}
                                                            id="itemName"
                                                            placeholder="abcx"
                                                            name="itemName"
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="mb-2 block">
                                                            <Label htmlFor="itemGenericName" value="Your item generic name" />
                                                        </div>
                                                        <TextInput
                                                            {...formik.getFieldProps('itemGenericName')}
                                                            id="itemGenericName"
                                                            placeholder="abcx"
                                                            name="itemGenericName"
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="mb-2 block">
                                                            <Label htmlFor="shortDescription" value="Your short description" />
                                                        </div>
                                                        <Textarea
                                                            {...formik.getFieldProps('shortDescription')}
                                                            id="shortDescription"
                                                            placeholder="abcx"
                                                            name="shortDescription"
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="mb-2 block">
                                                            <Label htmlFor="image" value="Product image" />
                                                        </div>
                                                        <FileInput onChange={upload} id="image" placeholder="abcx" name="image" />
                                                    </div>
                                                    {/* Category Dropdown */}
                                                    <div>
                                                        <div className="mb-2 block">
                                                            <Label htmlFor="category" value="Select Category" />
                                                        </div>
                                                        <select
                                                            id="category"
                                                            name="category"
                                                            {...formik.getFieldProps('category')}
                                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                        >
                                                            <option value="">Choose a category</option>
                                                            <option value="electronics">Electronics</option>
                                                            <option value="clothing">Clothing</option>
                                                            <option value="accessories">Accessories</option>
                                                            <option value="books">Books</option>
                                                        </select>
                                                    </div>
                                                    {/* Company Dropdown */}
                                                    <div>
                                                        <div className="mb-2 block">
                                                            <Label htmlFor="company" value="Select Company" />
                                                        </div>
                                                        <select
                                                            id="company"
                                                            name="company"
                                                            {...formik.getFieldProps('company')}
                                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                        >
                                                            <option value="">Choose a company</option>
                                                            <option value="apple">Apple</option>
                                                            <option value="google">Google</option>
                                                            <option value="microsoft">Microsoft</option>
                                                            <option value="amazon">Amazon</option>
                                                        </select>
                                                    </div>
                                                    {/* Mass Unit Dropdown */}
                                                    <div>
                                                        <div className="mb-2 block">
                                                            <Label htmlFor="massUnit" value="Select Mass Unit" />
                                                        </div>
                                                        <select
                                                            id="massUnit"
                                                            name="massUnit"
                                                            {...formik.getFieldProps('massUnit')}
                                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                        >
                                                            <option value="">Choose mass unit</option>
                                                            <option value="mg">Mg</option>
                                                            <option value="ml">ML</option>
                                                        </select>
                                                    </div>
                                                    {/* Per Unit Price Input */}
                                                    <div>
                                                        <div className="mb-2 block">
                                                            <Label htmlFor="unitPrice" value="Per Unit Price" />
                                                        </div>
                                                        <TextInput
                                                            id="unitPrice"
                                                            placeholder="Enter price per unit"
                                                            name="unitPrice"
                                                            {...formik.getFieldProps('unitPrice')}
                                                        />
                                                    </div>
                                                    {/* Discount Percentage Input */}
                                                    <div>
                                                        <div className="mb-2 block">
                                                            <Label htmlFor="discountPercentage" value="Discount Percentage" />
                                                        </div>
                                                        <TextInput
                                                            id="discountPercentage"
                                                            placeholder="Enter discount percentage"
                                                            name="discountPercentage"
                                                            {...formik.getFieldProps('discountPercentage')}
                                                        />
                                                    </div>

                                                    <input
                                                        type="submit"
                                                        value={'Add product'}
                                                        className="btn btn-primary"
                                                        id=""
                                                    />
                                                </form>
                                            </div>
                                        </Modal.Body>
                                    </Modal>
                                </>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {isPending&& <h1>loading...</h1> }

                        {isPending || sellerData.map(data => <tr key={data._id}>
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );


};

export default MyManages;
