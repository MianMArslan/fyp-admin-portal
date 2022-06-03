import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import SearchBar from "material-ui-search-bar";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import ActivityLoader from "../../ActivityLoader/index";
import { GET } from "../../../services/httpClient";
import "./styles.css";

function Location() {
  const [rows, setRows] = useState();
  const [searched, setSearched] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getLocationLog();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getLocationLog = async () => {
    let result = await GET("/admin/locationLog");
    if (result) {
      setRows(result);
      setIsLoading(false);
    }
  };
  const requestSearch = (searchedVal) => {
    if (!searchedVal) getLocationLog();
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
    getLocationLog();
  };

  return (
    <>
      <div className="listContainer">
        <SearchBar
          value={searched}
          className="searchbar"
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 500 }}>
            {isLoading && <ActivityLoader />}
            <Table style={{ width: "900px" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      width: "5%",
                      padding: "5px",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    ID
                  </TableCell>
                  <TableCell
                    style={{
                      width: "10%",
                      padding: "5px",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    style={{
                      width: "10%",
                      padding: "5px",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    Latitude
                  </TableCell>
                  <TableCell
                    style={{
                      width: "10%",
                      padding: "5px",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    Longitude
                  </TableCell>
                  <TableCell
                    style={{
                      width: "10%",
                      padding: "5px",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    ipAddress
                  </TableCell>
                </TableRow>
              </TableHead>
              {!isLoading && (
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow key={row.id}>
                        <TableCell style={{ width: "5%", padding: "15px" }}>
                          {row.id}
                        </TableCell>
                        <TableCell style={{ width: "5%", padding: "15px" }}>
                          {row?.user?.firstName} {row?.user?.lastName}
                        </TableCell>
                        <TableCell
                          style={{
                            padding: "15px",
                            wordWrap: "break-word",
                            maxWidth: "500px",
                          }}
                        >
                          {row.lat}
                        </TableCell>
                        <TableCell
                          style={{
                            padding: "15px",
                            wordWrap: "break-word",
                            maxWidth: "500px",
                          }}
                        >
                          {row.long}
                        </TableCell>
                        <TableCell
                          style={{
                            padding: "15px",
                            wordWrap: "break-word",
                            maxWidth: "500px",
                          }}
                        >
                          {row.ipAddress}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
          {!isLoading && (
            <TablePagination
              rowsPerPageOptions={[5]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Paper>
      </div>
    </>
  );
}

export default Location;
