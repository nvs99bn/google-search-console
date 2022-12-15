import { useState } from "react";
import TimeFilter from "./time-filter.js";
import EnhancedTable from "./Table.js";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Input = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <TextField
        sx={{ marginTop: "10px" }}
        fullWidth
        label="Url"
        id="url"
        helperText="Enter right url"
        onChange={props.handleChange}
        value={props.value}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ marginTop: "10px", marginBottom: "10px" }}
      >
        Submit
      </Button>
    </form>
  );
};

const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

const App = () => {
  const [data, setData] = useState(null);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let endTime = new Date();
  endTime.setDate(endTime.getDate() - 2);
  endTime = endTime.toLocaleDateString("en-CA");
  let startTime = new Date();
  startTime.setDate(startTime.getDate() - 8);
  startTime = startTime.toLocaleDateString("en-CA");
  const [startDate, setStartDate] = useState(startTime);
  const [endDate, setEndDate] = useState(endTime);

  const postData = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("url", value);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    fetch("http://localhost:8000/gsc", {
      method: "POST",
      body: formData,
      // mode: "no-cors",
    })
      .then((response) => {
        response.json();
        console.log(response.json());
        setIsLoading(false);
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        alert("Your url is wrong");
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postData();
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <Input
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        value={value}
      />
      <TimeFilter
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      {isLoading ? <LoadingSpinner /> : <EnhancedTable data={data} />}
    </div>
  );
};

export default App;
