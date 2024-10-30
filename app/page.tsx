"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button, Paper } from "@mui/material";
import {
  DataGrid,
  GridRowsProp,
  GridPaginationModel,
  GridSortModel,
} from "@mui/x-data-grid";
import { SearchResponse } from "@elastic/elasticsearch/lib/api/types";
import { Study } from "./types";
import { columns } from "./tableColumns";
import qs from "qs";

const SearchTable: React.FC = () => {
  // Set Search requirements
  const [query, setQuery] = useState("");
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);

  // Resulting data
  const [results, setResults] = useState<SearchResponse<Study>>();

  useEffect(() => {
    fetchResults();
  }, [paginationModel, sortModel]);

  const fetchResults = async () => {
    try {
      const { page, pageSize } = paginationModel;
      const { data }: { data: SearchResponse<Study> } = await axios.get(
        `/api/search`,
        {
          params: {
            query: query.length ? query : undefined,
            from: page * pageSize,
            size: pageSize,
            sort: sortModel.map(({ field, sort }) => ({ [field]: sort })),
          },
          paramsSerializer: function (params) {
            return qs.stringify(params, { encode: false });
          },
        }
      );
      setResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleSearch = () => {
    setPaginationModel((m) => ({ ...m, page: 0 })); // Reset page to 0 on new search
    fetchResults();
  };

  const handlePageChange = (paginationModel: GridPaginationModel) => {
    setPaginationModel(paginationModel);
  };

  const handleSortChange = (sortModel: GridSortModel) => {
    setSortModel(sortModel);
  };

  const rows: GridRowsProp =
    results?.hits.hits.map((r) => r._source).filter((r) => !!r) ?? [];

  return (
    <div className="flex-col p-8">
      <Paper className="mb-8 p-4 flex gap-4 flex-row">
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={handleSearch}
        >
          Search
        </Button>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          helperText="Search by NCT Number, Study Title, Conditions, or Brief Summary"
        />
      </Paper>
      <Paper style={{ height: 600, width: "100%", backgroundColor: "white" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pagination
          paginationMode="server"
          getRowId={(row) => row["NCT Number"]}
          rowCount={
            typeof results?.hits.total === "number"
              ? results.hits.total
              : results?.hits.total?.value ?? 0
          }
          paginationModel={paginationModel}
          onPaginationModelChange={handlePageChange}
          onSortModelChange={handleSortChange}
        />
      </Paper>
    </div>
  );
};

export default SearchTable;
