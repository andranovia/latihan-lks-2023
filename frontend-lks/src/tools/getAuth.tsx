import axiosInstance from "./axiosIntance";


export const getUser = async (accessToken: string | null) => {
  try {
    if (!accessToken) {
      throw new Error('Access token is missing');
    }

    const response = await axiosInstance.get(`/api/v1/auth/user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,

    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};