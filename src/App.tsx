import { useEffect, useCallback, useState } from "react";
import type { City } from "api/getCities";
import { getCities } from "api/getCities";
import { SortableTable } from "./components";
import { Box, Typography } from "@mui/material";
import "./App.css";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cities, setCities] = useState<City[]>([]);
  const [error, setError] = useState<Error>();

  const runSearch = useCallback(async () => {
    try {
      const searchResult = await getCities();
      setCities(searchResult);
      setIsLoading(false);
    } catch (err: any) {
      setError(err);
    }
  }, []);

  useEffect(() => {
    runSearch();
  }, [runSearch]);

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
      <SortableTable cities={cities} isLoading={isLoading} />
    </Box>
  );
};

export default App;
