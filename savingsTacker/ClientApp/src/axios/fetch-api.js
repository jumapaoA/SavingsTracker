import axios from 'axios';

export async function FetchUserById(id) {
    const response = await axios.get(`api/user/${id}`);

    console.log(response.data);

    if (response.status === 204) {
        return response.data;
    }

    return null;
}