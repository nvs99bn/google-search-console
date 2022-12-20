import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

const CsvDownload = ({ data }) => {
  const scvMaker = (data) => {
    let csvRows = [];
    let fakeData = JSON.parse(JSON.stringify(data));
    if (Array.isArray(fakeData) && fakeData.length > 0) {
      const headers = Object.keys(fakeData[0]);
      csvRows.push(headers.join(", "));
      fakeData.forEach((item) => {
        item.ctr = (parseFloat(item.ctr) * 100).toFixed(1) + "%";
        item.position = parseFloat(item.position).toFixed(1);
        csvRows.push(Object.values(item).flat().join(", "));
      });
      return csvRows.join("\n");
    }
    return csvRows;
  };
  const download = (csv) => {
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("target", "_blank");
    // a.setAttribute("download", "csvDownload");
    // console.log(a);
    a.click();
  };
  const csvData = scvMaker(data);
  const handleDownload = () => {
    if (csvData.length !== 0) {
      download(csvData);
    } else {
      alert("No data");
    }
  };
  return (
    <ListItem
      sx={{
        padding: "0px",
        marginRight: "10px",
        width: "fit-content",
        height: "fit-content",
        "&& .Mui-selected": {
          backgroundColor: "#d3e3fd",
        },
        "&& .Mui-selected:hover": {
          backgroundColor: "#a8c7fa",
        },
      }}
    >
      <ListItemButton
        selected
        sx={{
          borderRadius: "32px",
        }}
        onClick={handleDownload}
      >
        Download CSV&nbsp;&nbsp;&nbsp;
        <DownloadOutlinedIcon fontSize="small" />
      </ListItemButton>
    </ListItem>
  );
};

export default CsvDownload;
