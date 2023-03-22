import React from "react";
import { Container } from "@mui/material";
import DocumentUploader from "./components/DocumentUploader";
import DocumentList from "./components/DocumentList";

const App: React.FC = () => {
  return (
    <Container maxWidth="md">
      <DocumentUploader />
      <DocumentList />
    </Container>
  );
};

export default App;