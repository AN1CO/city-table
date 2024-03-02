import { useEffect, useCallback, useState, useMemo } from "react";
import type { ChangeEvent } from "react";
import type { City } from "api/getCities";
import { getCities } from "api/getCities";
import { Table } from "./components";
import { Box, Typography } from "@mui/material";
import "./App.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [error, setError] = useState<Error>();

  const runSearch = useCallback(async (term: string) => {
    try {
      const searchResult = await getCities({ searchTerm: term });
      setCities(searchResult);
    } catch (err: any) {
      setError(err);
    }
  }, []);

  useEffect(() => {
    runSearch(searchTerm);
  }, [runSearch, searchTerm]);

  const onSearchTermChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.currentTarget.value);
    event.preventDefault();
  };

  return (
    <Box display="flex" flexDirection="column">
      <Typography
        gutterBottom
        component="h1"
        variant="h2"
        align="center"
        marginTop={1}
      >
        City List
      </Typography>
      <form>
        <label htmlFor="search">Search</label>
        <input
          id="search"
          name="search"
          type="text"
          onChange={() => onSearchTermChange}
        />
      </form>
      <Table cities={cities} />
    </Box>
  );
};

export default App;
