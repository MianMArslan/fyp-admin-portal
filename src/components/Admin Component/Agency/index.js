import React, { useState, useEffect } from "react";
import "./agency.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AgencyName } from "../mockdata";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import SearchBar from "material-ui-search-bar";
import { GET } from "../../../services/httpClient";
import ActivityLoader from "../../ActivityLoader/index";
import CancelIcon from "@mui/icons-material/Cancel";
import VerifiedIcon from "@mui/icons-material/Verified";
import Dialog from "../../Dialog/index";

const AgencyDetail = () => {
  const [rows, setRows] = useState([]);
  const [searched, setSearched] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    getAllActiveUsers();
  }, []);
  async function getAllActiveUsers() {
    let res = await GET("/admin/agency", { params: { isDeleted: false } });
    if (res) {
      setRows(res);
      setIsLoading(false);
    }
  }

  const requestSearch = (searchedVal) => {
    if (!searchedVal) getAllActiveUsers();
    const filteredRows = rows.filter((row) => {
      return Object.keys(row).some(
        (firstName) =>
          row.firstName.toLowerCase().includes(searchedVal) ||
          row.firstName.toUpperCase().includes(searchedVal)
      );
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    getAllActiveUsers();
  };

  const handleUpdateClick = async (row) => {
    setData(row);
    setOpenDialog(true);
  };

  return (
    <>
      <div className="home">
        <div className="listContainer">
          <SearchBar
            value={searched}
            className="searchbar"
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
          />

          <TableContainer component={Paper} className="usertable">
            {isLoading && <ActivityLoader />}
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Verify</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!isLoading &&
                  rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell className="tableCell">
                        {row.firstName}
                      </TableCell>
                      <TableCell className="tableCell">
                        {row.lastName}
                      </TableCell>
                      <TableCell className="tableCell">
                        {row.isVerified === "email" ? (
                          <VerifiedIcon sx={{ color: "#fb9e00" }} />
                        ) : (
                          <CancelIcon sx={{ color: "red" }} />
                        )}
                      </TableCell>
                      <TableCell>
                        <button
                          className="editbtn"
                          title="Edit"
                          onClick={() => handleUpdateClick(row)}
                        >
                          <EditOutlined />
                        </button>
                        <button className="deletebtn" title="Delete">
                          <DeleteOutlined />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {openDialog && (
            <Dialog
              setOpenDialog={setOpenDialog}
              getRecord={getAllActiveUsers}
              dialogData={data}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AgencyDetail;
