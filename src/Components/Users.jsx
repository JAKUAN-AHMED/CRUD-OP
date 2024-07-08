import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Users = () => {
    const LoadedUsers=useLoaderData();
    const [users,setUser]=useState(LoadedUsers);
    console.log('loadedUsers',LoadedUsers)
    console.log('remaining users',users)
    const hanldleRemove=(_id)=>{
        
        console.log('delete',_id);
        fetch(`http://localhost:3000/users/${_id}`,{
            method:'DELETE'
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.deletedCount>0)
            {
                alert('Successfully deleted')
                const remainings=users.filter(user=>user._id!==_id);
                setUser(remainings)
            }
           
        })
    }
    return (
      <div>
        <h2>{users.length}</h2>
        {users.map((user) => (
          <div key={user._id}>
            {user.name} {user.email}{" "}
            <Link to={`/update/${user._id}`}>
              <button>Update</button>
            </Link>
            <button onClick={() => hanldleRemove(user._id)}>delete</button>
            <hr />
          </div>
        ))}
      </div>
    );
};

export default Users;