import { Router, Request, Response } from 'express'
import { DatabaseService } from '../config/database'

const router = Router()

// GET /api/contact-logs - Get all contact logs with optional filtering
router.get('/', async (req: Request, res: Response) => {
  try {
    const { caseId, contactId } = req.query
    let sql = `
      SELECT
        cl.*,
        c.name as contact_name,
        cs.case_name
      FROM contact_logs cl
      JOIN contacts c ON cl.contact_id = c.id
      JOIN cases cs ON cl.case_id = cs.id
    `

    const params: any[] = []
    const conditions: string[] = []

    if (caseId) {
      conditions.push("cl.case_id = ?")
      params.push(caseId)
    }

    if (contactId) {
      conditions.push("cl.contact_id = ?")
      params.push(contactId)
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ')
    }

    sql += ' ORDER BY cl.contact_date DESC'

    const logs = await DatabaseService.query(sql, params)

    res.json({
      success: true,
      data: logs,
      count: logs.length
    })
  } catch (error) {
    console.error('Error fetching contact logs:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contact logs'
    })
  }
})

// GET /api/contact-logs/:id - Get specific contact log
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const logId = req.params.id

    const log = await DatabaseService.get(`
      SELECT
        cl.*,
        c.name as contact_name,
        cs.case_name
      FROM contact_logs cl
      JOIN contacts c ON cl.contact_id = c.id
      JOIN cases cs ON cl.case_id = cs.id
      WHERE cl.id = ?
    `, [logId])

    if (!log) {
      return res.status(404).json({
        success: false,
        error: 'Contact log not found'
      })
    }

    res.json({
      success: true,
      data: log
    })
  } catch (error) {
    console.error('Error fetching contact log:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contact log'
    })
  }
})

// POST /api/contact-logs - Create new contact log
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      case_id,
      contact_id,
      description,
      duration_minutes = 0,
      hours_spent = 0.0,
      contact_date,
      contact_type = 'OTHER',
      notes
    } = req.body

    // Validation
    if (!case_id || !contact_id || !description || !contact_date) {
      return res.status(400).json({
        success: false,
        error: 'Case ID, Contact ID, description, and contact date are required'
      })
    }

    // Verify case exists
    const caseExists = await DatabaseService.get(
      'SELECT id FROM cases WHERE id = ?',
      [case_id]
    )
    if (!caseExists) {
      return res.status(404).json({
        success: false,
        error: 'Case not found'
      })
    }

    // Verify contact exists
    const contactExists = await DatabaseService.get(
      'SELECT id FROM contacts WHERE id = ?',
      [contact_id]
    )
    if (!contactExists) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found'
      })
    }

    const result = await DatabaseService.run(`
      INSERT INTO contact_logs (
        case_id,
        contact_id,
        description,
        duration_minutes,
        hours_spent,
        contact_date,
        contact_type,
        notes
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      case_id,
      contact_id,
      description,
      duration_minutes,
      hours_spent,
      contact_date,
      contact_type,
      notes
    ])

    const newLog = await DatabaseService.get(
      'SELECT * FROM contact_logs WHERE id = ?',
      [result.lastInsertRowid]
    )

    res.status(201).json({
      success: true,
      data: newLog,
      message: 'Contact log created successfully'
    })
  } catch (error) {
    console.error('Error creating contact log:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to create contact log'
    })
  }
})

// PUT /api/contact-logs/:id - Update contact log
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const logId = req.params.id
    const {
      description,
      duration_minutes,
      hours_spent,
      contact_date,
      contact_type,
      notes
    } = req.body

    // Check if log exists
    const existingLog = await DatabaseService.get(
      'SELECT id FROM contact_logs WHERE id = ?',
      [logId]
    )

    if (!existingLog) {
      return res.status(404).json({
        success: false,
        error: 'Contact log not found'
      })
    }

    const updates: string[] = []
    const params: any[] = []

    if (description !== undefined) {
      updates.push('description = ?')
      params.push(description)
    }
    if (duration_minutes !== undefined) {
      updates.push('duration_minutes = ?')
      params.push(duration_minutes)
    }
    if (hours_spent !== undefined) {
      updates.push('hours_spent = ?')
      params.push(hours_spent)
    }
    if (contact_date !== undefined) {
      updates.push('contact_date = ?')
      params.push(contact_date)
    }
    if (contact_type !== undefined) {
      updates.push('contact_type = ?')
      params.push(contact_type)
    }
    if (notes !== undefined) {
      updates.push('notes = ?')
      params.push(notes)
    }

    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No valid fields to update'
      })
    }

    params.push(logId)

    await DatabaseService.run(`
      UPDATE contact_logs SET ${updates.join(', ')} WHERE id = ?
    `, params)

    const updatedLog = await DatabaseService.get(
      'SELECT * FROM contact_logs WHERE id = ?',
      [logId]
    )

    res.json({
      success: true,
      data: updatedLog,
      message: 'Contact log updated successfully'
    })
  } catch (error) {
    console.error('Error updating contact log:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to update contact log'
    })
  }
})

// DELETE /api/contact-logs/:id - Delete contact log
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const logId = req.params.id

    // Check if log exists
    const existingLog = await DatabaseService.get(
      'SELECT id FROM contact_logs WHERE id = ?',
      [logId]
    )

    if (!existingLog) {
      return res.status(404).json({
        success: false,
        error: 'Contact log not found'
      })
    }

    await DatabaseService.run(
      'DELETE FROM contact_logs WHERE id = ?',
      [logId]
    )

    res.json({
      success: true,
      message: 'Contact log deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting contact log:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to delete contact log'
    })
  }
})

export default router
