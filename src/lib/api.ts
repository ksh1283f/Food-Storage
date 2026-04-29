import { auth } from "./firebase";

export const apiFetch = async (url: string, options: any = {}) => {
    const user = auth.currentUser;

    let token = '';
    if(user){
        token = await user.getIdToken();
    }

    return fetch(`https://food-storage-back.onrender.com${url}`, {
        ...options,
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            ...(options.headers || {}),
        },
    });
};