import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, IconButton, Typography, styled } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

interface Document {
  id: number;
  name: string;
}

const StyledGrid = styled(Grid)({
  margin: '1rem 0',
});

const DocumentList: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/documents/${id}`);
      setDocuments(documents.filter((document) => document.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get<Document[]>('/api/documents');
        setDocuments(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDocuments();
  }, []);

  return (
    <>
      <Typography variant="h5">Uploaded Documents</Typography>
      {documents.length > 0 ? (
        <Grid container spacing={2}>
          {documents.map((document) => (
            <StyledGrid item key={document.id} xs={12} sm={6} md={4}>
              <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
                <Typography variant="subtitle1">{document.name}</Typography>
                <IconButton
                  onClick={() => handleDelete(document.id)}
                  color="secondary"
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </StyledGrid>
          ))}
        </Grid>
      ) : (
        <Typography variant="subtitle1">No documents uploaded yet.</Typography>
      )}
    </>
  );
};

export default DocumentList;
