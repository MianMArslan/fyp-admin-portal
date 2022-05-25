import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {Contactdetail} from "../mockdata";

function Suggestion() {

  return (
    <>
      <TableContainer>
        <Table style={{ width: "900px" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "5%", padding: "5px" , fontWeight: "bold" , fontSize: "16px"}}>ID</TableCell>
              <TableCell style={{ width: "10%", padding: "5px" , fontWeight: "bold" , fontSize: "16px" }}>
                Name
              </TableCell>
              <TableCell style={{ width: "10%", padding: "5px" , fontWeight: "bold" , fontSize: "16px" }}>
                Email 
              </TableCell>
              <TableCell style={{ width: "20%", padding: "5px" , fontWeight: "bold" , fontSize: "16px" }}>
                Suggestion
              </TableCell>
            </TableRow>
          </TableHead>
            <TableBody>
              {Contactdetail.map((row) => (
                <TableRow key={row.id}>
                  <TableCell style={{ width: "5%", padding: "5px" }}>
                    {row.id}
                  </TableCell>
                  <TableCell style={{ width: "5%", padding: "5px" }}>
                    {row.name}
                  </TableCell>
                  <TableCell style={{ width: "10%", padding: "5px" }}>
                    {row.email}
                  </TableCell>
                  <TableCell style={{padding: "5px", wordWrap: "break-word" , maxWidth: "500px"}}>
                    {row.suggestion}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Suggestion;