import axios from 'axios';
import authService from '../components/api-authorization/AuthorizeService';


export async function UserId() {
    const [user] = await Promise.all([authService.getUser()]);

    return user;
}
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

export async function FetchGroupsByCreator(userId) {
    const response = await axios.get(`/groups/admin/${userId}`);
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

export async function FetchGroupBySavingsId(savingId) {
    const response = await axios.get(`/groups/saving/${savingId}`);
    if (response.status === 200) {
        return response.data;
    }

    return null;
}

export async function CreateGroup(form) {
    const response = fetch(`/groups/create`, {
        method: 'POST',
        body: form
    });
    if (response.status === 200 || response.status === 204) {
        console.log(response.data);
        return response.data;
    }

    return null;
}

export async function CreateGroupMember(groupId, form) {
    const response = fetch(`/groups/add-member/${groupId}`, {
        method: 'POST',
        body: form
    });
    if (response.status === 200 || response.status === 204) {
        console.log(response.data);
        return response.data;
    }

    return null;
}

export async function CreateGroupSavings(groupId, form) {
    const response = fetch(`/groups/add-saving/${groupId}`, {
        method: 'POST',
        body: form
    })

    if (response.status === 200 || response.status === 204) {
        console.log(response.data);
        return response.data;
    }

    return null;
}

export async function UpdateGroup(groupId, form) {
    const response = fetch(`/groups/update/${groupId}`, {
        method: 'PATCH',
        body: form
    });
    if (response.status === 200 || response.status === 204) {
        console.log(response.data);
        return response.data;
    }

    return null;
}

export async function UpdateAdminMember(memberId, form) {
    const response = fetch(`/groups/update-admin/${memberId}`, {
        method: 'PATCH',
        body: form
    });

    if (response.status === 200 || response.status === 204) {
        console.log(response.data);
        return response.data;
    }

    return null;
}

export async function UpdateMemberStatus(memberId, form) {
    const response = fetch(`/groups/member-status/${memberId}`, {
        method: 'PATCH',
        body: form
    });

    if (response.status === 200 || response.status === 204) {
        console.log(response.data);
        return response.data;
    }

    return null;
}

export async function UpdateGroupSavings(savingId, form) {
    const response = fetch(`/groups/update-saving/${savingId}`, {
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
 ///                             Activity Functions                              //
//////////////////////////////////////////////////////////////////////////////////
export async function FetchActivityLog(userId) {
    const response = await axios.get(`/activity/${userId}`);
    if (response.status === 200) {
        return response.data;
    }

    return null;
}


