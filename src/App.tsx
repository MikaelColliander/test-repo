import React from "react";
import "./App.css";
import ThemeProvider from "@sj-ab/component-library.ui.theme-provider";
import { greenTheme } from "@sj-ab/component-library.styles.themes";
import { Container } from "@sj-ab/component-library.ui.container";
import Typography from "@sj-ab/component-library.ui.typography";
import Spacing from "@sj-ab/component-library.ui.spacing";

function App() {
  return (
    <div className="App" style={{ paddingBottom: "72px" }}>
      <ThemeProvider theme={greenTheme}>
        <Container>
          <Spacing />
          <Typography variant="h1">
            Happy Coding!
          </Typography>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
