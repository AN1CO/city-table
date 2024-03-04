import { useState, useEffect } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import {
  DataGrid,
  GridColDef,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import type { City } from "api/getCities";

interface SortableTableProps {
  cities: City[];
}

interface SearchBoxProps {
  clearSearch: () => void;
  onChange: () => void;
  value: string;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID" },
  {
    field: "name",
    headerName: "Name",
  },
  {
    field: "nameAscii",
    headerName: "Name Ascii",
  },
  {
    field: "country",
    headerName: "Country",
  },
  {
    field: "countryIso3",
    headerName: "Country Code",
  },
  {
    field: "capital",
    headerName: "Capital",
  },
  {
    field: "population",
    headerName: "Population",
    type: "number",
  },
];

const escapeRegExp = (value: string): string => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

function SearchBox({ clearSearch, onChange, value }: SearchBoxProps) {
  return (
    <div>
      <div>
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
      </div>
      <TextField
        variant="standard"
        value={value}
        onChange={onChange}
        placeholder="Search…"
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: value ? "visible" : "hidden" }}
              onClick={clearSearch}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
      />
    </div>
  );
}

export const SortableTable = ({ cities }: SortableTableProps) => {
  const [searchText, setSearchText] = useState("");
  const [rows, setRows] = useState<any[]>(cities);

  const requestSearch = (searchValue: string) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = cities.filter((row: any) => {
      return Object.keys(row).some((field: any) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setRows(filteredRows);
  };

  useEffect(() => {
    setRows(cities);
  }, [cities]);

  return (
    <Box
      sx={{
        height: 700,
        width: 750,
        margin: 1,
        padding: 1,
        alignSelf: "center",
      }}
    >
      <DataGrid
        aria-label="city table"
        columns={columns}
        rows={rows}
        slots={{ toolbar: SearchBox }}
        autoPageSize
        pageSizeOptions={[10]}
        slotProps={{
          toolbar: {
            value: searchText,
            onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
              requestSearch(event.target.value),
            clearSearch: () => requestSearch(""),
          },
        }}
      />
    </Box>
  );
};
