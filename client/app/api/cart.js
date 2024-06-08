import axios from 'axios'
import { toast } from 'sonner'

const updateCartItemQuantity = async (userId, productId, quantity) => {

    const { data } = await axios.put(`${process.env.API_BASE_URL}/quantity`, {
        userId,
        productId,
        quantity
    })

    toast.success(data?.message)
}

export {
    updateCartItemQuantity
}