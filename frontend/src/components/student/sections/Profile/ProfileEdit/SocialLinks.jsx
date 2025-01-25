import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Box,
} from "@mui/material";

const SocialLinksEdit = ({ socialLinks, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...socialLinks, [name]: value });
  };

  return (
    <Card>
      <CardContent>
        <Box className="flex items-center justify-between mb-3">
          <Typography variant="h6">Social Links</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Github Link"
              name="github"
              type="url"
              value={socialLinks.github || ""}
              onChange={handleChange}
              placeholder="Enter your Github Profile link"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Linked Link"
              name="linkedIn"
              type="url"
              value={socialLinks.linkedIn || ""}
              onChange={handleChange}
              placeholder="Enter your LinkedIn profile link"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SocialLinksEdit;
