'use client'
import { Table, Button, Modal } from "flowbite-react";
import Image from "next/image";
import React, { useState } from 'react';
import { HiEye } from "react-icons/hi";
import { selectProduct } from "../hepler/selectProduct";

export let ownerEmail;
const CategoryDetails = ({ data , owner}) => {
    const [open, setOpen] = useState(false);
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    ownerEmail=owner
    const handleEyeClick = (item) => {
        setSelectedMedicine(item);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedMedicine(null);
    };

    console.log(data);
    
    return (
        <div>
            <div className="overflow-x-auto">
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>Product name</Table.HeadCell>
                        <Table.HeadCell>Category</Table.HeadCell>
                        <Table.HeadCell>Mass Unit</Table.HeadCell>
                        <Table.HeadCell>Price</Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Edit</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {data && data.map((item) => (
                            <Table.Row key={item._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {item.itemName}
                                </Table.Cell>
                                <Table.Cell>{item.category}</Table.Cell>
                                <Table.Cell>{item.massUnit}</Table.Cell>
                                <Table.Cell>${item.unitPrice}</Table.Cell>
                                <Table.Cell>
                                    <div className="flex gap-3 items-center">
                                        <Button color="blue" onClick={()=>selectProduct(item)}>Select</Button>
                                        <button 
                                            onClick={() => handleEyeClick(item,owner)}
                                            className="px-3 py-3 bg-gray-200 rounded-lg text-black"
                                        >
                                            <HiEye />
                                        </button>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>

            {selectedMedicine && (
                <Modal show={open} onClose={handleClose}>
                    <Modal.Header>
                        {selectedMedicine.itemName}
                    </Modal.Header>
                    <Modal.Body>
                        <div className="space-y-6">
                            <Image width={500} height={300} 
                                src={selectedMedicine.productImage || '/default-image.jpg'} 
                                alt={selectedMedicine.itemName} 
                                className="w-full h-64 object-cover"
                            />
                            <p><strong>Company:</strong> {selectedMedicine.company}</p>
                            <p><strong>Price:</strong> ${selectedMedicine.unitPrice}</p>
                            <p><strong>Mass Unit:</strong> {selectedMedicine.massUnit}</p>
                            <p><strong>Description:</strong> {selectedMedicine.description}</p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button color="gray" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default CategoryDetails;
