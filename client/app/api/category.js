import axios from 'axios'

export const getCategories = async () => {
    try {
        const { data } = await axios.get(`${process.env.API_BASE_URL}/categories`)
        return data;
    } catch (error) {
        console.log('error get data');

    }
}

export const getSpecificCategory = async (id) => {
    try {
        const { data } = await axios.get(`${process.env.API_BASE_URL}/categories/${id}`)
        return data;
    } catch (error) {
        console.log('error get data');
    }
}
