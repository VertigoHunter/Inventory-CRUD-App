import Inventory_Runner_Logo from './Inventory_Runner_Logo.png';
import trashbin from './trashbin.png';
import './App.css';
import React, { useEffect, useState} from "react";

function App() {
  /* THIS SECTION HOLDS STATE VARIABLES*/
  const [loginFlag, setLoginFlag] = useState(); // This determines whether you see Inventory Manager buttons.
  const [editFlag, setEditFlag] = useState();   // This determines whether you have enabled Edit Mode.
  const [viewFlag, setViewFlag] = useState();   // This determines whether you are seeing the inventory or an item.

  const [inventory, setInventory] = useState();         // This displays and controls the full inventory.
  const [selectedItem, setSelectedItem] = useState();   // This displays the selected item.

  const [createFirstName, setCreateFirstName] = useState(); // This stores the entered user account information for signup.
  const [createLastName, setCreateLastName] = useState();   // This stores the entered user account information for signup.
  const [createUserName, setCreateUserName] = useState();   // This stores the entered user account information for signup.
  const [createPassword, setCreatePassword] = useState();   // This stores the entered user account information for signup.

  const [loginUserName, setLoginUserName] = useState(); // This stores the username for authentication.
  const [loginPassword, setLoginPassword] = useState(); // This stores the password for authentication.

  const [itemName, setItemName] = useState();       // This stores the item name for inventory adjustment.
  const [description, setDescription] = useState(); // This stores the description for inventory adjustment.
  const [quantity, setQuantity] = useState();       // This stores the quantity for inventory adjustment.


  /* THIS SECTION HOLDS METHODS AND ACTIONS */
  useEffect(()=> {
    fetch('http://localhost:8081/item')
    .then(response => response.json())
    .then(inventoryData => setInventory(inventoryData))
  },[])

  // useEffect(() => {
  //   post('http://localhost:8081/user_info/')
  // })

  const addUser = () =>{
    fetch('http//localhost:8081/user_info/', {
      method: 'POST',
      body: JSON.stringify({
        first_name: createFirstName,
        last_name: createLastName,
        user_name: createUserName,
        password: createPassword
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((response) => response.json())
    .then((json) => console.log(json));
  }
  // SignUp ~ Account Creation Handlers
  // const addFirstName = (event) => {
  //   const value = event.target.value;
  //   setCreateFirstName(value);
  // };

  // const addLastName = (event) => {
  //   const value = event.target.value;
  //   setCreateLastName(value);
  // };

  // const addUserName = (event) => {
  //   const value = event.target.value;
  //   setCreateUserName(value);
  // };

  // const addPassword = (event) => {
  //   const value = event.target.value;
  //   setCreatePassword(value);
  // };

  const deleteItem = (item_ID) =>{
    fetch(`http://localhost:8081/item/${item_ID}`, {
        method: 'DELETE',
      });
  }

  /* THIS SECTION PROVIDES WEB PAGE LAYOUT AND STRUCTURE */
  return !inventory ? null : (
    <div className="App">
      <header className="App-header">
        <img src={Inventory_Runner_Logo} className="App-logo" alt="logo" />
      </header>

      <div className="begin-container">
        <div className="signUp-panel">
          <p>SIGN UP SECTION.</p>
          <input type="text" name="first" onChange={(e) => { setCreateFirstName(e.target.value) }} value={createFirstName} placeholder="First Name"/>
          <input type="text" name="last" onChange={(e) => { setCreateLastName(e.target.value) }} value={createLastName} placeholder="Last Name"/>
          <input type="text" name="username" onChange={(e) => { setCreateUserName(e.target.value) }} value={createUserName} placeholder="User Name"/>
          <input type="password" name="password" onChange={(e) => { setCreatePassword(e.target.value) }} value={createPassword} placeholder="Password"/>
          <br></br>
          <button onClick={() => {addUser()}}>Create Account</button>
        </div>

        <div className="login-panel">
          <p>LOGIN SECTION.</p>
          <input type="text" name="username_login" value="" placeholder="User Name"/>
          <input type="password" name="password_login" value="" placeholder="Password"/>
          <br></br>
          <button onClick={() => { }}>Login</button>
        </div>
      </div>

      <div className="edit-bar">
        <p>EDIT MODE ACTIONS</p>
        <button onClick={() => { }}>Create Item</button>
        <button onClick={() => { }}>Edit Item</button>
        <button onClick={() => { }}>Delete Item</button>
      </div>

      <div className="view-bar">
        <p>VIEW ACTIONS</p>
        <button onClick={() => { }}>View Inventory</button>
        <button onClick={() => { }}>View Item</button>
      </div>

      <div className='inventoryTable'>
        <table>
          <tr className='columntitle'>
            <th>Item ID</th>
            <th>User ID</th>
            <th>Item Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Delete</th>
          </tr>

          {inventory.map((inventory, index) => <tr><td>{inventory.item_ID}</td> <td>{inventory.user_info_ID}</td> <td>{inventory.item_name}</td>  <td>{inventory.description}</td> <td>{inventory.quantity}</td>
            <td><button onClick={() => { deleteItem(inventory.item_ID) }} className="trashbutton"><img src={trashbin} alt="trashbin" className='trashimage'></img></button></td>
          </tr>)}
        </table>
      </div>
    </div>
  );
}

export default App;
