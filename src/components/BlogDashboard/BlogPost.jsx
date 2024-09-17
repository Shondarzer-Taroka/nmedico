'use client'; // Ensure this component is only rendered on the client side
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import Image from 'next/image';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useSession } from 'next-auth/react';

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

// Define the custom toolbar options for ReactQuill
const modules = {
    toolbar: [
        [{ 'font': [] }],
        [{ 'size': [] }],
        ['bold', 'italic', 'underline'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'image'],
        [{ 'align': [] }],
        ['clean'] // Remove formatting button
    ],
};

const BlogPost = () => {
    const session=useSession()
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null); // Store img.bb URL

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleContentChange = (value) => setContent(value);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file); // Set the file to be uploaded
            // uploadToImgbb()
        }
    };


    useEffect(()=>{
        const uploadToImgbb = async () => {
            if (!image) return;
    
            const formData = new FormData();
            formData.append('image', image);
    
            try {
             if (image) {
                const response = await axios.post(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_HOSTING_KEY}`, formData);
                const imageUrl = response.data.data.url;
                console.log(response);
                setImageUrl(imageUrl); // Set the URL from img.bb
             }
            } catch (error) {
                console.error('Error uploading image to img.bb:', error);
            }
        };
    uploadToImgbb()
    },[image])

    const handleclick = async () => {
        try {
            const post = {
                name:session?.data?.user?.name,
                email:session?.data?.user?.email,
                title,
                description,
                content,
                image: imageUrl // Use the img.bb URL here
            };

            let result = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/blog-post/api`, post);
            console.log(result.data);
            toast.success('blog successfully published')
            console.log(post);
            
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="p-6">
            <Toaster/>
            <h2 className="text-2xl font-bold mb-4">Create Blog Post</h2>

            {/* Title Input */}
            <div className="mb-4">
                <label className="block text-lg font-medium mb-2" htmlFor="title">
                    Title
                </label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter the blog post title"
                />
            </div>

            {/* Description Input */}
            <div className="mb-4">
                <label className="block text-lg font-medium mb-2" htmlFor="description">
                    Description
                </label>
                <textarea
                    id="description"
                    value={description}
                    onChange={handleDescriptionChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter a brief description of the blog post"
                    rows="4"
                />
            </div>

            {/* Image Upload */}
            <div className="mb-4">
                <label className="block text-lg font-medium mb-2" htmlFor="image">
                    Upload Image
                </label>
                <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-2"
                />
                {image && (
                    <div className="mt-4">
                        <Image
                            width={300}
                            height={300}
                            src={URL.createObjectURL(image)}
                            alt="Uploaded Preview"
                            className="w-full max-h-80 object-cover"
                        />
                    </div>
                )}
            </div>

            {/* Content Editor */}
            <div className="mb-4">
                <label className="block text-lg font-medium mb-2" htmlFor="content">
                    Content
                </label>
                <ReactQuill
                    value={content}
                    onChange={handleContentChange}
                    placeholder="Write the blog content..."
                    modules={modules} // Apply the custom toolbar
                />
            </div>

            {/* Preview */}
            <div className="mt-6">
                <h3 className="text-xl font-bold mb-2">Preview</h3>
                <div className="border p-4 rounded">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <p className="text-gray-700 mt-2">{description}</p>
                    {imageUrl && (
                        <Image
                            width={400}
                            height={300}
                            src={imageUrl}
                            alt="Preview"
                            className="w-full mt-4"
                        />
                    )}
                    <div
                        className="mt-4"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                </div>
            </div>
            <button onClick={handleclick} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                Publish Blog Post
            </button>
        </div>
    );
};

export default BlogPost;
