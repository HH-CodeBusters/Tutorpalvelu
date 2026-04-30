import { useState, useEffect } from "react";
import type { appUser, Subject } from "../types";
import { useOutletContext } from "react-router";
import { Typography, TextField, Button, Box, Alert, CircularProgress, Card, CardContent, Grid, Chip, FormControlLabel, Checkbox, Autocomplete, Avatar, Divider, Select, MenuItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import PersonIcon from "@mui/icons-material/Person";
import { updateUser, getAllSubjects } from "../services/user";

const BLANK_FORM_DATA = {
  firstname: "",
  lastname: "",
  phone: "",
  email: "",
  address: "",
  zipcode: "",
  city: "",
  gender: "",
  school: "",
  tutor: false,
};

export default function Profile() {
  const context = useOutletContext<{ user: appUser; setUser: (user: appUser) => void } | null>();
  const user = context?.user || null;
  const setContextUser = context?.setUser;
  
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [allSubjects, setAllSubjects] = useState<Subject[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);
  const [formData, setFormData] = useState(BLANK_FORM_DATA);

  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        phone: user.phone || "",
        email: user.email || "",
        address: user.address || "",
        zipcode: user.zipcode || "",
        city: user.city || "",
        gender: user.gender || "",
        school: user.school || "",
        tutor: user.tutor || false,
      });

      if (user.subjects) {
        setSelectedSubjects(
          user.subjects.map((s) => ({
            id: 0,
            subjectname: s.subjectname,
          }))
        );
      }

      getAllSubjects()
        .then(setAllSubjects)
        .catch((err) => console.error("Error fetching subjects:", err));
    }
  }, [user]);

  if (!user) {
    return <Typography>Et ole kirjautuneena sisään.</Typography>;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Tyhjennä aineet, jos tutor boolean false
    if (name === "tutor" && !checked) {
      setSelectedSubjects([]);
    }
  };

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(undefined);
    setSuccess(undefined);

    try {
      const updateData = {
        ...formData,
        subjects: selectedSubjects,
      };

      const result = await updateUser(updateData);
      setSuccess("Profiili päivitetty onnistuneesti!");
      setEditMode(false);
      
      // Update parent component's user state
      if (result && setContextUser) {
        setContextUser(result);
        setFormData({
          firstname: result.firstname || "",
          lastname: result.lastname || "",
          phone: result.phone || "",
          email: result.email || "",
          address: result.address || "",
          zipcode: result.zipcode || "",
          city: result.city || "",
          gender: result.gender || "",
          school: result.school || "",
          tutor: result.tutor || false,
        });

        if (result.subjects) {
          setSelectedSubjects(
            result.subjects.map((s: any) => ({
              id: s.id,
              subjectname: s.subjectname,
            }))
          );
        }
      }

      setTimeout(() => setSuccess(undefined), 3000);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Profiilin päivitys epäonnistui";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form to original user data
    if (user) {
      setFormData({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        phone: user.phone || "",
        email: user.email || "",
        address: user.address || "",
        zipcode: user.zipcode || "",
        city: user.city || "",
        gender: user.gender || "",
        school: user.school || "",
        tutor: user.tutor || false,
      });

      if (user.subjects) {
        setSelectedSubjects(
          user.subjects.map((s) => ({
            id: 0,
            subjectname: s.subjectname,
          }))
        );
      }
    }
    setEditMode(false);
    setError(undefined);
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: "0 auto", padding: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 3,
        }}
      >
        <Typography variant="h4" component="h1">
          Oma Profiili
        </Typography>
        {!editMode && (
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => setEditMode(true)}
          >
            Muokkaa
          </Button>
        )}
      </Box>

      {error && (
        <Alert
          severity="error"
          sx={{ marginBottom: 2 }}
          onClose={() => setError(undefined)}
        >
          {error}
        </Alert>
      )}

      {success && (
        <Alert
          severity="success"
          sx={{ marginBottom: 2 }}
          onClose={() => setSuccess(undefined)}
        >
          {success}
        </Alert>
      )}

      <Card>
        <CardContent>
          {editMode ? (
            <Box component="form" onSubmit={handleSubmit}>
              {/* Profile Picture Section */}
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 3 }}>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    bgcolor: "primary.main",
                    fontSize: "3rem",
                    marginBottom: 1,
                  }}
                >
                  <PersonIcon sx={{ fontSize: "3rem" }} />
                </Avatar>
                <Typography variant="body2" color="textSecondary">
                  Profiilikuva
                </Typography>
              </Box>

              <Divider sx={{ marginBottom: 3 }} />

              {/* Personal Information Section */}
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Henkilötiedot
              </Typography>
              <Grid container spacing={2} sx={{ marginBottom: 3 }}>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <TextField
                    fullWidth
                    label="Etunimi"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <TextField
                    fullWidth
                    label="Sukunimi"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <Select
                    fullWidth
                    name="gender"
                    value={formData.gender}
                    onChange={handleSelectChange}
                    variant="outlined"
                  >
                    <MenuItem value="Mies">Mies</MenuItem>
                    <MenuItem value="Nainen">Nainen</MenuItem>
                    <MenuItem value="Muunsukupuolinen">Muunsukupuolinen</MenuItem>
                    <MenuItem value="">-</MenuItem>
                  </Select>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <TextField
                    fullWidth
                    label="Sähköposti"
                    value={formData.email}
                    disabled
                    variant="outlined"
                    helperText="Sähköpostia ei voi muuttaa"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <TextField
                    fullWidth
                    label="Puhelinnumero"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    fullWidth
                    label="Koulu"
                    name="school"
                    value={formData.school}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>
              </Grid>

              <Divider sx={{ marginBottom: 3 }} />

              {/* Address Section */}
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Osoitetiedot
              </Typography>
              <Grid container spacing={2} sx={{ marginBottom: 3 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Osoite"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <TextField
                    fullWidth
                    label="Postinumero"
                    name="zipcode"
                    value={formData.zipcode}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <TextField
                    fullWidth
                    label="Kaupunki"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </Grid>
              </Grid>

              <Divider sx={{ marginBottom: 3 }} />

              {/* Tutorointiasetukset */}
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Tutorointiasetukset
              </Typography>
              <Grid container spacing={3} sx={{ marginBottom: 3 }}>
                <Grid size={{ xs: 12, sm: 3, md: 3 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.tutor}
                        name="tutor"
                        onChange={handleInputChange}
                      />
                    }
                    label="Tutor"
                  />
                </Grid>

              {formData.tutor && (
                  <Grid size={{ xs: 12, sm: 9, md: 9 }}>
                    <Autocomplete
                      multiple
                      options={allSubjects}
                      getOptionLabel={(option) => option.subjectname}
                      value={selectedSubjects}
                      onChange={(_, newValue) => setSelectedSubjects(newValue)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Valitse aiheet"
                          variant="outlined"
                        />
                      )}
                      isOptionEqualToValue={(option, value) =>
                        option.subjectname === value.subjectname
                      }
                    />
                  </Grid>
              )}
              </Grid>
              
              {/* Napit */}
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : "Tallenna muutokset"}
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Peruuta
                </Button>
              </Box>
            </Box>
          ) : (
            <Box>
              {/* Profiilikuva */}
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 3 }}>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    bgcolor: "primary.main",
                    fontSize: "3rem",
                    marginBottom: 1,
                  }}
                >
                  <PersonIcon sx={{ fontSize: "3rem" }} />
                </Avatar>
                <Typography variant="body2" color="textSecondary">
                  Profiilikuva
                </Typography>
              </Box>

              <Divider sx={{ marginBottom: 3 }} />

              {/* Henkilökohtaiset tiedot */}
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Henkilötiedot
              </Typography>
              <Grid container spacing={3} sx={{ marginBottom: 3 }}>
                <Grid size={{ xs: 6, sm: 4, md: 4 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Etunimi
                  </Typography>
                  <Typography variant="body1">
                    {user.firstname || "-"}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 6, sm: 4, md: 4 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Sukunimi
                  </Typography>
                  <Typography variant="body1">
                    {user.lastname || "-"}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 4, md: 4 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Sukupuoli
                  </Typography>
                  <Typography variant="body1">
                    {user.gender || "-"}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Sähköposti
                  </Typography>
                  <Typography variant="body1">
                    {user.email}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Puhelinnumero
                  </Typography>
                  <Typography variant="body1">
                    {user.phone || "-"}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Koulu
                  </Typography>
                  <Typography variant="body1">
                    {user.school || "-"}
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ marginBottom: 3 }} />

              {/* Sijaintitiedot */}
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Osoitetiedot
              </Typography>
              <Grid container spacing={2} sx={{ marginBottom: 3 }}>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Osoite
                  </Typography>
                  <Typography variant="body1">
                    {user.address || "-"}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Postinumero
                  </Typography>
                  <Typography variant="body1">
                    {user.zipcode || "-"}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 4 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Kaupunki
                  </Typography>
                  <Typography variant="body1">
                    {user.city || "-"}
                  </Typography>
                </Grid>
              </Grid>

              {/* Tutorointitiedot */}
              {user.tutor && user.subjects && (
                <>
                  <Divider sx={{ marginBottom: 3 }} />
                  <Typography variant="h6" sx={{ marginBottom: 2 }}>
                    Opetettavat aiheet
                  </Typography>
                  {user.subjects.length > 0 ? (
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", marginBottom: 2 }}>
                      {user.subjects.map((subject, index) => (
                        <Chip key={index} label={subject.subjectname} />
                      ))}
                    </Box>
                  ) : (
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", marginBottom: 2, justifyContent: "center" }}>
                      Lisää itsellesi aiheita muokkausvalikosta
                    </Box>
                  )}
                  
                </>
              )}
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}