import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import Paper from "@mui/material/Paper";
import format from "date-fns/format";

export type BillTableProps = {
  data: Array<Bill>;
  categories: Array<Category>;
};

export const typeHash = {
  0: "支出",
  1: "收入",
};

function BillTable({ data, categories }: BillTableProps) {
  return (
    <TableContainer
      sx={{ width: 800, maxHeight: 500, marginTop: 1 }}
      component={Paper}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={JSON.stringify(row)}>
              <TableCell
                align="right"
                sx={{ color: row.type === 1 ? "green" : "red" }}
              >
                {typeHash[row.type]}
              </TableCell>
              <TableCell align="right">
                {format(row.time, "yyyy-MM-dd HH:mm:ss")}
              </TableCell>
              <TableCell align="right">
                {categories.find((it) => it.id === row.category)?.name ?? ""}
              </TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell align="right" colSpan={3}>
              Total Amount:
            </TableCell>
            <TableCell align="right">
              {
                data.reduce((a, p) => ({ amount: a.amount + p.amount }), {
                  amount: 0,
                }).amount
              }
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default BillTable;
