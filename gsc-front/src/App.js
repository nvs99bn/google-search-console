import { useState } from "react";
import axios from "axios";
import TimeFilter from "./timeFilter.js";
import CsvDownload from "./download.js";
import EnhancedTable from "./table.js";
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
  let startTime = new Date();
  startTime.setDate(startTime.getDate() - 8);
  startTime.setSeconds(startTime.getSeconds() - 1);
  const [startDate, setStartDate] = useState(startTime);
  const [endDate, setEndDate] = useState(endTime);

  const postData = () => {
    setIsLoading(true);
    axios
      .post(
        (process.env.REACT_APP_ENDPOINT ??
          "http://localhost:8000/") +
          "gsc/get-report-search-console",
        {
          url: value,
          startDate: startDate.toLocaleDateString("en-CA"),
          endDate: endDate.toLocaleDateString("en-CA"),
        }
      )
      .then((response) => {
        // console.log(response);
        setData(response.data);
        setIsLoading(false);
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
      <Box sx={{ display: "inline-flex", alignItems: "center" }}>
        <TimeFilter
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        <CsvDownload data={data} />
      </Box>
      {isLoading ? <LoadingSpinner /> : <EnhancedTable data={data} />}
    </div>
  );
};

export default App;
