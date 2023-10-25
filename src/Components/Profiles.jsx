


import {useState, useEffect} from "react";
import ProfileCard  from "./ProfileCard";
import "./Profiles.css";


const Profiles = () => {
    const [profiles, setProfiles] = useState(null);
    const [profilesData, setProfilesData] = useState(null);


// function to fetch data from github api
const fetchData = async() => {
    const response = await fetch("https://api.github.com/users");
    
    const data= await response.json();
    setProfiles(data);
    setProfilesData(data);
}

useEffect (() => {
    fetchData();
}, []);

// search form management
const [searchText, setSearchText] = useState("");


// filter profiles based on search text
const filteredProfiles = profiles?.filter(({login}) => {
    return login.toLowerCase().includes(searchText.toLowerCase
    ());
});

const handleSearch = (event) => {
    event.preventDefault();
    setProfilesData(filteredProfiles);
};

//console.log("all data", filteredProfiles);



  return (
    <>
    <div className="searchForm">
        <form>
            <input
            type="text" 
            placeholder="Search..." 
            value={searchText}
            onChange={(event) => setSearchText(event.target.
                value) }
             />     
            <button type="type" onClick={handleSearch}>Search</button>      
        </form>
    </div>
     <div className="grid">
        {profilesData?.map(({login, id, avatar_url}) => {
            return (
                <ProfileCard
                key={id}
                username={login}
                image={avatar_url}
                />
            );
        })};
    </div>
    </> 
  );
}

export default Profiles;