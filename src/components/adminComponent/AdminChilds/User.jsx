import {useEffect, useState} from 'react';
import AddUserPopup from "../newUserPopup.jsx";
import {DeleteUserreq, GetUsers} from "../../../API/AdminApi.js";
import Pagination from "../../Pagination.jsx";

const User = () => {
    const [users, setUsers] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(5);

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    }
    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setRefresh(!refresh);
    }

    const UserFetch = async () => {
        const data = await GetUsers(page,10);
        setUsers(data.items);
        setTotalPages(data.totalPages);
    }

    const DeleteUser = async (id) => {
        await DeleteUserreq(id);
        setRefresh((prevState) => !prevState);
    }

    useEffect(() => {
        UserFetch();

    }, [])

    useEffect(() => {
        UserFetch();
    }, [page,refresh])

    return (
        <div className="col-12">
            <div className="row px-3 justify-content-between">
                <h3 className="col-6">Kullanıcılar</h3>
                <button className="col-2 add-btn" onClick={handleOpenPopup}>Kullanıcı Ekle</button>
                <AddUserPopup
                    isOpen={isPopupOpen}
                    onClose={handleClosePopup}
                    reflesh={(b) => {
                        if (b === true) {
                            setRefresh(!refresh);
                        }
                    }}
                />
            </div>
            <table className="table text-center mt-5 px-4 table-striped table-dark">
                <thead>
                <tr>
                    <th scope="col">Kullanıcı ID</th>
                    <th scope="col">Kullanıcı Adı</th>
                    <th scope="col">Rol ID</th>
                    <th scope="col">İşlem</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user, index) => (
                    <tr key={index}>
                        <th scope="row">{user.uid}</th>
                        <td>{user.username}</td>
                        <td>{user.roleId}</td>
                        <td>
                            <button className="delete-btn" onClick={() => DeleteUser(user.uid)}>Sil</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination pageNum={page} setPageNum={setPage} lastPage={totalPages}/>

        </div>

    );
};

export default User;