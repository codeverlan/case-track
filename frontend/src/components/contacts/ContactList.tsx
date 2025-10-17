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
  Avatar,
} from '@mui/material'
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Person as PersonIcon,
  Warning as WarningIcon,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

interface Contact {
  id: number
  name: string
  email?: string
  phone?: string
  roles: Array<{ caseName: string; role: string }>
  hasConflict: boolean
}

const ContactList: React.FC = () => {
  const navigate = useNavigate()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadContacts()
  }, [])

  const loadContacts = async () => {
    try {
      // Sample data - would normally call API
      setContacts([
        {
          id: 1,
          name: 'Sarah Johnson',
          email: 'sarah.j@example.com',
          phone: '555-0101',
          roles: [
            { caseName: 'Johnson Family Reunification', role: 'Parent' },
          ],
          hasConflict: false,
        },
        {
          id: 2,
          name: 'Dr. Smith',
          email: 'dr.smith@court.gov',
          phone: '555-0102',
          roles: [
            { caseName: 'Johnson Family Reunification', role: 'Guardian Ad Litem' },
            { caseName: 'Williams Parenting Assessment', role: 'Expert Witness' },
          ],
          hasConflict: true,
        },
        {
          id: 3,
          name: 'Michael Johnson',
          email: undefined,
          phone: undefined,
          roles: [
            { caseName: 'Johnson Family Reunification', role: 'Child' },
          ],
          hasConflict: false,
        },
      ])
      setLoading(false)
    } catch (error) {
      console.error('Error loading contacts:', error)
      setLoading(false)
    }
  }

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreateContact = () => {
    alert('Contact creation form would open here')
  }

  if (loading) {
    return <Typography>Loading contacts...</Typography>
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Contacts
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateContact}
          aria-label="Add new contact"
        >
          New Contact
        </Button>
      </Box>

      <Box mb={3}>
        <TextField
          fullWidth
          placeholder="Search contacts..."
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
                <IconButton aria-label="Filter contacts">
                  <FilterIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          aria-label="Search contacts"
        />
      </Box>

      <Grid container spacing={3}>
        {filteredContacts.map((contact) => (
          <Grid item xs={12} sm={6} md={4} key={contact.id}>
            <Card
              sx={{
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
                borderLeft: contact.hasConflict ? '4px solid' : 'none',
                borderLeftColor: 'warning.main',
              }}
              onClick={() => navigate(`/contacts/${contact.id}`)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  navigate(`/contacts/${contact.id}`)
                }
              }}
            >
              <CardContent>
                <Stack spacing={2}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <PersonIcon />
                    </Avatar>
                    <Box flexGrow={1}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="h6" component="h2">
                          {contact.name}
                        </Typography>
                        {contact.hasConflict && (
                          <Chip
                            icon={<WarningIcon />}
                            label="Role Conflict"
                            color="warning"
                            size="small"
                          />
                        )}
                      </Box>
                      {contact.email && (
                        <Typography variant="body2" color="text.secondary">
                          {contact.email}
                        </Typography>
                      )}
                      {contact.phone && (
                        <Typography variant="body2" color="text.secondary">
                          {contact.phone}
                        </Typography>
                      )}
                    </Box>
                  </Box>

                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                      Roles in {contact.roles.length} case{contact.roles.length !== 1 ? 's' : ''}:
                    </Typography>
                    <Stack spacing={0.5}>
                      {contact.roles.map((role, index) => (
                        <Typography key={index} variant="body2">
                          • {role.role} in {role.caseName}
                        </Typography>
                      ))}
                    </Stack>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredContacts.length === 0 && (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No contacts found
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            {searchQuery
              ? 'Try adjusting your search terms'
              : 'Add your first contact to get started'}
          </Typography>
          {!searchQuery && (
            <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreateContact}>
              Add First Contact
            </Button>
          )}
        </Box>
      )}
    </Box>
  )
}

export default ContactList
