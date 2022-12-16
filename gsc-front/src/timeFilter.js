import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function ConfirmationDialogRaw(props) {
  const {
    onClose,
    value: valueProps,
    open,
    startDate,
    endDate,
    setEndDate,
    setStartDate,
  } = props;
  const [value, setValue] = useState(valueProps);
  const [pickStartDate, setPickStartDate] = useState(startDate);
  const [pickEndDate, setPickEndDate] = useState(endDate);

  // let sd = startDate.getDate();
  // let sm = startDate.getMonth() + 1;
  // let sy = startDate.getFullYear();
  // let ed = endDate.getDate();
  // let em = endDate.getMonth() + 1;
  // let ey = endDate.getFullYear();
  // let textTime =
  //   sd + " thg " + sm + ", " + sy + "-" + ed + " thg " + em + ", " + ey;

  useEffect(() => {
    if (!open) {
      setValue(value);
      setPickEndDate(endDate);
      setPickStartDate(startDate);
    }
  }, [value, open, endDate, startDate]);

  const handleCancel = () => {
    onClose();
  };

  const handleSubmitCustomValue = (pickStartDate, pickEndDate, value) => {
    setStartDate(pickStartDate);
    setEndDate(pickEndDate);
    onClose(value);
  };

  const handleOk = () => {
    value === "Tùy Chỉnh"
      ? (pickEndDate > pickStartDate ||
          pickEndDate.toLocaleString() === pickStartDate.toLocaleString()) &&
        handleSubmitCustomValue(pickStartDate, pickEndDate, value)
      : onClose(value);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Dialog onClose={handleCancel} open={open}>
      <DialogTitle>Phạm vi ngày</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          value={value}
          aria-label="menu"
          name="menu"
          onChange={handleChange}
        >
          <FormControlLabel
            value="7 ngày vừa qua"
            control={<Radio />}
            label="7 ngày vừa qua"
          />
          <FormControlLabel
            value="28 ngày vừa qua"
            control={<Radio />}
            label="28 ngày vừa qua"
          />
          <FormControlLabel
            value="3 tháng trước"
            control={<Radio />}
            label="3 tháng truớc"
          />
          <FormControlLabel
            value="6 tháng trước"
            control={<Radio />}
            label="6 tháng trước"
          />
          <FormControlLabel
            value="12 tháng trước"
            control={<Radio />}
            label="12 tháng trước"
          />
          <FormControlLabel
            value={"Tùy Chỉnh"}
            control={<Radio />}
            label="Tùy chỉnh"
          />
          <Box
            component="form"
            sx={{
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => setValue("Tùy Chỉnh")}
          >
            <Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disableHighlightToday
                  label="Ngày bắt đầu"
                  inputFormat="YYYY-MM-DD"
                  value={pickStartDate}
                  onChange={(newValue) => {
                    newValue = new Date(newValue);
                    setPickStartDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField variant="standard" {...params} />
                  )}
                />
              </LocalizationProvider>
            </Box>
            <Box sx={{ margin: "12px" }}>-</Box>
            <Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disableHighlightToday
                  label="Ngày kết thúc"
                  inputFormat="YYYY-MM-DD"
                  value={pickEndDate}
                  onChange={(newValue) => {
                    newValue = new Date(newValue);
                    setPickEndDate(newValue);
                  }}
                  renderInput={(params) =>
                    pickEndDate > pickStartDate ||
                    pickEndDate.toLocaleString() ===
                      pickStartDate.toLocaleString() ? (
                      <TextField variant="standard" {...params} />
                    ) : (
                      <TextField
                        sx={{ ".MuiFormHelperText-root": { color: "#d50000" } }}
                        color="error"
                        helperText="Ngày kết thúc trước ngày bắt đầu"
                        variant="standard"
                        {...params}
                      />
                    )
                  }
                />
              </LocalizationProvider>
            </Box>
          </Box>
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Hủy
        </Button>
        <Button onClick={handleOk}>Áp dụng</Button>
      </DialogActions>
    </Dialog>
  );
}

const TimeFilter = ({ startDate, endDate, setStartDate, setEndDate }) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("7 ngày vừa qua");

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue) => {
    setOpen(false);

    if (newValue) {
      setText(newValue);
      let lastDay = new Date();
      lastDay.setDate(lastDay.getDate() - 1);
      let last2Days = new Date();
      last2Days.setDate(last2Days.getDate() - 2);
      switch (newValue) {
        case "7 ngày vừa qua":
          let lastWeek = new Date();
          lastWeek.setDate(lastWeek.getDate() - 8);
          setStartDate(lastWeek);
          setEndDate(last2Days);
          break;
        case "28 ngày vừa qua":
          let lastMonth = new Date();
          lastMonth.setDate(lastMonth.getDate() - 29);
          setStartDate(lastMonth);
          setEndDate(last2Days);
          break;
        case "3 tháng trước":
          let last3Months = new Date();
          last3Months.setDate(last3Months.getDate() - 1);
          last3Months.setMonth(last3Months.getMonth() - 3);
          setStartDate(last3Months);
          setEndDate(last2Days);
          break;
        case "6 tháng trước":
          let last6Months = new Date();
          last6Months.setDate(last6Months.getDate() - 1);
          last6Months.setMonth(last6Months.getMonth() - 6);
          setStartDate(last6Months);
          setEndDate(last2Days);
          break;
        case "12 tháng trước":
          let last12Months = new Date();
          last12Months.setDate(last12Months.getDate() - 1);
          last12Months.setMonth(last12Months.getMonth() - 12);
          setStartDate(last12Months);
          setEndDate(last2Days);
          break;
        default:
      }
    }
  };

  return (
    <List role="group">
      <ListItem
        sx={{
          padding: "0px",
          marginRight: "10px",
          width: "fit-content",
          "&& .Mui-selected": {
            backgroundColor: "#d3e3fd",
          },
          "&& .Mui-selected:hover": {
            backgroundColor: "#a8c7fa",
          },
        }}
        aria-haspopup="true"
        aria-controls="menu"
        onClick={handleClickListItem}
      >
        <ListItemButton selected sx={{ borderRadius: "32px" }}>
          {"Ngày: " + text}
          &nbsp;&nbsp;&nbsp;
          <EditOutlinedIcon fontSize="small" />
        </ListItemButton>
      </ListItem>
      <ConfirmationDialogRaw
        id="menu"
        keepMounted
        open={open}
        onClose={handleClose}
        value={text}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
    </List>
  );
};

export default TimeFilter;
