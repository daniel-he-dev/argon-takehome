import { Button } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  {
    field: "NCT Number",
    headerName: "NCT Number",
    width: 150,
    renderCell: (params) => (
      <Button
        component="a"
        href={params.row["Study URL"]}
        target="_blank"
        rel="noopener noreferrer"
      >
        {params.value}
      </Button>
    ),
  },
  { field: "Study Title", headerName: "Study Title", width: 200 },
  { field: "Acronym", headerName: "Acronym", width: 150 },
  { field: "Study Status", headerName: "Study Status", width: 150 },
  { field: "Brief Summary", headerName: "Brief Summary", width: 300 },
  { field: "Study Results", headerName: "Study Results", width: 150 },
  { field: "Conditions", headerName: "Conditions", width: 200 },
  { field: "Interventions", headerName: "Interventions", width: 200 },
  {
    field: "Primary Outcome Measures",
    headerName: "Primary Outcome Measures",
    width: 200,
  },
  {
    field: "Secondary Outcome Measures",
    headerName: "Secondary Outcome Measures",
    width: 200,
  },
  {
    field: "Other Outcome Measures",
    headerName: "Other Outcome Measures",
    width: 200,
  },
  { field: "Sponsor", headerName: "Sponsor", width: 200 },
  { field: "Collaborators", headerName: "Collaborators", width: 200 },
  { field: "Sex", headerName: "Sex", width: 100 },
  { field: "Age", headerName: "Age", width: 100 },
  { field: "Phases", headerName: "Phases", width: 100 },
  { field: "Enrollment", headerName: "Enrollment", width: 150 },
  { field: "Funder Type", headerName: "Funder Type", width: 150 },
  { field: "Study Type", headerName: "Study Type", width: 150 },
  { field: "Study Design", headerName: "Study Design", width: 200 },
  { field: "Other IDs", headerName: "Other IDs", width: 150 },
  { field: "Start Date", headerName: "Start Date", width: 150 },
  {
    field: "Primary Completion Date",
    headerName: "Primary Completion Date",
    width: 150,
  },
  { field: "Completion Date", headerName: "Completion Date", width: 150 },
  { field: "First Posted", headerName: "First Posted", width: 150 },
  {
    field: "Results First Posted",
    headerName: "Results First Posted",
    width: 150,
  },
  {
    field: "Last Update Posted",
    headerName: "Last Update Posted",
    width: 150,
  },
  { field: "Locations", headerName: "Locations", width: 200 },
  { field: "Study Documents", headerName: "Study Documents", width: 200 },
];
