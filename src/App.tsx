import React, { useState } from "react";
import "./App.css";
import ThemeProvider from "@sj-ab/component-library.ui.theme-provider";
import { greenTheme } from "@sj-ab/component-library.styles.themes";
import { Container } from "@sj-ab/component-library.ui.container";
// import Typography from "@sj-ab/component-library.ui.typography";
import { Spacing } from "@sj-ab/component-library.ui.spacing";
import { Grid } from "@sj-ab/component-library.ui.grid";
import { TextField } from "@sj-ab/component-library.ui.text-field";
import { TravellerField } from "@sj-ab/component-library.ui.traveller-field";
import { MenuItem, Box } from "@mui/material";
import { Select } from "@sj-ab/component-library.ui.select";
import FlowButton from "@sj-ab/component-library.ui.flow-button";

function App() {
  const [value, setValue] = useState("");
  const [disabled, setDisabled] = useState(false);

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <div className="App" style={{ paddingBottom: "72px" }}>
      <ThemeProvider theme={greenTheme}>
        <Container maxWidth="lg">
          <Spacing size={2} />
          <Grid container direction={"row"} spacing={{ xs: 2, md: 3 }}>
            <Grid item xs={12} md={4}>
              <TextField
                autoComplete="off"
                errorHelperText="Error Message"
                fullWidth
                id="example-input1"
                label="Label"
                required
                size="medium"
                variant="outlined"
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Spacing size={1} />
              <Box sx={{ mt: { md: "-8px" } }} />
              <Select
                labelId="select-example-id"
                lang="sv"
                labelText="Label"
                fullWidth
                onChange={handleChange}
                required
                value={value}
                variant="outlined"
                disabled={disabled}
              >
                <MenuItem value="Option 1">Option 1</MenuItem>
                <MenuItem value="Option 2">Option 2</MenuItem>
                <MenuItem value="Option 3">Option 3</MenuItem>
                <MenuItem value="Option 4">Option 4</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box>
                <TravellerField
                  id="test-traveller-selection"
                  lang="sv"
                  showEndIcon
                  fullWidth
                  value="2 vuxna valda"
                  disabled={disabled}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Spacing variant="small" />
            <Box p={1}>
              <FlowButton fullWidth onClick={() => setDisabled(!disabled)}>
                Klicka här
              </FlowButton>
            </Box>
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
