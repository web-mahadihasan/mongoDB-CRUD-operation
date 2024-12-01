import { useState } from "react";
import { Link, useLoaderData } from "react-router";
import swal from 'sweetalert';

const Users = () => {
    const loadUser = useLoaderData()
    const [users, setUsers] = useState(loadUser)

    const handleRemove = (id) => {
        
        swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this User!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            fetch(`http://localhost:5000/users/${id}`, {
                method: "DELETE"
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                const remainingUser = users.filter(user => user._id !== id)
                setUsers(remainingUser)
            })
            swal("Successfull! User has been deleted!", {
                icon: "success",
          });
        } else {
          swal("User don't be deleted!");
        }
      });
    }

    // swal({
    //     title: "Are you sure?",
    //     text: "Once deleted, you will not be able to recover this imaginary file!",
    //     icon: "warning",
    //     buttons: true,
    //     dangerMode: true,
    //   })
    //   .then((willDelete) => {
    //     if (willDelete) {
    //       swal("Poof! Your imaginary file has been deleted!", {
    //         icon: "success",
    //       });
    //     } else {
    //       swal("Your imaginary file is safe!");
    //     }
    //   });

    return (
        <div>
            <h2>Our all user list here</h2>
            <fieldset>
                <legend>Users</legend>
                <Link to={"/"}>Add user</Link>
                {
                    users?.map(user => <div className="card" key={user._id}>
                        <h4>{user.name}</h4>
                        <p>{user.email}</p>
                        <div>
                            <Link to={`/users/${user._id}`}>update</Link>
                            <button onClick={() => handleRemove(user._id)}>Remove</button>
                        </div>
                    </div>)
                }
            </fieldset>
        </div>
    );
};

export default Users;