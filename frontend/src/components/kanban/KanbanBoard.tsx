import { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Grid,
  Chip,
  Paper,
  Stack,
} from '@mui/material'
import {
  ArrowBack as ArrowBackIcon,
  Add as AddIcon,
} from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import { SPACING, GRID_SPACING } from '../../utils/spacing'

interface Task {
  id: number
  title: string
  description: string
  assignee?: string
  dueDate?: string
  priority: 'high' | 'medium' | 'low'
}

interface Column {
  id: string
  title: string
  tasks: Task[]
}

const KanbanBoard: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [columns, setColumns] = useState<Column[]>([])
  const [caseName, setCaseName] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadKanbanData()
  }, [id])

  const loadKanbanData = async () => {
    try {
      setCaseName('Johnson Family Reunification')
      setColumns([
        {
          id: 'todo',
          title: 'To Do',
          tasks: [
            {
              id: 1,
              title: 'Prepare court report',
              description: 'Draft comprehensive progress report for upcoming hearing',
              assignee: 'Dr. Sarah',
              dueDate: '2024-11-10',
              priority: 'high',
            },
          ],
        },
        {
          id: 'in-progress',
          title: 'In Progress',
          tasks: [
            {
              id: 3,
              title: 'Conduct parent assessment',
              description: 'Complete parenting capacity evaluation',
              assignee: 'Dr. Sarah',
              dueDate: '2024-10-25',
              priority: 'high',
            },
          ],
        },
        {
          id: 'review',
          title: 'Review',
          tasks: [],
        },
        {
          id: 'done',
          title: 'Done',
          tasks: [],
        },
      ])
      setLoading(false)
    } catch (error) {
      console.error('Error loading kanban data:', error)
      setLoading(false)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'error'
      case 'medium':
        return 'warning'
      case 'low':
        return 'info'
      default:
        return 'default'
    }
  }

  if (loading) {
    return <Typography>Loading kanban board...</Typography>
  }

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={SPACING.lg}>
        <IconButton
          onClick={() => navigate(id ? `/cases/${id}` : '/cases')}
          aria-label="Back to case"
          sx={{ mr: SPACING.md }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Box flexGrow={1}>
          <Typography variant="h4" component="h1">
            Task Board
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {caseName}
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />}>
          New Task
        </Button>
      </Box>

      <Box sx={{ overflowX: 'auto', pb: SPACING.md }}>
        <Grid container spacing={GRID_SPACING.compact} sx={{ minWidth: '800px' }}>
          {columns.map((column) => (
            <Grid item xs={12} sm={6} md={3} key={column.id}>
              <Paper
                elevation={0}
                sx={{
                  bgcolor: 'background.default',
                  p: SPACING.md,
                  borderRadius: 2,
                  minHeight: '500px',
                }}
              >
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={SPACING.md}>
                  <Typography variant="h6" component="h2">
                    {column.title}
                  </Typography>
                  <Chip label={column.tasks.length} size="small" />
                </Box>

                <Stack spacing={SPACING.md}>
                  {column.tasks.map((task) => (
                    <Card key={task.id}>
                      <CardContent sx={{ p: SPACING.md }}>
                        <Typography variant="subtitle2" component="h3">
                          {task.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={SPACING.sm}>
                          {task.description}
                        </Typography>
                        <Stack direction="row" spacing={SPACING.sm}>
                          <Chip
                            label={task.priority}
                            size="small"
                            color={getPriorityColor(task.priority)}
                          />
                        </Stack>
                      </CardContent>
                    </Card>
                  ))}
                  <Button fullWidth variant="outlined" startIcon={<AddIcon />}>
                    Add Task
                  </Button>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default KanbanBoard
