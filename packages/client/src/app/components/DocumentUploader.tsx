import React, { useState } from 'react';
import axios from 'axios';
import { Button, Grid, TextField , styled } from '@mui/material';

const StyledGrid = styled(Grid)({
  margin: '1rem 0',
});

const DocumentUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file && file.size > 20 * 1024 * 1024) {
      setError('File size must be less than 20MB');
    } else if (file && !/(doc|docx|pdf|txt)$/i.test(file.name)) {
      setError('Invalid file type. Allowed types are doc, docx, pdf, and txt.');
    } else {
      setFile(file);
      setError('');
    }
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleUpload = async () => {
    if (!file && !url) {
      setError('Please choose a file or enter a URL');
      return;
    }

    try {
      const formData = new FormData();
      if (file) {
        formData.append('file', file);
      }
      if (url) {
        formData.append('url', url);
      }
      await axios.post('/api/documents', formData);
      setFile(null);
      setUrl('');
      setError('');
    } catch (error) {
      console.error(error);
      setError('Error uploading document');
    }
  };

  return (
    <Grid container>
      <StyledGrid item xs={12}>
        <TextField
          label="File"
          type="file"
          onChange={handleFileChange}
          error={!!error}
          helperText={error}
          inputProps={{
            accept:
              'application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,text/plain',
          }}
        />
      </StyledGrid>
      <StyledGrid item xs={12}>
        <TextField
          label="URL"
          value={url}
          onChange={handleUrlChange}
          error={!!error}
          helperText={error}
        />
      </StyledGrid>
      <StyledGrid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleUpload}>
          Upload
        </Button>
      </StyledGrid>
    </Grid>
  );
};

export default DocumentUploader;
