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