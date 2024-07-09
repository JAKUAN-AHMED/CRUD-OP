import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const User = () => {
  const loadedUser = useLoaderData();
  const [users, setUser] = useState(loadedUser);
  console.log("from server side data", loadedUser);
  const hanldleRemoveUser=_id=>{
    //delete user send requ to server
    fetch(`http://localhost:3000/users/${_id}`,{
        method:'DELETE'
    })
    .then(res=>res.json())
    .then(data=>{
        if(data.deletedCount>0)
        {
            alert('successfully deleted user')
            const remaining=users.filter(user=>user._id!==_id)
            setUser(remaining);
        }
    })
  }
  return (
    <div className="max-w-5xl mx-auto text-center mt-12 mb-12 border rounded shadow-red-300  font-mono">
      <h2 className="text-3xl font-medium ">
        Number of Users : {users.length}
      </h2>
      {users.map((user) => (
        <div
          key={user._id}
          className="flex gap-6 text-center items-center justify-center p-4 border rounded shadow-lg"
        >
          <p>{user.name}</p>
          {"->"}
          <p>{user.email}</p>
          <button
            onClick={()=>hanldleRemoveUser(user._id)}
            className="btn btn-square w-20 h-5 bg-yellow-200"
          >
            Remove
          </button>
          <Link to={"/"}>
            <button className="btn btn-square w-20 h-5  bg-yellow-200">
              Back
            </button>
          </Link>
          <Link to={`/update/${user._id}`}>
            <button className="btn btn-square w-20 h-5  bg-yellow-200">
              Update
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default User;
