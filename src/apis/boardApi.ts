// 'use server'
import axiosInstance from './axiosInstance';

export const getPaginatedDocuments = async (ownerId: any) => {
    try {
        const response = await axiosInstance.post('/v1/boards/list-board', ownerId);
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
export const createNewBoard = async (data: any) => {
    try {
        const response = await axiosInstance.post('/v1/boards', data);
        if (response.status === 201) {
            return response.data;
        } else {
            console.error('Failed to save user data to external API:', response.status, response.statusText);
            throw new Error(`Failed with status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error saving user data to external API:', error);
        throw error;
    }
};
export const getSearchTitleBoards = async (searchTerm: any, ownerId: any) => {
    try {
        const response = await axiosInstance.post(`/v1/boards/search?q=${searchTerm}`, ownerId);
        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Failed to save user data to external API:', response.status, response.statusText);
            throw new Error(`Failed with status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error saving user data to external API:', error);
        throw error;
    }
}