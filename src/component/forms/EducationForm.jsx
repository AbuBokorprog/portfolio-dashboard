import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useState } from 'react';

const EducationForm = ({ open, onClose, education = null }) => {
  const [formData, setFormData] = useState(
    education || {
      degree: '',
      institution: '',
      duration: '',
      grade: '',
      field: '',
      location: '',
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {education ? 'Edit Education' : 'Add New Education'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <div className="grid gap-4">
            <TextField
              fullWidth
              label="Degree"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Institution"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g., 2020 - 2022"
              required
            />
            <TextField
              fullWidth
              label="Grade"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              placeholder="e.g., 3.8 GPA"
            />
            <TextField
              fullWidth
              label="Field of Study"
              name="field"
              value={formData.field}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {education ? 'Update' : 'Add'} Education
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EducationForm;
