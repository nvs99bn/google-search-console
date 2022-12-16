import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

let lastDay = new Date();
let dd = String(lastDay.getDate() - 1).padStart(2, "0");
let mm = String(lastDay.getMonth() + 1).padStart(2, "0");
let yyyy = lastDay.getFullYear();

function ConfirmationDialogRaw(props) {
  const {
    onClose,
    value: valueProps,
    open,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
  } = props;
  const [value, setValue] = useState(valueProps);
  
  useEffect(() => {
    if (!open) {
      setValue(value);
    }
  }, [value, open]);

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Phạm vi ngày</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          value={value}
          aria-label="menu"
          name="menu"
          onChange={handleChange}
        >
          <FormControlLabel
            value="Ngày gần đây nhất"
            control={<Radio />}
            label={
              "Ngày gần đây nhất " +
              "(" +
              dd +
              " tháng " +
              mm +
              ", " +
              yyyy +
              ")"
            }
          />
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
            value={"Tùy chỉnh"}
            control={<Radio />}
            label="Tùy chỉnh"
          />
          <div onClick={() => setValue("Tùy chỉnh")}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Ngày bắt đầu"
                inputFormat="YYYY-MM-DD"
                value={startDate}
                onChange={(newValue) => {
                  let newValue1 = new Date(newValue).toLocaleDateString(
                    "en-CA"
                  );
                  setStartDate(newValue1);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>{" "}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Ngày kết thúc"
                inputFormat="YYYY-MM-DD"
                value={endDate}
                onChange={(newValue) => {
                  let newValue1 = new Date(newValue).toLocaleDateString(
                    "en-CA"
                  );
                  setEndDate(newValue1);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
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
      lastDay = lastDay.toLocaleDateString("en-CA");
      let last2Days = new Date();
      last2Days.setDate(last2Days.getDate() - 2);
      last2Days = last2Days.toLocaleDateString("en-CA");
      switch (newValue) {
        case "Ngày gần đây nhất":
          setStartDate(lastDay);
          setEndDate(lastDay);
          break;
        case "7 ngày vừa qua":
          let lastWeek = new Date();
          lastWeek.setDate(lastWeek.getDate() - 8);
          lastWeek = lastWeek.toLocaleDateString("en-CA");
          setStartDate(lastWeek);
          setEndDate(last2Days);
          break;
        case "28 ngày vừa qua":
          let lastMonth = new Date();
          lastMonth.setDate(lastMonth.getDate() - 29);
          lastMonth = lastMonth.toLocaleDateString("en-CA");
          setStartDate(lastMonth);
          setEndDate(last2Days);
          break;
        case "3 tháng trước":
          let last3Months = new Date();
          last3Months.setDate(last3Months.getDate() - 1);
          last3Months.setMonth(last3Months.getMonth() - 3);
          last3Months = last3Months.toLocaleDateString("en-CA");
          setStartDate(last3Months);
          setEndDate(last2Days);
          break;
        case "6 tháng trước":
          let last6Months = new Date();
          last6Months.setDate(last6Months.getDate() - 1);
          last6Months.setMonth(last6Months.getMonth() - 6);
          last6Months = last6Months.toLocaleDateString("en-CA");
          setStartDate(last6Months);
          setEndDate(last2Days);
          break;
        case "12 tháng trước":
          let last12Months = new Date();
          last12Months.setDate(last12Months.getDate() - 1);
          last12Months.setMonth(last12Months.getMonth() - 12);
          last12Months = last12Months.toLocaleDateString("en-CA");
          setStartDate(last12Months);
          setEndDate(last2Days);
          break;
        default:
      }
    }
  };

  return (
    <List component="div" role="group">
      <ListItem
        button
        divider
        aria-haspopup="true"
        aria-controls="menu"
        onClick={handleClickListItem}
      >
        <ListItemText primary={"Ngày: " + text} />
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
