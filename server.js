const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Mock data for KPIs
const kpiData = [
  { hospital: 'Hospital A', metric: 'Admissions', value: 120 },
  { hospital: 'Hospital B', metric: 'Discharges', value: 80 },
  { hospital: 'Hospital C', metric: 'Admissions', value: 200 },
  { hospital: 'Hospital D', metric: 'Occupancy', value: 75 },
];

// Get KPI data
app.get('/api/kpis', (req, res) => {
  res.json(kpiData);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
