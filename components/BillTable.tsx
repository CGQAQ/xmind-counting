import { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
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

const sorts: readonly [undefined, "asc", "desc"] = [
  undefined,
  "asc",
  "desc",
] as const;

function BillTable({ data, categories }: BillTableProps) {
  const [amountSortVal, setAmountSortVal] = useState(0);

  function amountSort() {
    console.log("Sort by amount");
    setAmountSortVal((amountSortVal) => (amountSortVal + 1) % 3);
  }

  function getSorted() {
    const sortVal = sorts[amountSortVal];
    if (sortVal === undefined) {
      return data;
    }

    return [...data].sort((a, b) => {
      if (sortVal === "asc") {
        return a.amount - b.amount;
      } else {
        return b.amount - a.amount;
      }
    });
  }

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
            <TableCell align="right">
              <TableSortLabel
                active={!!sorts[amountSortVal]}
                direction={sorts[amountSortVal]}
                onClick={amountSort}
              >
                Amount
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...getSorted()].map((row) => (
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
