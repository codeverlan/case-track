import { Router, Request, Response } from 'express'
import { DatabaseService } from '../config/database'

const router = Router()

// GET /api/cases - Get all cases with optional filtering
router.get('/', async (req: Request, res: Response) => {
  try {
    const { status, search } = req.query
    let sql = `
      SELECT
        c.*,
        COUNT(k.id) as task_count,
        COUNT(cc.id) as contact_count,
        MAX(cd.court_date) as next_court_date
      FROM cases c
      LEFT JOIN kanban_tasks k ON c.id = k.case_id
      LEFT JOIN case_contacts cc ON c.id = cc.case_id
      LEFT JOIN court_dates cd ON c.id = cd.case_id AND cd.court_date > datetime('now')
    `

    const params: any[] = []
    const conditions: string[] = []

    if (status) {
      conditions.push("c.status = ?")
      params.push(status)
    }

    if (search) {
      conditions.push("(c.case_name LIKE ? OR c.case_number LIKE ?)")
      params.push(`%${search}%`, `%${search}%`)
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ')
    }

    sql += `
      GROUP BY c.id
      ORDER BY c.updated_at DESC
    `

    const cases = await DatabaseService.query(sql, params)

    res.json({
      success: true,
      data: cases,
      count: cases.length
    })
  } catch (error) {
    console.error('Error fetching cases:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch cases'
    })
  }
})

// GET /api/cases/:id - Get specific case with relationships
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const caseId = req.params.id

    // Get case details
    const caseDetail = await DatabaseService.get(`
      SELECT * FROM cases WHERE id = ?
    `, [caseId])

    if (!caseDetail) {
      return res.status(404).json({
        success: false,
        error: 'Case not found'
      })
    }

    // Get contacts for this case
    const contacts = await DatabaseService.query(`
      SELECT
        cc.*,
        c.name,
        c.email,
        c.phone
      FROM case_contacts cc
      JOIN contacts c ON cc.contact_id = c.id
      WHERE cc.case_id = ?
      ORDER BY c.name
    `, [caseId])

    // Get tasks for this case
    const tasks = await DatabaseService.query(`
      SELECT * FROM kanban_tasks
      WHERE case_id = ?
      ORDER BY position, created_at
    `, [caseId])

    // Get contact logs for this case
    const contactLogs = await DatabaseService.query(`
      SELECT
        cl.*,
        c.name as contact_name
      FROM contact_logs cl
      JOIN contacts c ON cl.contact_id = c.id
      WHERE cl.case_id = ?
      ORDER BY cl.contact_date DESC
    `, [caseId])

    // Get evidence reviews for this case
    const evidenceReviews = await DatabaseService.query(`
      SELECT * FROM evidence_reviews
      WHERE case_id = ?
      ORDER BY review_date DESC
    `, [caseId])

    // Get court dates for this case
    const courtDates = await DatabaseService.query(`
      SELECT * FROM court_dates
      WHERE case_id = ?
      ORDER BY court_date
    `, [caseId])

    res.json({
      success: true,
      data: {
        case: caseDetail,
        contacts,
        tasks,
        contactLogs,
        evidenceReviews,
        courtDates
      }
    })
  } catch (error) {
    console.error('Error fetching case details:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch case details'
    })
  }
})

// POST /api/cases - Create new case
router.post('/', async (req: Request, res: Response) => {
  try {
    const { case_name, case_number, case_description, status = 'ACTIVE' } = req.body

    // Validation
    if (!case_name) {
      return res.status(400).json({
        success: false,
        error: 'Case name is required'
      })
    }

    // Check for duplicate case number
    if (case_number) {
      const existing = await DatabaseService.get(
        'SELECT id FROM cases WHERE case_number = ?',
        [case_number]
      )
      if (existing) {
        return res.status(400).json({
          success: false,
          error: 'Case number already exists'
        })
      }
    }

    const result = await DatabaseService.run(`
      INSERT INTO cases (case_name, case_number, case_description, status)
      VALUES (?, ?, ?, ?)
    `, [case_name, case_number, case_description, status])

    const newCase = await DatabaseService.get(
      'SELECT * FROM cases WHERE id = ?',
      [result.lastInsertRowid]
    )

    res.status(201).json({
      success: true,
      data: newCase,
      message: 'Case created successfully'
    })
  } catch (error) {
    console.error('Error creating case:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to create case'
    })
  }
})

// PUT /api/cases/:id - Update case
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const caseId = req.params.id
    const { case_name, case_number, case_description, status } = req.body

    // Check if case exists
    const existingCase = await DatabaseService.get(
      'SELECT id FROM cases WHERE id = ?',
      [caseId]
    )

    if (!existingCase) {
      return res.status(404).json({
        success: false,
        error: 'Case not found'
      })
    }

    // Check for duplicate case number (if changed)
    if (case_number) {
      const duplicate = await DatabaseService.get(
        'SELECT id FROM cases WHERE case_number = ? AND id != ?',
        [case_number, caseId]
      )
      if (duplicate) {
        return res.status(400).json({
          success: false,
          error: 'Case number already exists'
        })
      }
    }

    const updates: string[] = []
    const params: any[] = []

    if (case_name !== undefined) {
      updates.push('case_name = ?')
      params.push(case_name)
    }
    if (case_number !== undefined) {
      updates.push('case_number = ?')
      params.push(case_number)
    }
    if (case_description !== undefined) {
      updates.push('case_description = ?')
      params.push(case_description)
    }
    if (status !== undefined) {
      updates.push('status = ?')
      params.push(status)
    }

    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No valid fields to update'
      })
    }

    params.push(caseId)

    await DatabaseService.run(`
      UPDATE cases SET ${updates.join(', ')} WHERE id = ?
    `, params)

    const updatedCase = await DatabaseService.get(
      'SELECT * FROM cases WHERE id = ?',
      [caseId]
    )

    res.json({
      success: true,
      data: updatedCase,
      message: 'Case updated successfully'
    })
  } catch (error) {
    console.error('Error updating case:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to update case'
    })
  }
})

// DELETE /api/cases/:id - Archive case (soft delete)
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const caseId = req.params.id

    // Check if case exists
    const existingCase = await DatabaseService.get(
      'SELECT id FROM cases WHERE id = ?',
      [caseId]
    )

    if (!existingCase) {
      return res.status(404).json({
        success: false,
        error: 'Case not found'
      })
    }

    // Soft delete by updating status
    await DatabaseService.run(
      'UPDATE cases SET status = ? WHERE id = ?',
      ['CLOSED', caseId]
    )

    res.json({
      success: true,
      message: 'Case archived successfully'
    })
  } catch (error) {
    console.error('Error archiving case:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to archive case'
    })
  }
})

// GET /api/cases/:id/contacts - Get cross-case contacts for a contact
router.get('/:id/contacts/:contactId/cross-case', async (req: Request, res: Response) => {
  try {
    const { contactId } = req.params

    // Get all cases that include this contact
    const crossCaseContacts = await DatabaseService.query(`
      SELECT
        c.id as case_id,
        c.case_name,
        c.status,
        cc.role,
        cc.role_notes,
        cc.created_at as relationship_date
      FROM cases c
      JOIN case_contacts cc ON c.id = cc.case_id
      WHERE cc.contact_id = ?
      ORDER BY c.case_name
    `, [contactId])

    res.json({
      success: true,
      data: crossCaseContacts
    })
  } catch (error) {
    console.error('Error fetching cross-case contacts:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch cross-case contacts'
    })
  }
})

export default router