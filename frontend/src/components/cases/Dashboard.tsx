import React, { useState, useEffect } from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Alert,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
} from '@mui/material'
import {
  Event as EventIcon,
  Warning as WarningIcon,
  People as PeopleIcon,
  Cases as CasesIcon,
  Schedule as ScheduleIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { SPACING, CARD_SPACING, GRID_SPACING } from '../../utils/spacing'

interface CourtDate {
  id: number
  caseName: string
  courtDate: string
  description: string
  location: string
  daysUntil: number
}

interface RecentCase {
  id: number
  name: string
  status: string
  lastUpdated: string
  taskCount: number
}

interface ContactActivity {
  id: number
  contactName: string
  caseName: string
  description: string
  duration: number
  date: string
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const [upcomingCourtDates, setUpcomingCourtDates] = useState<CourtDate[]>([])
  const [recentCases, setRecentCases] = useState<RecentCase[]>([])
  const [recentActivities, setRecentActivities] = useState<ContactActivity[]>([])
  const [loading, setLoading] = useState(true)
  const [totalIncome, setTotalIncome] = useState(0)
  const [totalHours, setTotalHours] = useState(0)

  useEffect(() => {
    // Load dashboard data
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      // This would normally call the API
      // For now, using sample data
      setUpcomingCourtDates([
        {
          id: 1,
          caseName: 'Johnson Family Reunification',
          courtDate: '2024-11-15T09:00:00',
          description: 'Status Review Hearing',
          location: 'Family Court, Room 201',
          daysUntil: 3,
        },
        {
          id: 2,
          caseName: 'Williams Parenting Assessment',
          courtDate: '2024-11-08T13:00:00',
          description: 'Assessment Report Submission',
          location: 'Family Court, Room 201',
          daysUntil: 10,
        },
        {
          id: 3,
          caseName: 'Smith Therapeutic Intervention',
          courtDate: '2024-10-30T10:30:00',
          description: 'Therapy Progress Review',
          location: 'Juvenile Court, Room 105',
          daysUntil: 1,
        },
      ])

      setRecentCases([
        {
          id: 1,
          name: 'Johnson Family Reunification',
          status: 'ACTIVE',
          lastUpdated: '2024-10-10',
          taskCount: 5,
        },
        {
          id: 2,
          name: 'Smith Therapeutic Intervention',
          status: 'WORKING',
          lastUpdated: '2024-10-09',
          taskCount: 4,
        },
        {
          id: 3,
          name: 'Williams Parenting Assessment',
          status: 'PREPARING',
          lastUpdated: '2024-10-08',
          taskCount: 3,
        },
      ])

      setRecentActivities([
        {
          id: 1,
          contactName: 'Sarah Johnson',
          caseName: 'Johnson Family Reunification',
          description: 'Individual therapy session',
          duration: 60,
          date: '2024-10-10T10:00:00',
        },
        {
          id: 2,
          contactName: 'Alex Smith',
          caseName: 'Smith Therapeutic Intervention',
          description: 'Adolescent therapy session',
          duration: 60,
          date: '2024-10-09T16:00:00',
        },
        {
          id: 3,
          contactName: 'Mary Williams',
          caseName: 'Williams Parenting Assessment',
          description: 'Parenting assessment interview',
          duration: 120,
          date: '2024-10-08T09:00:00',
        },
      ])

      // Sample total income and hours calculation
      setTotalIncome(5250.00)
      setTotalHours(35.0)

      setLoading(false)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
      setLoading(false)
    }
  }

  const getUrgencyColor = (daysUntil: number) => {
    if (daysUntil <= 3) return 'error'
    if (daysUntil <= 7) return 'warning'
    return 'success'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'success'
      case 'WORKING': return 'primary'
      case 'PREPARING': return 'warning'
      case 'WAITING_LIST': return 'default'
      case 'CLOSED': return 'secondary'
      default: return 'default'
    }
  }

  if (loading) {
    return <div>Loading dashboard...</div>
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Total Income Summary */}
      <Card sx={{ mb: SPACING.lg, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <CardContent sx={{ p: CARD_SPACING.padding }}>
          <Grid container spacing={GRID_SPACING.default} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ color: 'white', opacity: 0.9 }}>
                Total Income
              </Typography>
              <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold' }}>
                ${totalIncome.toFixed(2)}
              </Typography>
              <Typography variant="body2" sx={{ color: 'white', opacity: 0.8, mt: SPACING.sm }}>
                {totalHours.toFixed(2)} hours tracked across all cases
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box textAlign={{ xs: 'left', md: 'right' }}>
                <Button
                  variant="contained"
                  sx={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.3)' }
                  }}
                  onClick={() => navigate('/reports')}
                >
                  View Detailed Report
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Upcoming Due Dates Alert */}
      <Alert
        severity="warning"
        icon={<EventIcon />}
        sx={{ mb: SPACING.lg }}
        action={
          <Button
            color="inherit"
            size="small"
            onClick={() => navigate('/reports')}
          >
            View All
          </Button>
        }
      >
        You have {upcomingCourtDates.length} upcoming due date{upcomingCourtDates.length !== 1 ? 's' : ''} in the next 14 days.
      </Alert>

      <Grid container spacing={GRID_SPACING.default}>
        {/* Upcoming Due Dates */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: CARD_SPACING.padding }}>
              <Box display="flex" alignItems="center" mb={SPACING.lg}>
                <EventIcon color="error" sx={{ mr: SPACING.md }} />
                <Typography variant="h6">Upcoming Due Dates</Typography>
              </Box>
              <List>
                {upcomingCourtDates.map((courtDate, index) => (
                  <React.Fragment key={courtDate.id}>
                    <ListItem sx={{ py: SPACING.lg }}>
                      <ListItemIcon>
                        <Chip
                          label={`${courtDate.daysUntil} day${courtDate.daysUntil !== 1 ? 's' : ''}`}
                          color={getUrgencyColor(courtDate.daysUntil)}
                          size="small"
                          icon={<WarningIcon />}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={courtDate.caseName}
                        secondary={
                          <>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: SPACING.sm }}>
                              {courtDate.description}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ mt: SPACING.xs, display: 'block' }}>
                              {new Date(courtDate.courtDate).toLocaleDateString()} • {courtDate.location}
                            </Typography>
                          </>
                        }
                      />
                      <Button
                        size="small"
                        onClick={() => navigate(`/cases/${courtDate.id}`)}
                      >
                        View
                      </Button>
                    </ListItem>
                    {index < upcomingCourtDates.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
              {upcomingCourtDates.length === 0 && (
                <Box textAlign="center" py={SPACING.md}>
                  <Typography color="text.secondary">
                    No upcoming due dates
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Cases */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: CARD_SPACING.padding }}>
              <Box display="flex" alignItems="center" mb={SPACING.lg}>
                <CasesIcon color="primary" sx={{ mr: SPACING.md }} />
                <Typography variant="h6">Recent Cases</Typography>
              </Box>
              <List>
                {recentCases.map((case_, index) => (
                  <React.Fragment key={case_.id}>
                    <ListItem sx={{ py: SPACING.lg }}>
                      <ListItemIcon>
                        <Chip
                          label={case_.status}
                          color={getStatusColor(case_.status)}
                          size="small"
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={case_.name}
                        secondary={
                          <>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: SPACING.sm }}>
                              {case_.taskCount} active task{case_.taskCount !== 1 ? 's' : ''}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ mt: SPACING.xs, display: 'block' }}>
                              Updated {new Date(case_.lastUpdated).toLocaleDateString()}
                            </Typography>
                          </>
                        }
                      />
                      <Button
                        size="small"
                        onClick={() => navigate(`/cases/${case_.id}`)}
                      >
                        Open
                      </Button>
                    </ListItem>
                    {index < recentCases.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
              <Box mt={SPACING.md}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<ArrowForwardIcon />}
                  onClick={() => navigate('/cases')}
                >
                  View All Cases
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ p: CARD_SPACING.padding }}>
              <Box display="flex" alignItems="center" mb={SPACING.lg}>
                <ScheduleIcon color="secondary" sx={{ mr: SPACING.md }} />
                <Typography variant="h6">Recent Contact Activities</Typography>
              </Box>
              <List>
                {recentActivities.map((activity, index) => (
                  <React.Fragment key={activity.id}>
                    <ListItem sx={{ py: SPACING.lg }}>
                      <ListItemIcon>
                        <PeopleIcon color="action" />
                      </ListItemIcon>
                      <ListItemText
                        primary={`${activity.contactName} - ${activity.caseName}`}
                        secondary={
                          <>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: SPACING.sm }}>
                              {activity.description}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ mt: SPACING.xs, display: 'block' }}>
                              {activity.duration} minutes • {new Date(activity.date).toLocaleDateString()}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    {index < recentActivities.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
              <Box mt={SPACING.md}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<ArrowForwardIcon />}
                  onClick={() => navigate('/contacts')}
                >
                  View All Contacts
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard