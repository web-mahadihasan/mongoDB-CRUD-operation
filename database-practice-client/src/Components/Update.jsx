import { Link, useLoaderData, useNavigate } from "react-router";
import swal from 'sweetalert';

const Update = () => {
    const loadUser = useLoaderData()
    const navigate = useNavigate()

    const handleUpdateInfo = (e) => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const email = form.email.value
        const updateInfo = {
            name,
            email
        }
        fetch(`http://localhost:5000/users/${loadUser._id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateInfo)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.modifiedCount > 0){
                swal("Successfull!", "You updated info sucessfully!", "success" );
                navigate("/users")
                form.reset()
            }
        })
    }
    return (
        <div>
            <h2>Here is update user for {loadUser.name}</h2>
            <fieldset className="card">
                <legend>Updata your information</legend>
                <form onSubmit={handleUpdateInfo}>
                    <label htmlFor="">Name:</label>
                    <input type="text" name="name" defaultValue={loadUser.name} id="" />
                    <br />
                    <label htmlFor="">Email:</label>
                    <input type="email" name="email" defaultValue={loadUser.email} id="" />
                    <br />
                    <button type="submit">Update Info</button>
                </form>
                <Link to={"/users"}>Back</Link>
            </fieldset>
        </div>
    );
};

export default Update;