import React , {useState} from 'react';
import './agency.css'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {AgencyName} from "../mockdata";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import SearchBar from "material-ui-search-bar";


const AgencyDetail = () => {

  const [rows, setRows] = useState(AgencyName);
  const [searched, setSearched] = useState("");

  const requestSearch = (searchedVal) => {
    const filteredRows = AgencyName.filter((row) => {
      return Object.keys(row).some((agencyname) =>
        row.agencyname.toLowerCase().includes(searchedVal) ||
          row.agencyname.toUpperCase().includes(searchedVal)

      );
    }
    );
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  return (
    <>    
    <div className='home'>
    <div className='listContainer'>
    <SearchBar
          value={searched}
        className='searchbar'
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />

    <TableContainer component={Paper} 
    className="usertable"
    >
      <Table sx={{ minWidth: 650 }}aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Agency Name</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow>
              <TableCell>{row.id}</TableCell>
              <TableCell className = "tableCell" key = {row.id}>{row.agencyname}</TableCell>
              <TableCell>
                    <button
                      className="editbtn"
                      title='Edit'
                    >
                      <EditOutlined />
                    </button>
                    <button
                      className="deletebtn"
                      title="Delete"
                    >
                      <DeleteOutlined />
                    </button>
                  </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </div>
    </>
  );
};

export default AgencyDetail; 