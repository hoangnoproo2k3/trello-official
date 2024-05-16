// 'use server'
import axiosInstance from './axiosInstance';

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
export const updateColumnOrderIdsBoard = async (data: any) => {
    try {
        const response = await axiosInstance.patch('/v1/boards', data);
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
export const getDetailBoardWithId = async (ownerId: string) => {
    try {
        const response = await axiosInstance.get(`/v1/boards/${ownerId}`);
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
export const getPaginatedDocuments = async (pageNumber: any, pageSize: any, ownerId: any) => {
    try {
        const response = await axiosInstance.post(`/v1/boards/list-board?pageNumber=${pageNumber}&pageSize=${pageSize}`, ownerId);
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