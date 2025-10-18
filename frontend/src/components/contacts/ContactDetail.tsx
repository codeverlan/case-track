import React, { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Stack,
  Avatar,
  Alert,
} from '@mui/material'
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Warning as WarningIcon,
  Folder as FolderIcon,
} from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'

interface ContactRole {
  caseId: number
  caseName: string
  role: string
  startDate: string
}

interface Interaction {
  id: number
  date: string
  caseName: string
  type: string
  duration: number
  notes: string
}

interface ContactData {
  id: number
  name: string
  email: string
  phone: string
  address: string
  roles: ContactRole[]
  hasConflict: boolean
  interactions: Interaction[]
}

const ContactDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [contactData, setContactData] = useState<ContactData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadContactData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const loadContactData = async () => {
    try {
      // Sample data - would normally call API
      setContactData({
        id: Number(id),
        name: 'Dr. Smith',
        email: 'dr.smith@court.gov',
        phone: '555-0102',
        address: '123 Court Street, City, State 12345',
        roles: [
          {
            caseId: 1,
            caseName: 'Johnson Family Reunification',
            role: 'Guardian Ad Litem',
            startDate: '2024-09-15',
          },
          {
            caseId: 3,
            caseName: 'Williams Parenting Assessment',
            role: 'Expert Witness',
            startDate: '2024-10-01',
          },
        ],
        hasConflict: true,
        interactions: [
          {
            id: 1,
            date: '2024-10-10',
            caseName: 'Johnson Family Reunification',
            type: 'Phone Call',
            duration: 30,
            notes: 'Discussed upcoming court date and assessment progress.',
          },
          {
            id: 2,
            date: '2024-10-05',
            caseName: 'Williams Parenting Assessment',
            type: 'Email',
            duration: 0,
            notes: 'Sent initial assessment questionnaire.',
          },
        ],
      })
      setLoading(false)
    } catch (error) {
      console.error('Error loading contact data:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return <Typography>Loading contact details...</Typography>
  }

  if (!contactData) {
    return <Typography>Contact not found</Typography>
  }

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton
          onClick={() => navigate('/contacts')}
          aria-label="Back to contacts"
          sx={{ mr: 2 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Box flexGrow={1}>
          <Typography variant="h4" component="h1">
            {contactData.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Contact #{contactData.id}
          </Typography>
        </Box>
        <IconButton aria-label="Edit contact" sx={{ ml: 2 }}>
          <EditIcon />
        </IconButton>
      </Box>

      {contactData.hasConflict && (
        <Alert severity="warning" icon={<WarningIcon />} sx={{ mb: 3 }}>
          <strong>Role Conflict Detected:</strong> This contact has multiple roles across
          different cases. Review the roles below to ensure there are no conflicts of interest.
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main' }}>
                  {contactData.name.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h6">{contactData.name}</Typography>
                  <Stack direction="row" spacing={1} mt={1}>
                    {contactData.email && (
                      <Chip
                        icon={<EmailIcon />}
                        label={contactData.email}
                        size="small"
                        variant="outlined"
                      />
                    )}
                  </Stack>
                  <Stack direction="row" spacing={1} mt={1}>
                    {contactData.phone && (
                      <Chip
                        icon={<PhoneIcon />}
                        label={contactData.phone}
                        size="small"
                        variant="outlined"
                      />
                    )}
                  </Stack>
                </Box>
              </Box>

              {contactData.address && (
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Address
                  </Typography>
                  <Typography variant="body1">{contactData.address}</Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Case Roles
              </Typography>
              <List>
                {contactData.roles.map((role, index) => (
                  <React.Fragment key={role.caseId}>
                    <ListItem
                      component="div"
                      onClick={() => navigate(`/cases/${role.caseId}`)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <ListItemText
                        primary={
                          <Box display="flex" alignItems="center" gap={1}>
                            <FolderIcon color="primary" fontSize="small" />
                            <Typography variant="body1">{role.caseName}</Typography>
                          </Box>
                        }
                        secondary={
                          <>
                            <Typography component="span" variant="body2" color="text.primary">
                              Role: {role.role}
                            </Typography>
                            <br />
                            <Typography component="span" variant="caption" color="text.secondary">
                              Since: {new Date(role.startDate).toLocaleDateString()}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    {index < contactData.roles.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Recent Interactions</Typography>
                <Button variant="outlined" size="small">
                  Log Interaction
                </Button>
              </Box>
              <Stack spacing={2}>
                {contactData.interactions.map((interaction) => (
                  <Card key={interaction.id} variant="outlined">
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={8}>
                          <Typography variant="body2" color="text.secondary">
                            {new Date(interaction.date).toLocaleDateString()} • {interaction.type}
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            {interaction.caseName}
                          </Typography>
                          <Typography variant="body2">{interaction.notes}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          {interaction.duration > 0 && (
                            <Chip
                              label={`${interaction.duration} min`}
                              size="small"
                              color="primary"
                              variant="outlined"
                            />
                          )}
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ContactDetail
