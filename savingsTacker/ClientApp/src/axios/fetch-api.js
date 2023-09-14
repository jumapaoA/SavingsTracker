import axios from 'axios';


export async function FetchUserById(id) {
    const response = await axios.get(`/user/${id}`);
     
    if (response.status === 200) {
        console.log(response.data);
        return response.data;
    }

    return null;
}

export async function FetchUsers() {
    const response = await axios.get(`/user`);

    if (response.status === 200) {
        console.log(response.data);
        return response.data;
    }

    return null;
}

export async function FetchUserBySavingsId(id) {
    const response = await axios.get(`/user/userSaving/1`);

    if (response.status === 200) {
        console.log(response.data);
        return response.data;
    }

    return null;
}