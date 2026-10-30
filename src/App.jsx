
import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {

  const [user, setUser] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {

    let ignore = false;

    const load = async () => {

      setLoader(true);
      setError("");

      try {

        const res = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (res.ok) {

          const data = await res.json();

          if (!ignore) {
            setUser(data);
          }

        } else {
          throw new Error(`Status ${res.status}`);
        }

      } catch (err) {

        if (!ignore) {
          setError(err.message);
        }

      } finally {

        if (!ignore) {
          setLoader(false);
        }

      }

    };

    load();

    return () => {
      ignore = true;
    };

  }, []);

  return (
    <>

      <header>
        <h1>User List</h1>
        <p>Total Users: {user.length}</p>
      </header>

      {loader ? (

        <h2>Page is Loading...</h2>

      ) : error ? (

        <h2>{error}</h2>

      ) : (

        <div className="user-container">

          {user.map((element) => (

            <div className="user-card" key={element.id}>

              <h2>{element.name}</h2>

              <h3>Personal Details</h3>

              <p>ID: {element.id}</p>
              <p>Username: {element.username}</p>
              <p>Email: {element.email}</p>
              <p>Phone: {element.phone}</p>
              <p>Website: {element.website}</p>

              <h3>Address Details</h3>

              <p>Street: {element.address.street}</p>
              <p>Suite: {element.address.suite}</p>
              <p>City: {element.address.city}</p>
              <p>Zipcode: {element.address.zipcode}</p>

              <h3>Geo Location</h3>

              <p>Latitude: {element.address.geo.lat}</p>
              <p>Longitude: {element.address.geo.lng}</p>

              <h3>Company Details</h3>

              <p>Company: {element.company.name}</p>
              <p>Catch Phrase: {element.company.catchPhrase}</p>
              <p>Business: {element.company.bs}</p>

            </div>

          ))}

        </div>

      )}

    </>

  );

};

export default App;
