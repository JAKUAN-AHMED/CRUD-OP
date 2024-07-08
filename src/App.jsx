
import './App.css'

function App() {
 const handleAddUser=e=>{
  e.preventDefault();
  const form=e.target;
  const name=form.name.value;
  const email=form.email.value;
  const user={name,email};
  console.log(user);
  //send data to server
  fetch("http://localhost:3000/users",{
    method:'POST',
    headers:{
      'content-type' : 'application/json'
    },
    body:JSON.stringify(user)
  })
  .then(res=>res.json())
  .then(data=>{
    console.log('client side',data)
    if(data.insertedId)
    {
      alert('Your data added successfully')
      form.reset();
    }
  })
 }
  return (
    <>
      <h1>SIMPLE CRUD</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" placeholder="Name" id="" />
        <br />
        <input type="email" name="email" placeholder="Email" id="" />
        <br />
        <input type="submit" value="Add User" />
      </form>
    </>
  );
}

export default App
