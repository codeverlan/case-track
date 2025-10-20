import React, { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Tabs,
  Tab,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  IconButton,
  Stack,
} from '@mui/material'
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Person as PersonIcon,
  Event as EventIcon,
  Note as NoteIcon,
  ViewKanban as KanbanIcon,
} from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

interface Contact {
  id: number
  name: string
  role: string
  email: string | null
}

interface CourtDate {
  id: number
  date: string
  type: string
  location: string
}

interface Note {
  id: number
  date: string
  content: string
}

interface CaseData {
  id: number
  name: string
  status: string
  createdDate: string
  lastUpdated: string
  description: string
  hourlyRate?: number
  contacts: Contact[]
  courtDates: CourtDate[]
  notes: Note[]
  totalHours?: number
  totalIncome?: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`case-tabpanel-${index}`}
      aria-labelledby={`case-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  )
}

const CaseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)
  const [caseData, setCaseData] = useState<CaseData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCaseData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const loadCaseData = async () => {
    try {
      // Sample data - would normally call API
      setCaseData({
        id: Number(id),
        name: 'Johnson Family Reunification',
        status: 'ACTIVE',
        createdDate: '2024-09-15',
        lastUpdated: '2024-10-10',
        description: 'Court-ordered reunification therapy for the Johnson family.',
        hourlyRate: 150.00,
        totalHours: 12.5,
        totalIncome: 1875.00,
        contacts: [
          { id: 1, name: 'Sarah Johnson', role: 'Parent', email: 'sarah.j@example.com' },
          { id: 2, name: 'Michael Johnson', role: 'Child', email: null },
          { id: 3, name: 'Dr. Smith', role: 'Guardian Ad Litem', email: 'dr.smith@court.gov' },
        ],
        courtDates: [
          {
            id: 1,
            date: '2024-11-15',
            type: 'Status Review Hearing',
            location: 'Family Court, Room 201',
          },
        ],
        notes: [
          {
            id: 1,
            date: '2024-10-10',
            content: 'Initial assessment completed. Family showing positive engagement.',
          },
        ],
      })
      setLoading(false)
    } catch (error) {
      console.error('Error loading case data:', error)
      setLoading(false)
    }
  }

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'success'
      case 'WORKING':
        return 'primary'
      case 'PREPARING':
        return 'warning'
      case 'WAITING_LIST':
        return 'default'
      case 'CLOSED':
        return 'secondary'
      default:
        return 'default'
    }
  }

  if (loading) {
    return <Typography>Loading case details...</Typography>
  }

  if (!caseData) {
    return <Typography>Case not found</Typography>
  }

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton
          onClick={() => navigate('/cases')}
          aria-label="Back to cases"
          sx={{ mr: 2 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Box flexGrow={1}>
          <Typography variant="h4" component="h1">
            {caseData.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Case #{caseData.id}
          </Typography>
        </Box>
        <Chip label={caseData.status} color={getStatusColor(caseData.status)} />
        <IconButton aria-label="Edit case" sx={{ ml: 2 }}>
          <EditIcon />
        </IconButton>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Typography variant="body2" color="text.secondary">
                Created
              </Typography>
              <Typography variant="body1">
                {new Date(caseData.createdDate).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body2" color="text.secondary">
                Last Updated
              </Typography>
              <Typography variant="body1">
                {new Date(caseData.lastUpdated).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body2" color="text.secondary">
                Hourly Rate
              </Typography>
              <Typography variant="body1">
                ${caseData.hourlyRate?.toFixed(2) || '0.00'}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body2" color="text.secondary">
                Total Income
              </Typography>
              <Typography variant="h6" color="primary.main">
                ${caseData.totalIncome?.toFixed(2) || '0.00'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {caseData.totalHours?.toFixed(2) || '0'} hours
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                Description
              </Typography>
              <Typography variant="body1">{caseData.description}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="Case detail tabs"
        >
          <Tab label="Contacts" id="case-tab-0" aria-controls="case-tabpanel-0" />
          <Tab label="Due Dates" id="case-tab-1" aria-controls="case-tabpanel-1" />
          <Tab label="Notes" id="case-tab-2" aria-controls="case-tabpanel-2" />
          <Tab label="Kanban" id="case-tab-3" aria-controls="case-tabpanel-3" />
        </Tabs>
      </Box>

      <TabPanel value={activeTab} index={0}>
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Contacts</Typography>
              <Button startIcon={<PersonIcon />} variant="outlined" size="small">
                Add Contact
              </Button>
            </Box>
            <List>
              {caseData.contacts.map((contact, index) => (
                <React.Fragment key={contact.id}>
                  <ListItem
                    component="div"
                    onClick={() => navigate(`/contacts/${contact.id}`)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={contact.name}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            {contact.role}
                          </Typography>
                          {contact.email && ` • ${contact.email}`}
                        </>
                      }
                    />
                  </ListItem>
                  {index < caseData.contacts.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      </TabPanel>

      <TabPanel value={activeTab} index={1}>
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Due Dates</Typography>
              <Button startIcon={<EventIcon />} variant="outlined" size="small">
                Add Due Date
              </Button>
            </Box>
            <List>
              {caseData.courtDates.map((courtDate) => (
                <ListItem key={courtDate.id}>
                  <ListItemIcon>
                    <EventIcon color="warning" />
                  </ListItemIcon>
                  <ListItemText
                    primary={courtDate.type}
                    secondary={
                      <>
                        <Typography component="span" variant="body2">
                          {new Date(courtDate.date).toLocaleDateString()}
                        </Typography>
                        {` • ${courtDate.location}`}
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </TabPanel>

      <TabPanel value={activeTab} index={2}>
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Notes</Typography>
              <Button startIcon={<NoteIcon />} variant="outlined" size="small">
                Add Note
              </Button>
            </Box>
            <Stack spacing={2}>
              {caseData.notes.map((note) => (
                <Card key={note.id} variant="outlined">
                  <CardContent>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(note.date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body1">{note.content}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </TabPanel>

      <TabPanel value={activeTab} index={3}>
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Task Management</Typography>
              <Button
                startIcon={<KanbanIcon />}
                variant="contained"
                onClick={() => navigate(`/cases/${id}/kanban`)}
              >
                Open Kanban Board
              </Button>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Manage tasks and track progress using the Kanban board view.
            </Typography>
          </CardContent>
        </Card>
      </TabPanel>
    </Box>
  )
}

export default CaseDetail
