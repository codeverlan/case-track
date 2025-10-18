import React, { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Grid,
  Chip,
  IconButton,
  InputAdornment,
  Stack,
} from '@mui/material'
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Folder as FolderIcon,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { SPACING, GRID_SPACING } from '../../utils/spacing'

interface Case {
  id: number
  name: string
  status: string
  createdDate: string
  lastUpdated: string
  courtDate?: string
  contactCount: number
  taskCount: number
}

const CaseList: React.FC = () => {
  const navigate = useNavigate()
  const [cases, setCases] = useState<Case[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCases()
  }, [])

  const loadCases = async () => {
    try {
      // Sample data - would normally call API
      setCases([
        {
          id: 1,
          name: 'Johnson Family Reunification',
          status: 'ACTIVE',
          createdDate: '2024-09-15',
          lastUpdated: '2024-10-10',
          courtDate: '2024-11-15',
          contactCount: 5,
          taskCount: 8,
        },
        {
          id: 2,
          name: 'Smith Therapeutic Intervention',
          status: 'WORKING',
          createdDate: '2024-08-20',
          lastUpdated: '2024-10-09',
          courtDate: '2024-10-30',
          contactCount: 3,
          taskCount: 6,
        },
        {
          id: 3,
          name: 'Williams Parenting Assessment',
          status: 'PREPARING',
          createdDate: '2024-10-01',
          lastUpdated: '2024-10-08',
          courtDate: '2024-11-08',
          contactCount: 4,
          taskCount: 5,
        },
      ])
      setLoading(false)
    } catch (error) {
      console.error('Error loading cases:', error)
      setLoading(false)
    }
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

  const filteredCases = cases.filter((case_) =>
    case_.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreateCase = () => {
    // Would navigate to case creation form
    alert('Case creation form would open here')
  }

  if (loading) {
    return <Typography>Loading cases...</Typography>
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={SPACING.lg}>
        <Typography variant="h4" component="h1">
          Cases
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateCase}
          aria-label="Create new case"
        >
          New Case
        </Button>
      </Box>

      <Box mb={SPACING.lg}>
        <TextField
          fullWidth
          placeholder="Search cases..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="Filter cases">
                  <FilterIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          aria-label="Search cases"
        />
      </Box>

      <Grid container spacing={GRID_SPACING.default}>
        {filteredCases.map((case_) => (
          <Grid item xs={12} sm={6} md={4} key={case_.id}>
            <Card
              sx={{
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
              onClick={() => navigate(`/cases/${case_.id}`)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  navigate(`/cases/${case_.id}`)
                }
              }}
            >
              <CardContent sx={{ p: SPACING.md }}>
                <Stack spacing={SPACING.md}>
                  <Box display="flex" alignItems="flex-start" justifyContent="space-between">
                    <Box display="flex" alignItems="center" gap={SPACING.sm}>
                      <FolderIcon color="primary" />
                      <Typography variant="h6" component="h2">
                        {case_.name}
                      </Typography>
                    </Box>
                    <Chip
                      label={case_.status}
                      color={getStatusColor(case_.status)}
                      size="small"
                    />
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {case_.contactCount} contacts • {case_.taskCount} tasks
                    </Typography>
                    {case_.courtDate && (
                      <Typography variant="body2" color="warning.main" sx={{ mt: SPACING.xs }}>
                        Court Date: {new Date(case_.courtDate).toLocaleDateString()}
                      </Typography>
                    )}
                  </Box>

                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Created: {new Date(case_.createdDate).toLocaleDateString()}
                    </Typography>
                    <br />
                    <Typography variant="caption" color="text.secondary">
                      Updated: {new Date(case_.lastUpdated).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredCases.length === 0 && (
        <Box textAlign="center" py={SPACING.xxl}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No cases found
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={SPACING.lg}>
            {searchQuery
              ? 'Try adjusting your search terms'
              : 'Create your first case to get started'}
          </Typography>
          {!searchQuery && (
            <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreateCase}>
              Create First Case
            </Button>
          )}
        </Box>
      )}
    </Box>
  )
}

export default CaseList
