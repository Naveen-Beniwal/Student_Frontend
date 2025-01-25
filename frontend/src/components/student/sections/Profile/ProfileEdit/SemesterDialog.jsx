import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

const SemesterDialog = ({
  open,
  onClose,
  onSave,
  semester,
  existingSemesters = [],
}) => {
  const [formData, setFormData] = useState({
    semester: "",
    sgpa: "",
    backlogs: [],
  });

  useEffect(() => {
    if (semester) {
      setFormData({
        semester: semester.semester || "",
        sgpa: semester.sgpa || "",
        backlogs: semester.backlogs || [],
      });
    } else {
      setFormData({
        semester: "",
        sgpa: "",
        backlogs: [],
      });
    }
  }, [semester]);

  const handleAddBacklog = () => {
    setFormData((prev) => ({
      ...prev,
      backlogs: [
        ...prev.backlogs,
        {
          subjectCode: "",
          subjectName: "",
          status: "pending",
          clearedIn: { semester: "" },
        },
      ],
    }));
  };

  const handleBacklogChange = (index, field, value) => {
    const updatedBacklogs = [...formData.backlogs];
    if (field === "clearedIn") {
      updatedBacklogs[index] = {
        ...updatedBacklogs[index],
        clearedIn: value,
      };
    } else {
      updatedBacklogs[index] = {
        ...updatedBacklogs[index],
        [field]: value,
      };
    }
    setFormData((prev) => ({ ...prev, backlogs: updatedBacklogs }));
  };

  const handleRemoveBacklog = (index) => {
    setFormData((prev) => ({
      ...prev,
      backlogs: prev.backlogs.filter((_, i) => i !== index),
    }));
  };

  const isValidForm = () => {
    return (
      formData.semester &&
      formData.sgpa &&
      (!formData.backlogs.length ||
        formData.backlogs.every((b) => {
          // Basic validation for all backlogs
          if (!b.subjectCode || !b.subjectName) return false;

          // If status is cleared, require clearedIn semester
          if (b.status === "cleared") {
            return b.clearedIn?.semester;
          }

          // Allow pending status
          return true;
        }))
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {semester ? "Edit Semester" : "Add New Semester"}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Semester"
              type="number"
              value={formData.semester}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  semester: Number(e.target.value),
                }))
              }
              required
              inputProps={{ min: 1, max: 8 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="SGPA"
              type="number"
              value={formData.sgpa}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  sgpa: Number(e.target.value),
                }))
              }
              required
              inputProps={{ min: 0, max: 10, step: 0.01 }}
            />
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="subtitle1">Backlogs</Typography>
              <Button
                startIcon={<Add />}
                onClick={handleAddBacklog}
                size="small"
              >
                Add Backlog
              </Button>
            </Box>

            {formData.backlogs.map((backlog, index) => (
              <Grid
                container
                spacing={2}
                alignItems="center"
                sx={{ mb: 2 }}
                key={index}
              >
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Subject Code"
                    value={backlog.subjectCode}
                    onChange={(e) =>
                      handleBacklogChange(index, "subjectCode", e.target.value)
                    }
                    required
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Subject Name"
                    value={backlog.subjectName}
                    onChange={(e) =>
                      handleBacklogChange(index, "subjectName", e.target.value)
                    }
                    required
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={backlog.status}
                      onChange={(e) =>
                        handleBacklogChange(index, "status", e.target.value)
                      }
                      label="Status"
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="cleared">Cleared</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {backlog.status === "cleared" && (
                  <Grid item xs={12} md={1}>
                    <TextField
                      select
                      fullWidth
                      size="small"
                      label="Cleared In"
                      value={backlog.clearedIn?.semester || ""}
                      onChange={(e) =>
                        handleBacklogChange(index, "clearedIn", {
                          semester: Number(e.target.value),
                        })
                      }
                    >
                      {[...Array(8)]
                        .map((_, i) => {
                          const semNumber = i + 1;
                          // Only show semesters after current semester
                          return semNumber > formData.semester ? (
                            <MenuItem key={semNumber} value={semNumber}>
                              Sem {semNumber}
                            </MenuItem>
                          ) : null;
                        })
                        .filter(Boolean)}
                    </TextField>
                  </Grid>
                )}

                <Grid item xs={12} md={1}>
                  <IconButton
                    onClick={() => handleRemoveBacklog(index)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={() => onSave(formData)}
          disabled={!isValidForm()}
          variant="contained"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SemesterDialog;
