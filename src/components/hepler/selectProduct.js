// import axios from "axios";
// import { ownerEmail } from "../CategoryDetails/CategoryDetails";

// export async function selectProduct(item) {

//     let product = {

//         category: item.category,
//         company: item.company,
//         discountPercentage: item.discountPercentage,
//         email: item.email,
//         itemGenericName: item.itemGenericName,
//         itemName: item.itemName,
//         massUnit: item.massUnit,
//         productImage: item.productImage,
//         selectedId: item._id,
//         shortDescription: item.shortDescription,
//         unitPrice: item.unitPrice,
//         buyerEmail:ownerEmail
//     }
//     console.log(product);

//     try {
//         let result = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/category/api`, product)
//         console.log(result.data);

//     } catch (error) {
//         console.log(error);

//     }


// } 



import axios from "axios";
import { ownerEmail } from "../CategoryDetails/CategoryDetails";


// Function to save selected product to localStorage and then post it

//  export async function totalProductsinLocalStorage() {
//     let count= 1;
//     let products =JSON.parse(localStorage.getItem('selectedProducts')) || [];
//     let product= products.map(element => {
//         let obj={
//             count: products.filter(element=> element._id===element._id).length,
//             // category:element.category,
//             // totalUnitPrice: products.filter(element=> element._id===element._id).reduce((accumulator, currentValue) => accumulator + currentValue.price, 0)
//         }
//         return obj
//         //  console.log(obj);
         
//     });
//     console.log(product);
    
//  }

// Fetch data from local storage
const itemsData = JSON.parse(localStorage.getItem("selectedProducts")) || [];

// Function to calculate product details based on selectedId
export const calculateProductDetails = () => {
  const productDetails = {};

  itemsData.forEach((item) => {
    const itemName = item.itemName;
    const selectedId = item.selectedId; // Get selectedId
    const unitPrice = parseFloat(item.unitPrice);
    const discount = parseFloat(item.discountPercentage) || 0;

    // Calculate final price after discount
    const finalPrice = unitPrice - (unitPrice * discount) / 100;

    // Check if the product with the same selectedId exists
    if (productDetails[selectedId]) {
      productDetails[selectedId].count += 1; // Increment count
      productDetails[selectedId].totalPrice += finalPrice; // Add to total price
    } else {
      // Initialize product details if it doesn't exist
      productDetails[selectedId] = {
        _id: selectedId, // Assign selectedId as _id
        itemName,
        discountPercentage: discount,
        unitPrice: finalPrice,
        count: 1, // Initial count
        totalPrice: finalPrice, // Initial total price
      };
    }
  });

  return productDetails;
};



// // Call the function to get the product details
// const productDetails = calculateProductDetails(itemsData);

// // Log the results to the console
// console.log("Product Details:", productDetails);

// // Example: Display in console for each product
// Object.values(productDetails).forEach((product) => {
//   console.log(`Product Name: ${product.itemName}`);
//   console.log(`Unit Price: ${product.unitPrice}`);
//   console.log(`Total Count: ${product.count}`);
//   console.log(`Total Price: ${product.totalPrice}`);
// });







export async function selectProduct(item) {
    const product = {
        category: item.category,
        company: item.company,
        discountPercentage: item.discountPercentage,
        email: item.email,
        itemGenericName: item.itemGenericName,
        itemName: item.itemName,
        massUnit: item.massUnit,
        productImage: item.productImage,
        selectedId: item._id,
        shortDescription: item.shortDescription,
        unitPrice: item.unitPrice,
        buyerEmail: ownerEmail,
    };

    // selectedProductsArray.push(item)
    // console.log(selectedProductsArray);
    
    // Retrieve existing products from localStorage
    const existingProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];

    // Check if the product is already selected (based on selectedId)
    const isProductSelected = existingProducts.some((p) => p.selectedId === product.selectedId);

    // if (!isProductSelected) {
        // Add the new product to the array
        existingProducts.push(product);
        // Save the updated array back to localStorage
        localStorage.setItem('selectedProducts', JSON.stringify(existingProducts));
        // console.log("Product added to localStorage:", product);
    // } else {
        // console.log("Product already selected.");
    // }

    // Try to post the product to the backend
    try {
        const result = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/category/api`, product);
        console.log("Product posted to backend:", result.data);
    } catch (error) {
        console.error("Error posting product to backend:", error);
    }
}


export async function increaseQuantity(item) {

    let {_id,...product}=item
    console.log(product);
    

    // try {
    //     let result = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/category/api`, product)
    //     console.log(result.data);

    // } catch (error) {
    //     console.log(error);

    // }


} 