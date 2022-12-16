import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

const CsvDownload = ({ data }) => {
  const scvMaker = (data) => {
    let csvRows = [];
    if (data) {
      const headers = Object.keys(data[0]);
      csvRows.push(headers.join(", "));
      data.forEach((item) =>
        csvRows.push(Object.values(item).flat().join(", "))
      );
      return csvRows.join("\n");
    }
    return csvRows;
  };
  const download = (csv) => {
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "download.csv");
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
        padding:"0px",
        marginRight:"10px",
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
