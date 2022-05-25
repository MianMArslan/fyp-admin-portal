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
import { GET } from "../../../services/httpClient";
import ActivityLoader from "../../ActivityLoader/index";
import "./style.css";
function Suggestion() {
  const [rows, setRows] = useState([]);
  const [searched, setSearched] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => {
    getSuggestions();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getSuggestions = async () => {
    setIsLoading(true);
    let res = await GET("/admin/contactUs");
    if (res) {
      setRows(res);
      setIsLoading(false);
    }
  };

  const requestSearch = (searchedVal) => {
    if (!searchedVal) getSuggestions();
    const filteredRows = rows.filter((row) => {
      return Object.keys(row).some(
        (name) =>
          row.name.toLowerCase().includes(searchedVal) ||
          row.name.toUpperCase().includes(searchedVal)
      );
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    getSuggestions();
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
                    Email
                  </TableCell>
                  <TableCell
                    style={{
                      width: "20%",
                      padding: "5px",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    Suggestion
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.id}>
                      <TableCell style={{ width: "5%", padding: "15px" }}>
                        {row.id}
                      </TableCell>
                      <TableCell style={{ width: "5%", padding: "15px" }}>
                        {row.name}
                      </TableCell>
                      <TableCell style={{ width: "10%", padding: "15px" }}>
                        {row.email}
                      </TableCell>
                      <TableCell
                        style={{
                          padding: "15px",
                          wordWrap: "break-word",
                          maxWidth: "500px",
                        }}
                      >
                        {row.suggestion}
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
      </div>
    </>
  );
}

export default Suggestion;
