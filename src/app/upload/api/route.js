// // /upload/api/route.js
// import formidable from 'formidable';
// import path from 'path';
// import fs from 'fs/promises';

// export const config = {
//     api: { bodyParser: false },
// };

// export default async (req, res) => {
//     const form = new formidable.IncomingForm();
//     form.uploadDir = './public/uploads';
//     form.keepExtensions = true;

//     form.parse(req, async (err, fields, files) => {
//         const oldPath = files.file.filepath;
//         const fileName = path.basename(files.file.newFilename);
//         const newPath = `./public/uploads/${fileName}`;

//         await fs.rename(oldPath, newPath);
//         res.status(200).json({ url: `/uploads/${fileName}` });
//     });
// };


import formidable from 'formidable';
import path from 'path';
import fs from 'fs/promises';

export const config = {
    api: { bodyParser: false },
};

// Assign the arrow function to a named variable before exporting
const uploadHandler = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = './public/uploads';
    form.keepExtensions = true;

    try {
        // Parse the form data
        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('Form parse error:', err);
                return res.status(500).json({ error: 'Form parse error' });
            }

            const oldPath = files.file.filepath;
            const fileName = path.basename(files.file.newFilename);
            const newPath = `./public/uploads/${fileName}`;

            // Move the uploaded file
            await fs.rename(oldPath, newPath);

            // Return the file URL
            res.status(200).json({ url: `/uploads/${fileName}` });
        });
    } catch (error) {
        console.error('File upload error:', error);
        res.status(500).json({ error: 'File upload error' });
    }
};

export default uploadHandler;
