import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Box,
} from "@mui/material";

const SecondaryEmailEdit = ({ secondaryEmail, onChange }) => {
  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    const value = e.target.value;
    onChange(value);
  };

  // Only validate if there's input
  const hasError =
    secondaryEmail &&
    secondaryEmail.length > 0 &&
    !emailRegex.test(secondaryEmail);

  return (
    <Card>
      <CardContent>
        <Box className="flex items-center justify-between mb-3">
          <Typography variant="h6">Secondary Email</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Secondary Email"
              name="secondaryEmail"
              type="email"
              value={secondaryEmail || ""}
              onChange={handleChange}
              placeholder="Enter your secondary email"
              error={hasError}
              helperText={hasError ? "Please enter a valid email address" : ""}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SecondaryEmailEdit;
