

import Compressor from 'compressorjs'; // Compressor.js library

export default function convertImageToBase64(file) {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: 0.6, // Adjust quality for compression (between 0 and 1)
      success(result) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(result);

        fileReader.onload = () => {
          resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
          reject(error);
        };
      },
      error(err) {
        reject(err);
      },
    });
  });
}


// export default function convertToBase64(file) {
//     return new Promise((resolve,reject)=>{
//         let fileReader=new FileReader()
//         fileReader.readAsDataURL(file)

//         fileReader.onload=()=>{
//             resolve(fileReader.result)
//         }
//         fileReader.onerror=(error)=>{
//             reject(error)
//         }
//     })

// }