import { Link } from 'react-router'
import './App.css'
import swal from 'sweetalert';

function App() {

  const handleAddUser = (e) => {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)
    const name = data.get("name")
    const email = data.get("email")

    const  user = {
      name,
      email
    }
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        'content-type': "application/json"
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      swal("User added!", "You have successfully added new user!", "success" );
      console.log(data)
      form.reset()
    })
  }

  return (
    <>
      <h1>This is first MongoDb database CRUD</h1>
      
        <fieldset>
          <legend>Create user for mongodb database</legend>
          <form onSubmit={handleAddUser}>
            <label htmlFor="">Name:</label>
            <input type="text" name="name" id="" />
            <br />
            <label htmlFor="">Email:</label>
            <input type="email" name="email" id="" />
            <br />
            <button type="submit">Add user</button>
          </form>
          <Link to={"/users"}>See all users</Link>
        </fieldset>
      
    </>
  )
}

export default App
