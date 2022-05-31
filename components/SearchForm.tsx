import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormGroup from "@mui/material/FormGroup";
import TableFooter from "@mui/material/TableFooter";

export type BillTableProps = {
  categories: Array<Category>;

  onCategoryChange: (category: string) => void;
  onMonthChange: (month: string) => void;
};

function genMonthes() {
  return new Array(12).fill(undefined).map((_, i) => i + 1);
}

function SearchForm({
  categories,
  onCategoryChange,
  onMonthChange,
}: BillTableProps) {
  return (
    <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id="category-id">Month</InputLabel>
        <Select
          label="Category"
          labelId="category-id"
          defaultValue={"*"}
          onChange={(it) => onMonthChange(it.target.value)}
        >
          <MenuItem value="*">ALL</MenuItem>
          {genMonthes().map((it) => (
            <MenuItem key={it} value={it}>
              {it}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 200, marginLeft: 1 }}>
        <InputLabel id="category-id">Category</InputLabel>
        <Select
          label="Category"
          labelId="category-id"
          defaultValue={"*"}
          onChange={(it) => onCategoryChange(it.target.value)}
        >
          <MenuItem value="*">ALL</MenuItem>
          {categories.map((it) => (
            <MenuItem key={it.id} value={it.id}>
              {it.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </FormGroup>
  );
}

export default SearchForm;
