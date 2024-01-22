import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import TextField from "@mui/material/TextField";

const Employee = () => {
  const [data, setData] = useState([]);
  const [newEntry, setNewEntry] = useState({
    name: "",
    email: "",
    mobile: "",
    department: "",
    designation: "",
  });
  const [searchId, setSearchId] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://653686dbbb226bb85dd244f8.mockapi.io/employee"
      );
      if (response.ok) {
        const data = await response.json();
        setData(data);
      } else {
        console.log("Failed to fetch data");
      }
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  const handleInputChange = (e) => {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
  };

  const handlePost = async () => {
    try {
      const response = await fetch(
        "https://653686dbbb226bb85dd244f8.mockapi.io/employee",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEntry),
        }
      );

      if (response.ok) {
        fetchData();
        setNewEntry({
          name: "",
          email: "",
          mobile: "",
          department: "",
          designation: "",
        });
      } else {
        console.log("Failed to post");
      }
    } catch (error) {
      console.log("Error posting data", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://653686dbbb226bb85dd244f8.mockapi.io/employee/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setData((prevData) => prevData.filter((item) => item.id !== id));
      } else {
        console.log("Failed to delete");
      }
    } catch (error) {
      console.log("Error in deleting the data", error);
    }
  };

  const filteredData = data.filter((item) => item.id.includes(searchId));

  return (
    <>
      <TextField
        label="Search by ID"
        variant="outlined"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        style={{ margin: "20px" }}
      />
      <div>
        <h3>Add new Entry</h3>
        <div style={{ backgroundColor: "black", width: "800px",padding:'2px' }}>
          <input
            type="text"
            name="name"
            value={newEntry.name}
            onChange={handleInputChange}
            placeholder="Enter a name"
          />
          <input
            type="text"
            name="email"
            value={newEntry.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
          <input
            type="text"
            name="mobile"
            value={newEntry.mobile}
            onChange={handleInputChange}
            placeholder="Mobile no."
          />
          <input
            type="text"
            name="department"
            value={newEntry.department}
            onChange={handleInputChange}
            placeholder="Department"
          />
          <Button onClick={handlePost} variant="outlined" sx={{margin:'2px'}}>
            Add Entry
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            padding: "3px",
          }}
        >
          {filteredData.map((item) => (
            <Card
              key={item.id}
              sx={{
                width: 345,
                border: "1px solid black",
                margin: "3px",
                backgroundColor: "black",
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={`${process.env.PUBLIC_URL}/employee.jpg`}
                alt="Dummy Image"
                sx={{ color: "white" }}
              />
              <CardContent>
                <Typography variant="body2" color="white">
                  ID: {item.id}
                </Typography>
                <Typography variant="body2" color="white">
                  Name: {item.name}
                </Typography>
                <Typography variant="body2" color="white">
                  Email: {item.email}
                </Typography>
                <Typography variant="body2" color="white">
                  Mobile no: {item.mobile}
                </Typography>
                <Typography variant="body2" color="white">
                  Department: {item.department}
                </Typography>
                <Typography variant="body2" color="white">
                  Designation: {item.designation}
                </Typography>
              </CardContent>
              <Button onClick={() => handleDelete(item.id)}>Delete</Button>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Employee;
