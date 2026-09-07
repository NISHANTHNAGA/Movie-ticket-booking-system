import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar/Navbar";

import { getAdminUsers, updateUserRole, deleteUser } from "../../services/authService";

import "./AdminUsers.css";


function AdminUsers() {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        loadUsers();

    }, []);


    const loadUsers = async () => {

        try {

            const data = await getAdminUsers();

            setUsers(data);

        } catch (error) {

            console.error(
                "Error loading users:",
                error
            );

            setError(
                "Unable to load users."
            );

        } finally {

            setLoading(false);

        }

    };

    const handleRoleChange = async (userId, newRole) => {

        try {

            await updateUserRole(
                userId,
                newRole
            );

            setUsers((currentUsers) =>
                currentUsers.map((user) =>
                    user.id === userId
                        ? {
                            ...user,
                            role: newRole
                        }
                        : user
                )
            );

        } catch (error) {

            console.error(
                "Error updating role:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to update user role."
            );

        }

    };

    const handleDeleteUser = async (userId, username) => {

        const confirmDelete = window.confirm(
            `Are you sure you want to delete ${username}?`
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteUser(userId);

            setUsers((currentUsers) =>
                currentUsers.filter(
                    (user) => user.id !== userId
                )
            );

        } catch (error) {

            console.error(
                "Error deleting user:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to delete user."
            );

        }
    };


    return (

        <>
            <Navbar />

            <div className="admin-users-page">

                <div className="admin-users-header">

                    <div>

                        <h1>
                            Manage Users
                        </h1>

                        <p>
                            View and manage CineBook users.
                        </p>

                    </div>

                </div>


                {loading && (

                    <p className="users-message">
                        Loading users...
                    </p>

                )}


                {!loading && error && (

                    <p className="users-error">
                        {error}
                    </p>

                )}


                {!loading &&
                    !error &&
                    users.length === 0 && (

                        <p className="users-message">
                            No users found.
                        </p>

                    )}


                {!loading &&
                    !error &&
                    users.length > 0 && (

                        <div className="users-table-container">

                            <table className="users-table">

                                <thead>

                                    <tr>

                                        <th>
                                            No.
                                        </th>

                                        <th>
                                            ID
                                        </th>

                                        <th>
                                            Username
                                        </th>

                                        <th>
                                            Email
                                        </th>

                                        <th>
                                            Phone
                                        </th>

                                        <th>
                                            Role
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {users.map((user, index) => (

                                        <tr key={user.id}>

                                            <td>
                                                {index + 1}
                                            </td>

                                            <td>
                                                {user.id}
                                            </td>

                                            <td>
                                                {user.username}
                                            </td>

                                            <td>
                                                {user.email || "-"}
                                            </td>

                                            <td>
                                                {user.phone || "-"}
                                            </td>

                                            <td>

                                                <select
                                                    className="role-select"
                                                    value={user.role}
                                                    onChange={(e) =>
                                                        handleRoleChange(
                                                            user.id,
                                                            e.target.value
                                                        )
                                                    }
                                                >

                                                    <option value="CUSTOMER">
                                                        CUSTOMER
                                                    </option>

                                                    <option value="ADMIN">
                                                        ADMIN
                                                    </option>

                                                    <option value="OWNER">
                                                        OWNER
                                                    </option>

                                                    <option value="STAFF">
                                                        STAFF
                                                    </option>

                                                </select>

                                            </td>

                                            <td>

                                                <button
                                                    className="delete-user-btn"
                                                    onClick={() =>
                                                        handleDeleteUser(
                                                            user.id,
                                                            user.username
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </td>
                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

            </div>
        </>

    );
}


export default AdminUsers;