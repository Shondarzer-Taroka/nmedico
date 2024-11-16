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

 export async function totalProductsinLocalStorage() {
    let products =JSON.parse(localStorage.getItem('selectedProducts')) || [];

 }

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

    selectedProductsArray.push(item)
    console.log(selectedProductsArray);
    
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