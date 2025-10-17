import { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material'
import {
  PictureAsPdf as PdfIcon,
} from '@mui/icons-material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs, { Dayjs } from 'dayjs'

const Reports: React.FC = () => {
  const [reportType, setReportType] = useState('case-summary')
  const [caseId, setCaseId] = useState('')
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs().subtract(30, 'day'))
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs())

  const handleGenerateReport = () => {
    alert(`Generating ${reportType} report`)
  }

  const recentReports = [
    {
      id: 1,
      name: 'Johnson Family - Court Progress Report',
      date: '2024-10-10',
      type: 'Court Report',
    },
    {
      id: 2,
      name: 'Monthly Activity Summary',
      date: '2024-10-01',
      type: 'Activity Report',
    },
  ]

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Reports
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Generate Report
              </Typography>

              <Stack spacing={3}>
                <FormControl fullWidth>
                  <InputLabel>Report Type</InputLabel>
                  <Select
                    value={reportType}
                    label="Report Type"
                    onChange={(e) => setReportType(e.target.value)}
                  >
                    <MenuItem value="case-summary">Case Summary</MenuItem>
                    <MenuItem value="court-report">Court Progress Report</MenuItem>
                    <MenuItem value="contact-hours">Contact Hours</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Case (Optional)</InputLabel>
                  <Select
                    value={caseId}
                    label="Case (Optional)"
                    onChange={(e) => setCaseId(e.target.value)}
                  >
                    <MenuItem value="">All Cases</MenuItem>
                    <MenuItem value="1">Johnson Family Reunification</MenuItem>
                  </Select>
                </FormControl>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="Start Date"
                      value={startDate}
                      onChange={(newValue) => setStartDate(newValue)}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="End Date"
                      value={endDate}
                      onChange={(newValue) => setEndDate(newValue)}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </Grid>
                </Grid>

                <Button
                  variant="contained"
                  startIcon={<PdfIcon />}
                  onClick={handleGenerateReport}
                >
                  Generate PDF
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Reports
              </Typography>
              <List>
                {recentReports.map((report) => (
                  <ListItem key={report.id}>
                    <ListItemText
                      primary={report.name}
                      secondary={
                        <>
                          <Chip label={report.type} size="small" sx={{ mr: 1 }} />
                          {new Date(report.date).toLocaleDateString()}
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Reports
