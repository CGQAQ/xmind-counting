import { useEffect, useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";
import { DateTimePicker } from "@mui/x-date-pickers";

export type NewBillDialogProps = {
  open: boolean;
  categories: Array<Category>;
  onDiscard: () => void;
  onCreate: (newBill: Bill) => void;
};

function NewBillDialog({
  open,
  categories,
  onDiscard,
  onCreate,
}: NewBillDialogProps) {
  const [newBill, setNewBill] = useState<Bill>({
    type: 0,
    time: Date.now(),
    category: categories[0]?.id,
    amount: 0,
  });

  function reset() {
    setNewBill({
      type: 0,
      time: Date.now(),
      category: categories[0].id,
      amount: 0,
    });
  }

  function onTypeChange(type: number) {
    setNewBill({ ...newBill, type });
  }

  function onTimeChange(month: number) {
    setNewBill({ ...newBill, time: month });
  }

  function onCategoryChange(category: string) {
    setNewBill({ ...newBill, category });
  }

  return (
    <Dialog open={open}>
      <DialogTitle>New Bill</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To create a new bill, please fill out the form below.
        </DialogContentText>
        <FormGroup>
          <FormControl sx={{ minWidth: 200, marginBlock: 1 }}>
            <InputLabel id="category-id">Category</InputLabel>
            <Select
              label="Category"
              labelId="category-id"
              defaultValue={0}
              onChange={(it) =>
                onTypeChange(Number.parseInt(it.target.value as string))
              }
            >
              {[
                ["支出", 0],
                ["收入", 1],
              ].map(([name, id]) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200, marginBlock: 1 }}>
            <InputLabel id="category-id">Category</InputLabel>
            <Select
              label="Category"
              labelId="category-id"
              defaultValue={categories[0]?.id}
              onChange={(it) => onCategoryChange(it.target.value)}
            >
              {categories.map((it) => (
                <MenuItem key={it.id} value={it.id}>
                  {it.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200, marginBlock: 1 }}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="Time"
              value={newBill.time}
              onChange={(newValue) => {
                onTimeChange(newValue);
              }}
            />
          </FormControl>

          <FormControl sx={{ minWidth: 200, marginBlock: 1 }}>
            <TextField
              label="Amount"
              value={newBill.amount}
              onChange={(it) =>
                setNewBill({
                  ...newBill,
                  amount: Number.parseInt(it.target.value as string),
                })
              }
            />
          </FormControl>
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onDiscard();
            reset();
          }}
        >
          Discard
        </Button>
        <Button
          onClick={() => {
            onCreate(newBill);
            reset();
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewBillDialog;
