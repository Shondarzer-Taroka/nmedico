import axios from "axios";
import { ownerEmail } from "../CategoryDetails/CategoryDetails";

export async function selectProduct(item) {

    let product = {

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
        buyerEmail:ownerEmail
    }
    console.log(product);

    try {
        let result = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/category/api`, product)
        console.log(result.data);

    } catch (error) {
        console.log(error);

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