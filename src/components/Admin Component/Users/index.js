import React, { useState, useEffect } from "react";
import "./user.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import SearchBar from "material-ui-search-bar";
import { GET, DELETE } from "../../../services/httpClient";
import ActivityLoader from "../../ActivityLoader/index";
import CancelIcon from "@mui/icons-material/Cancel";
import VerifiedIcon from "@mui/icons-material/Verified";
import Dialog from "../../Dialog/index";
import TablePagination from "@mui/material/TablePagination";
import Snackbar from "../../Snackbar/index";

const UserDetail = () => {
  const [rows, setRows] = useState([]);
  const [searched, setSearched] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [data, setData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [type, setType] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState(false);
  const [open, setOpen] = React.useState(true);

  useEffect(() => {
    getAllActiveUsers();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  async function getAllActiveUsers() {
    let res = await GET("/user/", { params: { isDeleted: false } });
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

  const handleDeleteClick = async (row) => {
    let res = await DELETE("/admin/user", { params: { id: row.id } });
    if (res?.code === 200) {
      setType("success");
      setOpenSnackbar(true);
      setSnackbarMessage(res?.message);
      getAllActiveUsers();
    } else {
      setType("error");
      setOpenSnackbar(true);
      setSnackbarMessage(res?.message);
    }
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
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer className="usertable">
              {isLoading && <ActivityLoader />}
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Email</TableCell>
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
                        <TableCell className="tableCell">{row.email}</TableCell>
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
                          <button
                            className="deletebtn"
                            title="Delete"
                            onClick={() => handleDeleteClick(row)}
                          >
                            <DeleteOutlined />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          {openDialog && (
            <Dialog
              setOpenDialog={setOpenDialog}
              getRecord={getAllActiveUsers}
              dialogData={data}
            />
          )}
          {openSnackbar && (
            <Snackbar
              open={open}
              setOpen={setOpen}
              type={type}
              message={snackbarMessage}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default UserDetail;
