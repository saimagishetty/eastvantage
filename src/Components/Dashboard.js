import { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {
    const [userDetails, setUserDetails] = useState({});

    const getUserDetails = async () => {
        const resp = await axios.get('https://randomuser.me/api');
        //here We can directly set to useState & then we can proceed as per mentioned in the assignment mentioned to use localStorages we are using here.
        let resData = {};

        // Creating user Data obj 
        let userName = resp.data.results[0].name
        resData.userName = userName.title+". "+userName.first+ " "+userName.last
        resData.userEmail = resp.data.results[0].email
        resData.gender = resp.data.results[0].gender
        resData.age = resp.data.results[0].dob.age
        let location = resp.data.results[0].location
        resData.location = location.city+", "+location.state+", "+location.country+", "+location.postcode
        //---------------------------------------------------------------------------------

        // user Data into locat storage
        resData = JSON.stringify(resData);
        localStorage.setItem("userData", resData);

        let userData = localStorage.getItem("userData");
        userData = JSON.parse(userData);
        //----------------------------------------------------------------------------------

        setUserDetails(userData);
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <div className="Dashboard">
            <div className="container">
                <h1>User Details</h1>
                <div className="user-details">
                    <div>
                        <label>Full Name:</label>
                        <span id="fullname">{userDetails.userName}</span>
                    </div>
                    <div>
                        <label>Email:</label>
                        <span id="email">{userDetails.userEmail}</span>
                    </div>
                    <div>
                        <label>Age:</label>
                        <span id="age">{userDetails.age}</span>
                    </div>
                    <div>
                        <label>Location:</label>
                        <span id="location">{userDetails.location}</span>
                    </div>
                    <div>
                        <button onClick={getUserDetails}>Refresh Data</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;