import {useEffect, useState} from 'react';
import{getUsers, deleteUser} from '../../services/AdminService'
import UserList from '../../components/userList/UserList';
import Header  from '../../components/header/Header';
import {Box} from '@mui/material';

export default function AdminPage(){

    const[users, setUsers] = useState([])
    
    const loadUsers = async () => {
        try{
            const data = await getUsers();
            setUsers(data);
        } 
        catch(error){
            console.log("Kunde inte hämta användare: ", error)
        }
    };

    useEffect(() => {
        loadUsers();
    },[]);

    async function handleDeleteUser(id){
        try{
            await deleteUser(id);
            await loadUsers();
        }
        catch(error){
            console.log("Kunde inte radera användare: ", error);
        }
    }



    return(
        <>
         <Header/>

         <Box
            sx={{
                minHeight: 'calc(100vh - 64px)',
                padding: 3,
                backgroundColor: '#DCD6E8'
            }}
         >
        <UserList
            users={users}
            onDelete={handleDeleteUser}
        />
        </Box>
    </>
)
}