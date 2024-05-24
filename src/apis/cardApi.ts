import axiosInstance from './axiosInstance';
export const createNewCard = async (data: any) => {
    try {
        const response = await axiosInstance.post('/v1/cards', data);
        if (response.status === 201) {
            return response.data;
        } else {
            // Xử lý các trường hợp lỗi khác nếu cần
            throw new Error('Unexpected response status');
        }
    } catch (error) {
        console.error('Error saving user data to external API:', error);
        // Ném lỗi để được xử lý bởi hàm handleSubmit
        throw error;
    }
};
export const updateCard = async (cardId: any, data: any) => {
    try {
        const response = await axiosInstance.put(`/v1/cards/${cardId}`, data);
        if (response.status === 200) {
            return response.data;
        } else {
            // Xử lý các trường hợp lỗi khác nếu cần
            throw new Error('Unexpected response status');
        }
    } catch (error) {
        console.error('Error saving user data to external API:', error);
        // Ném lỗi để được xử lý bởi hàm handleSubmit
        throw error;
    }
};
export const getCardssWithColumn = async (boardId: any) => {
    try {
        const response = await axiosInstance.post(`/v1/cards/list-cards`, boardId);
        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Failed call API:', response.status, response.statusText);
            throw new Error(`Failed with status: ${response.status}`);
        }
    } catch (error) {
        throw error;
    }
}
export const getDetailCardWithId = async (cardId: any) => {
    try {
        const response = await axiosInstance.get(`/v1/cards/${cardId}`);
        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Failed call API:', response.status, response.statusText);
            throw new Error(`Failed with status: ${response.status}`);
        }
    } catch (error) {
        throw error;
    }
}
export const updateCardWithDndKit = async (data: any) => {
    try {
        const response = await axiosInstance.patch('/v1/cards/update-dnd', data);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Failed with status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error saving user data to external API:', error);
        throw error;
    }
}