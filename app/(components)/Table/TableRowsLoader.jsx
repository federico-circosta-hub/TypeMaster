const { TableRow, Skeleton, TableCell } = require("@mui/material");

const TableRowsLoader = ({ rowsNum }) => {
  return [...Array(rowsNum)].map((row, index) => (
    <TableRow key={index}>
      <TableCell component="th" scope="row">
        <Skeleton
          animation="wave"
          variant="text"
          height={50}
          style={{ borderRadius: 15 }}
        />
      </TableCell>
      <TableCell>
        <Skeleton
          animation="wave"
          variant="text"
          height={50}
          style={{ borderRadius: 15 }}
        />
      </TableCell>
      <TableCell>
        <Skeleton
          animation="wave"
          variant="text"
          height={50}
          style={{ borderRadius: 15 }}
        />
      </TableCell>
      <TableCell>
        <Skeleton
          animation="wave"
          variant="text"
          height={50}
          style={{ borderRadius: 15 }}
        />
      </TableCell>
    </TableRow>
  ));
};

export default TableRowsLoader;
