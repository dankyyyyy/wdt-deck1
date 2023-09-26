import axios from "axios";

// Assuming 'selectedPreset' contains the data of the selected preset
const selectedPreset = {
    id: 1,
    image: 'Logo.jpg',
    title: 'Preset',
    text: ['Location', 'Helicopers', 'Vessels', 'WTGs'],
    selected: false,
  };
  
  // Make a POST request to the backend API endpoint
  axios.post('/api/presets/create', { selectedPreset })
    .then(response => {
      // Handle success response from the backend
      console.log(response.data);
    })
    .catch(error => {
      // Handle error response from the backend
      console.error(error);
    });
  