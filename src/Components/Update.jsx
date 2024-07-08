import { useLoaderData } from "react-router-dom";

const Update = () => {
    const loadedUser=useLoaderData();
    const hanldleUpdate=e=>{
        e.preventDefault();
        const form=e.target;
        const name=form.name.value;
        const email=form.email.value;
        console.log(name,email);
        const Updateuser={name,email}
        //send data to server
        fetch(`http://localhost:3000/users/${loadedUser._id}`, {
            method:'PUT',
            headers:{
            'content-type': 'application/json',

            },
            body:JSON.stringify(Updateuser)

        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if(data.modifiedCount>0)
            {
                alert('data updated successfully')
            }
          });
    }
    return (
      <div>
        <h2>Update information of {loadedUser.name}</h2>
        <form onSubmit={hanldleUpdate}>
          <input type="text" name="name" defaultValue={loadedUser?.name} id="" />
          <br />
          <input type="email" name="email" defaultValue={loadedUser?.email} id="" />
          <br />
          <button type="submit">Update</button>
        </form>
      </div>
    );
};

export default Update;

/**
 * step-1 create new route pass single data
 * step-2 get or read data from server single data from single id
 * step-3 add a button to users components add link to go to update 
 * components
 * step-4 add a form and get all data from form then console it to 
 * dom
 * *
 */
