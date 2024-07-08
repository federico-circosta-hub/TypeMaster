import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar } from "@mui/material";
import TableRowsLoader from "./TableRowsLoader";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    //backgroundColor: "rgba(64,71,160,1)",
    color: theme.palette.common.white,
    fontWeight: 800,
    fontSize: 24,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 20,
    color: theme.palette.common.white,
    fontWeight: 600,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const RankingTable = ({ header = [], rows = [], isDataLoading }) => {
  return (
    <TableContainer
      component={Paper}
      style={{ borderRadius: 15 }}
      className="bg-gradient-to-b from-table_bg1 to-table_bg2 bg-opacity-25 xl:w-3/5 lg:w-3/5 md:4/5 sm:w-11/12"
    >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {header.map((column) => (
              <StyledTableCell>{column.name}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {isDataLoading ? (
            <TableRowsLoader rowsNum={5} />
          ) : (
            rows.map((row) => (
              <StyledTableRow key={row.name}>
                {header.map((column) => (
                  <StyledTableCell>
                    <div className="flex gap-4 items-center">
                      {column.colId === "username" && (
                        <Avatar
                          sx={{
                            width: 52,
                            height: 52,
                            bgcolor: row["usercolor"],
                          }}
                        />
                      )}
                      {column.colId === "createdAt"
                        ? new Date(row[column.colId]).toLocaleDateString()
                        : row[column.colId]}
                    </div>
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RankingTable;
