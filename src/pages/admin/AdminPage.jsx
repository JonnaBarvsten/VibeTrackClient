import {useEffect, useState} from 'react';
import{getUsers, deleteUser} from '../../services/AdminService'

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
    </>
)
}