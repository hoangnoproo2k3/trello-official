'use server'
import axiosInstance from './axiosInstance';

export const saveNewUser = async (newUser: any) => {
    try {
        const response = await axiosInstance.post('/v1/users', newUser);
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
export const getDetailUser = async (email: any) => {
    try {
        const response = await axiosInstance.post('/v1/users/email', email);
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
export const getSearchUsers = async (searchTerm: any, boardId: any) => {
    try {
        const response = await axiosInstance.post(`/v1/users/search?q=${searchTerm}`, boardId);
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