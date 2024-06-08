import axios from 'axios'
import { redirect } from 'next/navigation';


// Get random products
export const getRandomProducts = async () => {
    const { data: { data } } = await axios.get(`${process.env.API_BASE_URL}/products?limit=7`)

    const randomData = random(data);

    return randomData;
}

const random = (array) => {
    const shuffled = array.slice();
    let currentIndex = shuffled.length;

    while (currentIndex !== 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        const temporaryValue = shuffled[currentIndex];
        shuffled[currentIndex] = shuffled[randomIndex];
        shuffled[randomIndex] = temporaryValue;
    }

    return shuffled;
}

/////////////////

// Get all products

export const getAllProducts = async () => {
    const { data: { data } } = await axios.get(`${process.env.API_BASE_URL}/products`)
    return data
}

export const getSpecificProduct = async (id) => {
    try {
        const { data: { data } } = await axios.get(`${process.env.API_BASE_URL}/products/${id}`)

        return data
    } catch (error) {
        if (error.response.data.success) {
            console.log(data);
        } else {
            redirect('/not-found')
        }
    }
}