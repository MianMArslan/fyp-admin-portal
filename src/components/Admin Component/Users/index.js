import React , {useState} from 'react';
import './user.css'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {User} from "../mockdata"

const UserDetail = () => {

const [search , setSearch] =  useState('')
  return (
    <>
    <div className='home'>
    <div className='listContainer'>
        <input type = "text" 
         className='searchbar'
         placeholder = "Search"
         onChange={(e) => setSearch(e.target.value)} />
    <TableContainer component={Paper} 
    className="usertable"
    >
      <Table sx={{ minWidth: 650 }}aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>User Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {User.filter((row) => 
          row.username.toLowerCase().includes(search)||
          row.username.toUpperCase().includes(search)
            ).map((row) => (
            <TableRow>
              <TableCell>{row.id}</TableCell>
              <TableCell className="tableCell" key = {row.id}>{row.username}</TableCell>
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

export default UserDetail; 