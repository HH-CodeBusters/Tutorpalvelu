import { useEffect, useState } from "react";
import type { appUser } from "../types";
import { Card, CardContent, Typography, Chip, Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid";

export default function AppUser() {
  const [appUser, setAppUser] = useState<appUser[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<Set<string>>(new Set());
  const [availableSubjects, setAvailableSubjects] = useState<string[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/tutors`)
    //("http://localhost:8080/api/tutors")
      .then((response) => response.json())
      .then((data) => {
        setAppUser(data);
        
        
        const subjects = new Set<string>();
        data.forEach((tutor: appUser) => {
          tutor.subjects?.forEach((subject) => {
            subjects.add(subject.subjectname);
          });
        });
        
        setAvailableSubjects(Array.from(subjects).sort());
      })
      .catch((err) => console.error("Virhe tuutorien hakemisessa:", err));
  }, []);

  
  const filteredTutors = 
    selectedSubjects.size === 0
      ? appUser
      : appUser.filter((tutor) =>
          tutor.subjects?.some((subject) =>
            selectedSubjects.has(subject.subjectname)
          )
        );

  
  const toggleSubject = (subject: string) => {
    const newSelected = new Set(selectedSubjects);
    if (newSelected.has(subject)) {
      newSelected.delete(subject);
    } else {
      newSelected.add(subject);
    }
    setSelectedSubjects(newSelected);
  };

  const clearFilters = () => {
    setSelectedSubjects(new Set());
  };

  return (
    <>
      <Box sx={{ backgroundColor: "#ffffff", paddingTop: 4, paddingBottom: 3 }}>
        <Box sx={{ maxWidth: "1400px", margin: "0 auto", px: 3 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 3, 
              fontWeight: 700,
              color: "#1a3a1a",
              fontSize: "1.5rem"
            }}
          >
            Suodata tuutorit aineen mukaan
          </Typography>
          
          <Box 
            sx={{ 
              display: "flex", 
              flexWrap: "wrap", 
              gap: 1.5, 
              mb: 2.5,
              alignItems: "center"
            }}
          >
            {availableSubjects.map((subject) => (
              <Chip
                key={subject}
                label={subject}
                onClick={() => toggleSubject(subject)}
                variant={selectedSubjects.has(subject) ? "filled" : "outlined"}
                sx={{
                  cursor: "pointer",
                  padding: "8px 4px",
                  fontSize: "0.95rem",
                  backgroundColor: selectedSubjects.has(subject) ? "#57884d" : "#ffffff",
                  color: selectedSubjects.has(subject) ? "#ffffff" : "#57884d",
                  border: "2px solid #57884d",
                  transition: "all 0.2s ease",
                  fontWeight: selectedSubjects.has(subject) ? 600 : 500,
                  "&:hover": {
                    backgroundColor: selectedSubjects.has(subject) ? "#4a7040" : "#f0f5ed",
                    transform: "translateY(-2px)",
                  },
                }}
              />
            ))}
          </Box>

          {selectedSubjects.size > 0 && (
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Button 
                onClick={clearFilters}
                size="small"
                sx={{ 
                  color: "#57884d", 
                  textTransform: "none",
                  fontSize: "0.9rem",
                  padding: "4px 0",
                  "&:hover": {
                    backgroundColor: "transparent",
                    textDecoration: "underline"
                  }
                }}
              >
                Tyhjennä suodattimet
              </Button>
              <Typography 
                variant="body2" 
                sx={{ color: "#666", fontSize: "0.9rem" }}
              >
                Näytetään {filteredTutors.length} / {appUser.length} tuutoria
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* Tuutorikortit */}
      <Box sx={{ minHeight: "calc(100vh - 200px)", pb: 4 }}>
        <Grid container spacing={3} sx={{ p: 3, maxWidth: "1400px", margin: "0 auto" }} justifyContent="center">
        {filteredTutors.length === 0 ? (
  <Typography
    variant="h6"
    sx={{ mt: 4, textAlign: "center", width: "100%" }}
  >
    Ei löytynyt tuutoreita 😕
  </Typography>
) : (
  filteredTutors.map((tutor) => (
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
      )))}
      </Grid>
      </Box>
    </>
  );
}