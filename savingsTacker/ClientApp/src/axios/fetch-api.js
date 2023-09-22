import axios from 'axios';

  //////////////////////////////////////////////////////////////////////////////////
 ///                           User Functions                                    //
//////////////////////////////////////////////////////////////////////////////////
export async function FetchUsers() {
    const response = await axios.get(`/user`);
    if (response.status === 200) {
        return response.data;
    }

    return null;
}

export async function FetchUserById(id) {
    const response = await axios.get(`/user/${id}`);
    if (response.status === 200) {
        console.log(response.data);
        return response.data;
    }

    return null;
}

export async function FetchUserNameById(id) {
    const response = await axios.get(`/user/${id}`);
    if (response.status === 200) {
        const result = response.data;

        return result.firstName + " "+result.lastName;
    }

    return null;
}

export async function FetchUserBySavingsId(id) {
    const response = await axios.get(`/user/user-saving/${id}`);
    if (response.status === 200) {
        return response.data;
    }

    return null;
}

export async function FetchMembersByGroupId(id) {
    const response = await axios.get(`/user/group-members/${id}`);
    if (response.status === 200) {
        return response.data;
    }

    return null;
}

export async function UpdateUserProfile(userId) {
    const response = await axios.patch(`/user/update-profile/${userId}`);

    if (response.status === 200 || response.status === 204) {
        console.log(response.status);
        console.log(response.data);
        return response.data;
    }

    return null;
}

export async function UpdateUserStatus(userId) {
    const response = await axios.patch(`/user/update-status/${userId}`);

    if (response.status === 200 || response.status === 204) {
        console.log(response.status);
        console.log(response.data);
        return response.data;
    }

    return null;
}

export async function UpdateUserProfilePicture(userId) {
    const response = await axios.patch(`/user/upload/profile-picture/${userId}`);

    if (response.status === 200 || response.status === 204) {
        console.log(response.status);
        console.log(response.data);
        return response.data;
    }

    return null;
}

  //////////////////////////////////////////////////////////////////////////////////
 ///                           Savings Functions                                 //
//////////////////////////////////////////////////////////////////////////////////
export async function FetchSavings() {
    const response = await axios.get(`/savings`);
    if (response.status === 200) {
        return response.data;
    }

    return null;
}

export async function FetchSavingsByUserId(userId) {
    const response = await axios.get(`/savings/user/${userId}`);
    if (response.status === 200) {
        return response.data;
    }

    return null;
}

export async function FetchSavingsBySavingId(savingId) {
    const response = await axios.get(`/savings/${savingId}`);
    if (response.status === 200) {
        return response.data;
    }

    return null;
}

export async function FetchSavingsByGroupId(groupId) {
    const response = await axios.get(`/savings/group/${groupId}`);
    if (response.status === 200) {
        console.log(response.data);
        return response.data;
    }

    return null;
}

export async function FetchGroupSavingsByUserId(userId) {
    const response = await axios.get(`/savings/group-savings/${userId}`);
    if (response.status === 200) {
        return response.data;
    }

    return null;
}

export async function CreateSaving(form) {
    const response = fetch('/savings/create', {
        method: 'POST',
        body: form
    })

    if (response.status === 200 || response.status === 204) {
        console.log(response.data);
        return response.data;
    }

    return null;
}

export async function UpdateSavings(id, form) {
    const response = fetch(`/savings/update/${id}`, {
        method: 'PATCH',
        body: form
    });

    if (response.status === 200 || response.status === 204) {
        console.log(response.data);
        return response.data;
    }

    return null;
}
 
  //////////////////////////////////////////////////////////////////////////////////
 ///                             Group Functions                                 //
//////////////////////////////////////////////////////////////////////////////////
export async function FetchGroups() {
    const response = await axios.get(`/groups`);
    if (response.status === 200) {
        return response.data;
    }

    return null;
}

export async function FetchGroupDetailByGroupId(groupId) {
    const response = await axios.get(`/groups/${groupId}`);
    if (response.status === 200) {
        return response.data;
    }

    return null;
}

export async function FetchGroupsByUserId(userId) {
    const response = await axios.get(`/groups/user/${userId}`);
    if (response.status === 200) {
        return response.data;
    }

    return null;
}

export async function FetchGroupSavingsById(groupId) {
    const response = await axios.get(`/groups/savings/${groupId}`);
    if (response.status === 200) {
        return response.data;
    }

    return null;
}

export async function CreateGroup() {
    const response = await axios.post(`/groups/create`);

    if (response.status === 200 || response.status === 204) {
        console.log(response.data);
        return response.data;
    }

    return null;
}

export async function CreateGroupMember(groupId) {
    const response = await axios.post(`/groups/add-member/${groupId}`);

    if (response.status === 200 || response.status === 204) {
        console.log(response.data);
        return response.data;
    }

    return null;
}

export async function CreateGroupSavings(groupId) {
    const response = await axios.post(`/groups/add-saving/${groupId}`);

    if (response.status === 200 || response.status === 204) {
        console.log(response.data);
        return response.data;
    }

    return null;
}

export async function UpdateGroup(groupId) {
    const response = await axios.patch(`/groups/update/${groupId}`);

    if (response.status === 200 || response.status === 204) {
        console.log(response.data);
        return response.data;
    }

    return null;
}

export async function UpdateAdminMember(memberId) {
    const response = await axios.patch(`/groups/update-admin/${memberId}`);

    if (response.status === 200 || response.status === 204) {
        console.log(response.data);
        return response.data;
    }

    return null;
}

export async function UpdateMemberStatus(memberId) {
    const response = await axios.patch(`/groups/member-status/${memberId}`);

    if (response.status === 200 || response.status === 204) {
        console.log(response.data);
        return response.data;
    }

    return null;
}

  //////////////////////////////////////////////////////////////////////////////////
 ///                             Activity Functions                              //
//////////////////////////////////////////////////////////////////////////////////
export async function FetchActivityLog(userId) {
    const response = await axios.get(`/activity/${userId}`);
    if (response.status === 200) {
        return response.data;
    }

    return null;
}