import { useState, useEffect } from "react";
import { Box, TextField, IconButton, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowDown from "../../assets/ArrowDown.svg";
import ArrowUp from "../../assets/ArrowUp.svg";
import SearchIcon from "../../assets/Search.svg";
import SortIcon from "../../assets/Sort.svg";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CustomIcon } from "../CustomIcon";
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
    width: 150,
  },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "nameAscii",
    headerName: "Name Ascii",
    width: 150,
  },
  {
    field: "country",
    headerName: "Country",
    width: 150,
  },
  {
    field: "countryIso3",
    headerName: "Country Code",
    width: 150,
  },
  {
    field: "capital",
    headerName: "Capital",
    width: 150,
  },
  {
    field: "population",
    headerName: "Population",
    type: "number",
    width: 150,
  },
];

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
        startAdornment: <CustomIcon alt="search" icon={SearchIcon} />,
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

const UnsortedIcon = () => {
  return <CustomIcon alt="sort" icon={SortIcon} />;
};

export const SortableTable = ({ cities, isLoading }: SortableTableProps) => {
  const [searchText, setSearchText] = useState("");
  const [rows, setRows] = useState<any[]>(cities);

  const handleSearch = (searchValue: string) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(searchValue, "i");
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
        height: 720,
        width: "90%",
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
        slots={{
          toolbar: SearchBox,
          noRowsOverlay: NoRows,
          columnUnsortedIcon: UnsortedIcon,
        }}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 25, 50, 100]}
        sx={{
          border: "none",
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f4f4f3",
          },
          // TODO: remove the hover on the header
          "&.MuiDataGrid-root .MuiDataGrid-row:hover": {
            backgroundColor: "inherit",
          },
          "&.MuiDataGrid-root .Mui-hovered": {
            backgroundColor: "inherit",
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
