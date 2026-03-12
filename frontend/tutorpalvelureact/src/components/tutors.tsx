/*import { useEffect, useState } from "react";
import type { appUser } from "../types";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

// Tutoreiden listaaminen DataGridillä
export default function AppUser() {
  const [appUser, setappUser] = useState<appUser[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/tutors")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setappUser(data);
      })
      .catch((err) => console.error("Error fetching tutors:", err));
  }, []);

  const columns: GridColDef[] = [
    { field: "firstname", headerName: "First name", width: 130 },
    { field: "lastname", headerName: "Last name", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "school", headerName: "School", width: 150 },
    { field: "city", headerName: "City", width: 100 },
    {
      field: "subjects",
      headerName: "Subjects",
      width: 200,
      valueGetter: (params: any) =>
        params.row?.subjects
          ?.map((subject: { subjectname: string }) => subject.subjectname)
          .join(", ") || "",
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={appUser}
        columns={columns}
        getRowId={(row) => row.id}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5, page: 0 },
          },
        }}
        pageSizeOptions={[5]}
      />
    </div>
  );
}
*/

import { useEffect, useState } from "react";
import type { appUser } from "../types";
import { Card, CardContent, Typography, Chip, Box } from "@mui/material";
import Grid from "@mui/material/Grid";

export default function AppUser() {
  const [appUser, setAppUser] = useState<appUser[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/tutors")
      .then((response) => response.json())
      .then((data) => {
        setAppUser(data);
      })
      .catch((err) => console.error("Error fetching tutors:", err));
  }, []);

  return (
    <Grid container spacing={3} sx={{ p: 3 }} justifyContent="center">
      {appUser.map((tutor) => (
        <Grid
          size={{ xs: 12, sm: 6, md: 4 }}
          key={tutor.id}
          sx={{
            display: "flex",
            minWidth: 280,
            maxWidth: 400,
          }}
        >
          <Card
            sx={{
              width: "100%",
              borderRadius: 3,
              boxShadow: 3,
              backgroundColor: "#f4f7f3",
              border: "1px solid #d6e2d3",
              transition: "0.2s",
              "&:hover": {
                boxShadow: 6,
                transform: "translateY(-4px)",
              },
            }}
          >
            <CardContent>
              <Typography variant="h6">
                {tutor.firstname} {tutor.lastname}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {tutor.school} • {tutor.city}
              </Typography>

              <Typography sx={{ wordBreak: "break-word" }}>
                📧 {tutor.email}
              </Typography>

              <Typography sx={{ wordBreak: "break-word" }}>
                📱 {tutor.phone}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
