import { Link } from "react-router-dom";
import "./App.css";

function App() {
  const hanldleAddUser=e=>{
    e.preventDefault();
    const form=e.target;
    const name=form.name.value;
    const email=form.email.value;
    const user={name,email};
    console.log('user',user)
    //send user to server
    fetch(`http://localhost:3000/users`,{
      method:'POST',
      headers:{
        'content-type' : 'application/json'
      },
      body:JSON.stringify(user)
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      if(data.insertedId)
      {
        alert('user successfully added')
        form.reset();
      }
    })
  }
  return (
    <div className="max-w-5xl mx-auto bg-slate-100 border rounded shadow-lg w-[400px] h-[400px] mt-12 mb-12 text-center">
      <h2 className="flex items-center justify-center text-4xl font-bold mt-4">
        Home page
      </h2>
      <form
        onSubmit={hanldleAddUser}
        className="grid grid-rows-3 items-center justify-center mt-12 gap-2 border-2 border-purple-600 rounded m-4 p-4"
      >
        <input
          className="w-40  border-2 border-purple-600 rounded"
          type="text"
          name="name"
          placeholder="Name"
          id=""
        />
        <input
          className="w-40 border-2 border-purple-600 rounded"
          type="email"
          name="email"
          placeholder="Email"
          id=""
        />
        <button
          className="btn bg-yellow-200 w-full btn-square border-2
          border-purple-600 rounded"
        >
          Add User
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
}

export default App;
