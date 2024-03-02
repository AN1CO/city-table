import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import type { City } from "api/getCities";

interface TableProps {
  cities: City[];
}

export const Table = ({ cities }: TableProps) => {
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
  return (
    <Box
      sx={{
        height: 700,
        width: 800,
        margin: 1,
        padding: 1,
        alignSelf: "center",
      }}
    >
      <DataGrid
        aria-label="city table"
        columns={columns}
        rows={cities}
        autoPageSize
        pageSizeOptions={[10]}
      />
    </Box>
  );
};
