import { useState, useEffect } from "react";
import { Box, TextField, IconButton, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowDown from "../../assets/ArrowDown.svg";
import ArrowUp from "../../assets/ArrowUp.svg";
import Search from "../../assets/Search.svg";
import LastPage from "../../assets/LastPage.svg";
import FirstPage from "../../assets/FirstPage.svg";
import ChevronLeft from "../../assets/ChevronLeft.svg";
import ChevronRight from "../../assets/ChevronRight.svg";
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

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
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

const UnsortedIcon = () => {
  return <CustomIcon alt="sort" icon={SortIcon} />;
};

const AscendingIcon = () => {
  return <CustomIcon alt="ascending" icon={ArrowUp} />;
};

const DescendingIcon = () => {
  return <CustomIcon alt="descending" icon={ArrowDown} />;
};

const TablePaginationActions = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
}: TablePaginationActionsProps) => {
  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={(event) => {
          onPageChange(event, page + 1);
        }}
        disabled={page === 0}
        aria-label="first page"
      >
        <CustomIcon icon={FirstPage} />
      </IconButton>
      <IconButton
        onClick={(event) => {
          onPageChange(event, page - 1);
        }}
        disabled={page === 0}
        aria-label="previous page"
      >
        <CustomIcon icon={ChevronLeft} />
      </IconButton>
      <IconButton
        onClick={(event) => {
          onPageChange(event, page + 1);
        }}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <CustomIcon icon={ChevronRight} />
      </IconButton>
      <IconButton
        onClick={(event) => {
          onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
        }}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        <CustomIcon icon={LastPage} />
      </IconButton>
    </Box>
  );
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
        startAdornment: <CustomIcon alt="search" icon={Search} />,
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
          columnSortedAscendingIcon: AscendingIcon,
          columnSortedDescendingIcon: DescendingIcon,
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
            backgroundColor: "#fbfafa",
          },

          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#fbfafa",
            borderTop: "none",
          },
          // TODO: remove the hover on the header
          "& .MuiDataGrid-root .MuiDataGrid-row:hover": {
            backgroundColor: "inherit",
          },
          "& .MuiDataGrid-root .Mui-hovered": {
            backgroundColor: "inherit",
          },

          "& .MuiTablePagination-displayedRows": {
            display: "none",
          },
        }}
        slotProps={{
          toolbar: {
            value: searchText,
            onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
              handleSearch(event.target.value),
            clearSearch: () => handleSearch(""),
          },
          pagination: {
            ActionsComponent: TablePaginationActions,
          },
        }}
      />
    </Box>
  );
};
