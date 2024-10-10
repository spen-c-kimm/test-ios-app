import axios from "axios"

export const getInventory = async () => {
    try {
        const { data } = await axios.get('https://www.purplewave.com/v1/search/search?searchType=all&dateType=upcoming&sortBy=current_bid-desc&page=1&perPage=50&grouped=false')

    return data
    } catch (error) {
        return []
    }
}

export const getNearestInventory = async (latitude: number, longitude: number) => {
    try {
        const { data } = await axios.get(`https://www.purplewave.com/v1/search/search?searchType=all&dateType=upcoming&sortBy=distance-desc&page=1&perPage=50&grouped=false&latitude=${latitude}&longitude=${longitude}&range=100`)

    return data
    } catch (error) {
        return []
    }
}