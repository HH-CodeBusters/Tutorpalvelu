import { useState, useEffect } from "react";
import type { appUser } from "../types";
import { useOutletContext } from "react-router";
import {
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  Chip,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  Avatar,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import PersonIcon from "@mui/icons-material/Person";
import { updateUser, getAllSubjects, getAuthenticatedUser } from "../services/user";

interface Subject {
  id: number;
  subjectname: string;
}

interface ProfileContextType extends appUser {
  setUser?: (user: appUser) => void;
}

export default function Profile() {
  const user = useOutletContext<ProfileContextType | null>();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [allSubjects, setAllSubjects] = useState<Subject[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);
  const [localUser, setLocalUser] = useState<appUser | null>(user);

  const [formData, setFormData] = useState({
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
    parent: false,
  });

  useEffect(() => {
    setLocalUser(user);
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
        parent: user.parent || false,
      });

      if (user.subjects) {
        setSelectedSubjects(
          user.subjects.map((s) => ({
            id: 0,
            subjectname: s.subjectname,
          }))
        );
      }

      // Fetch all available subjects
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

    // Clear subjects if tutor is unchecked
    if (name === "tutor" && !checked) {
      setSelectedSubjects([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      
      // Update local user state with the returned user data
      if (result) {
        setLocalUser(result);
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
          parent: result.parent || false,
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

      // Refresh user from backend to sync context
      try {
        const refreshedUser = await getAuthenticatedUser();
        if (refreshedUser) {
          setLocalUser(refreshedUser);
        }
      } catch (err) {
        console.error("Error refreshing user:", err);
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
        parent: user.parent || false,
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

  const displayUser = localUser || user;

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
                  <TextField
                    fullWidth
                    label="Sukupuoli"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
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

              {/* Role Section */}
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Rooli
              </Typography>
              <Grid container spacing={2} sx={{ marginBottom: 3 }}>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.parent}
                        name="parent"
                        onChange={handleInputChange}
                      />
                    }
                    label="Vanhempi"
                  />
                </Grid>
              </Grid>

              {/* Subjects Section - Only for Tutors */}
              {formData.tutor && (
                <>
                  <Divider sx={{ marginBottom: 3 }} />
                  <Typography variant="h6" sx={{ marginBottom: 2 }}>
                    Aiheet
                  </Typography>
                  <Grid container spacing={2} sx={{ marginBottom: 3 }}>
                    <Grid size={{ xs: 12, md: 6 }}>
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
                  </Grid>
                </>
              )}

              {/* Action Buttons */}
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
                  <Typography variant="subtitle2" color="textSecondary">
                    Etunimi
                  </Typography>
                  <Typography variant="body1">
                    {displayUser.firstname || "-"}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Sukunimi
                  </Typography>
                  <Typography variant="body1">
                    {displayUser.lastname || "-"}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Sukupuoli
                  </Typography>
                  <Typography variant="body1">
                    {displayUser.gender || "-"}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Sähköposti
                  </Typography>
                  <Typography variant="body1">
                    {displayUser.email}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Puhelinnumero
                  </Typography>
                  <Typography variant="body1">
                    {displayUser.phone || "-"}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Koulu
                  </Typography>
                  <Typography variant="body1">
                    {displayUser.school || "-"}
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ marginBottom: 3 }} />

              {/* Address Section */}
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Osoitetiedot
              </Typography>
              <Grid container spacing={2} sx={{ marginBottom: 3 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Osoite
                  </Typography>
                  <Typography variant="body1">
                    {displayUser.address || "-"}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Postinumero
                  </Typography>
                  <Typography variant="body1">
                    {displayUser.zipcode || "-"}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Kaupunki
                  </Typography>
                  <Typography variant="body1">
                    {displayUser.city || "-"}
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ marginBottom: 3 }} />

              {/* Role Section */}
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Rooli
              </Typography>
              <Box sx={{ display: "flex", gap: 1, marginBottom: 3 }}>
                {displayUser.tutor && <Chip label="Tutor" color="primary" />}
                {displayUser.parent && <Chip label="Vanhempi" color="primary" />}
                {!displayUser.tutor && !displayUser.parent && <Chip label="Opiskelija" />}
              </Box>

              {/* Subjects Section - Only for Tutors */}
              {displayUser.tutor && displayUser.subjects && displayUser.subjects.length > 0 && (
                <>
                  <Divider sx={{ marginBottom: 3 }} />
                  <Typography variant="h6" sx={{ marginBottom: 2 }}>
                    Aiheet
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", marginBottom: 2 }}>
                    {displayUser.subjects.map((subject, index) => (
                      <Chip key={index} label={subject.subjectname} />
                    ))}
                  </Box>
                </>
              )}
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
