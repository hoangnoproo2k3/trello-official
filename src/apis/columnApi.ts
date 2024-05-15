import axiosInstance from './axiosInstance';
export const getColumnsWithBoard = async (boardId: any) => {
    try {
        const response = await axiosInstance.post(`/v1/columns/list-columns`, boardId);
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