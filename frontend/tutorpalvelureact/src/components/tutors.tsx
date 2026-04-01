import { useEffect, useState } from "react";
import type { appUser } from "../types";
import { Card, CardContent, Typography } from "@mui/material";
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
              <Typography
                sx={{
                  wordBreak: "break-word",
                  color: "#57884d",
                }}
              >
                {tutor.subjects
                  ?.map((subject) => subject.subjectname)
                  .join(", ")}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
