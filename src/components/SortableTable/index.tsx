import { useState, useEffect } from "react";
import { Box, TextField, IconButton, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import type { City } from "api/getCities";

interface SortableTableProps {
  cities: City[];
  isLoading: boolean;
}

interface SearchBoxProps {
  clearSearch: () => void;
  onChange: () => void;
  value: string;
}

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
  },
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

const SearchBox = ({ clearSearch, onChange, value }: SearchBoxProps) => {
  return (
    <TextField
      variant="standard"
      value={value}
      onChange={onChange}
      placeholder="Search for a city"
      sx={{
        paddingTop: 1,
        marginX: 6,
        marginY: 3,
        alignSelf: "center",
        width: "60%",
        backgroundColor: "#f4f4f3",
      }}
      InputProps={{
        startAdornment: (
          <SearchIcon
            fontSize="small"
            sx={{ marginX: 0.5, marginBottom: 0.5 }}
          />
        ),
        endAdornment: (
          <IconButton
            title="Clear"
            aria-label="Clear"
            size="small"
            style={{ visibility: value ? "visible" : "hidden" }}
            onClick={clearSearch}
            sx={{ marginX: 0.5, marginBottom: 0.5 }}
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        ),
      }}
    />
  );
};

const NoRows = () => {
  return (
    <Box display="flex" justifyContent="center">
      <Typography align="center" variant="h5" component="p" marginTop={5}>
        No cities found
      </Typography>
    </Box>
  );
};

export const SortableTable = ({ cities, isLoading }: SortableTableProps) => {
  const [searchText, setSearchText] = useState("");
  const [rows, setRows] = useState<any[]>(cities);

  const handleSearch = (searchValue: string) => {
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
        disableRowSelectionOnClick
        loading={isLoading}
        onProcessRowUpdateError={(error) => error.message}
        aria-label="city table"
        columns={columns}
        rows={rows}
        slots={{ toolbar: SearchBox, noRowsOverlay: NoRows }}
        autoPageSize
        pageSizeOptions={[10]}
        sx={{
          border: "none",
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f4f4f3",
          },
        }}
        slotProps={{
          toolbar: {
            value: searchText,
            onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
              handleSearch(event.target.value),
            clearSearch: () => handleSearch(""),
          },
        }}
      />
    </Box>
  );
};
