import { Link, useLoaderData } from "react-router-dom";

const Update = () => {
    const loadedUser=useLoaderData();
    console.log('single user',loadedUser)
    const hanldleUpdate=e=>{
        e.preventDefault();
        const form=e.target;
        const name=form.name.value;
        const email=form.email.value;
        const updatedUser={name,email};
        fetch(`http://localhost:3000/update/${loadedUser._id}`,{
            method:'PUT',
            headers:{
                'content-type' : 'application/json'
            },
            body:JSON.stringify(updatedUser)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.modifiedCount>0)
            {
                alert('successfully updated users info')
            }
        })
    }
    return (
      <div className="max-w-5xl mx-auto bg-slate-100 border rounded shadow-lg w-[400px] h-[400px] mt-12 mb-12 text-center">
        <h2 className="flex items-center justify-center text-4xl font-bold mt-4">
          Update User
        </h2>
        <form
          onSubmit={hanldleUpdate}
          className="grid grid-rows-3 items-center justify-center mt-12 gap-2 border-2 border-purple-600 rounded m-4 p-4"
        >
          <input
            className="w-40  border-2 border-purple-600 rounded"
            type="text"
            name="name"
            placeholder="Name"
            defaultValue={loadedUser?.name}
            id=""
          />
          <input
            className="w-40 border-2 border-purple-600 rounded"
            type="email"
            name="email"
            placeholder="Email"
            defaultValue={loadedUser?.email}
            id=""
          />
          <button
            className="btn bg-yellow-200 w-full btn-square border-2
          border-purple-600 rounded"
          >
            Update
          </button>
          <Link to={"/users"}>
            <button
              className="btn bg-yellow-200 w-full btn-square border-2
          border-purple-600 rounded"
            >
              Users
            </button>
          </Link>
        </form>
      </div>
    );
};

export default Update;