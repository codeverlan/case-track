import { Router, Request, Response } from 'express'
import fs from 'fs'
import path from 'path'

const router = Router()

const TEMPLATES_DIR = path.join(__dirname, '../../templates')

// GET /api/templates/fields/contact-roles - Get contact roles template
router.get('/fields/contact-roles', async (req: Request, res: Response) => {
  try {
    const templatePath = path.join(TEMPLATES_DIR, 'fields/contactRoles.json')

    if (!fs.existsSync(templatePath)) {
      return res.status(404).json({
        success: false,
        error: 'Contact roles template not found'
      })
    }

    const templateData = JSON.parse(fs.readFileSync(templatePath, 'utf8'))

    res.json({
      success: true,
      data: templateData
    })
  } catch (error) {
    console.error('Error loading contact roles template:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to load contact roles template'
    })
  }
})

// GET /api/templates/fields/evidence-types - Get evidence types template
router.get('/fields/evidence-types', async (req: Request, res: Response) => {
  try {
    const templatePath = path.join(TEMPLATES_DIR, 'fields/evidenceTypes.json')

    if (!fs.existsSync(templatePath)) {
      return res.status(404).json({
        success: false,
        error: 'Evidence types template not found'
      })
    }

    const templateData = JSON.parse(fs.readFileSync(templatePath, 'utf8'))

    res.json({
      success: true,
      data: templateData
    })
  } catch (error) {
    console.error('Error loading evidence types template:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to load evidence types template'
    })
  }
})

// GET /api/templates/fields/kanban-columns - Get kanban columns template
router.get('/fields/kanban-columns', async (req: Request, res: Response) => {
  try {
    const templatePath = path.join(TEMPLATES_DIR, 'fields/kanbanColumns.json')

    if (!fs.existsSync(templatePath)) {
      return res.status(404).json({
        success: false,
        error: 'Kanban columns template not found'
      })
    }

    const templateData = JSON.parse(fs.readFileSync(templatePath, 'utf8'))

    res.json({
      success: true,
      data: templateData
    })
  } catch (error) {
    console.error('Error loading kanban columns template:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to load kanban columns template'
    })
  }
})

// PUT /api/templates/fields/contact-roles - Update contact roles template
router.put('/fields/contact-roles', async (req: Request, res: Response) => {
  try {
    const { template } = req.body
    const templatePath = path.join(TEMPLATES_DIR, 'fields/contactRoles.json')

    // Validate template structure
    if (!template.roles || !Array.isArray(template.roles)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid template structure: roles array is required'
      })
    }

    // Backup existing template
    if (fs.existsSync(templatePath)) {
      const backupPath = templatePath.replace('.json', '.backup.json')
      fs.copyFileSync(templatePath, backupPath)
    }

    // Write updated template
    fs.writeFileSync(templatePath, JSON.stringify(template, null, 2))

    res.json({
      success: true,
      message: 'Contact roles template updated successfully'
    })
  } catch (error) {
    console.error('Error updating contact roles template:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to update contact roles template'
    })
  }
})

// PUT /api/templates/fields/evidence-types - Update evidence types template
router.put('/fields/evidence-types', async (req: Request, res: Response) => {
  try {
    const { template } = req.body
    const templatePath = path.join(TEMPLATES_DIR, 'fields/evidenceTypes.json')

    // Validate template structure
    if (!template.types || !Array.isArray(template.types)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid template structure: types array is required'
      })
    }

    // Backup existing template
    if (fs.existsSync(templatePath)) {
      const backupPath = templatePath.replace('.json', '.backup.json')
      fs.copyFileSync(templatePath, backupPath)
    }

    // Write updated template
    fs.writeFileSync(templatePath, JSON.stringify(template, null, 2))

    res.json({
      success: true,
      message: 'Evidence types template updated successfully'
    })
  } catch (error) {
    console.error('Error updating evidence types template:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to update evidence types template'
    })
  }
})

// PUT /api/templates/fields/kanban-columns - Update kanban columns template
router.put('/fields/kanban-columns', async (req: Request, res: Response) => {
  try {
    const { template } = req.body
    const templatePath = path.join(TEMPLATES_DIR, 'fields/kanbanColumns.json')

    // Validate template structure
    if (!template.columns || !Array.isArray(template.columns)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid template structure: columns array is required'
      })
    }

    // Backup existing template
    if (fs.existsSync(templatePath)) {
      const backupPath = templatePath.replace('.json', '.backup.json')
      fs.copyFileSync(templatePath, backupPath)
    }

    // Write updated template
    fs.writeFileSync(templatePath, JSON.stringify(template, null, 2))

    res.json({
      success: true,
      message: 'Kanban columns template updated successfully'
    })
  } catch (error) {
    console.error('Error updating kanban columns template:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to update kanban columns template'
    })
  }
})

// GET /api/templates/backup - List available template backups
router.get('/backup', async (req: Request, res: Response) => {
  try {
    const backupFiles: string[] = []

    // Scan for backup files
    const scanDirectory = (dir: string) => {
      if (!fs.existsSync(dir)) return

      const files = fs.readdirSync(dir)
      files.forEach(file => {
        const filePath = path.join(dir, file)
        const stat = fs.statSync(filePath)

        if (stat.isDirectory()) {
          scanDirectory(filePath)
        } else if (file.endsWith('.backup.json')) {
          backupFiles.push(filePath.replace(__dirname + '../../', ''))
        }
      })
    }

    scanDirectory(TEMPLATES_DIR)

    res.json({
      success: true,
      data: backupFiles.sort()
    })
  } catch (error) {
    console.error('Error listing template backups:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to list template backups'
    })
  }
})

// POST /api/templates/restore - Restore template from backup
router.post('/restore', async (req: Request, res: Response) => {
  try {
    const { backupPath } = req.body

    if (!backupPath) {
      return res.status(400).json({
        success: false,
        error: 'Backup path is required'
      })
    }

    const fullBackupPath = path.join(__dirname, '../../', backupPath)
    const targetPath = fullBackupPath.replace('.backup.json', '.json')

    if (!fs.existsSync(fullBackupPath)) {
      return res.status(404).json({
        success: false,
        error: 'Backup file not found'
      })
    }

    // Restore from backup
    fs.copyFileSync(fullBackupPath, targetPath)

    res.json({
      success: true,
      message: 'Template restored successfully from backup'
    })
  } catch (error) {
    console.error('Error restoring template backup:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to restore template backup'
    })
  }
})

// GET /api/templates/info - Get template system information
router.get('/info', async (req: Request, res: Response) => {
  try {
    const templateInfo = {
      templatesDirectory: TEMPLATES_DIR,
      availableTemplates: {
        contactRoles: 'templates/fields/contactRoles.json',
        evidenceTypes: 'templates/fields/evidenceTypes.json',
        kanbanColumns: 'templates/fields/kanbanColumns.json'
      },
      features: {
        naturalLanguageConfiguration: true,
        automaticBackups: true,
        hotReloading: true,
        validation: true,
        customFieldSupport: true
      },
      instructions: {
        howToModify: 'Use the PUT endpoints to modify templates',
        howToAddFields: 'Add new objects to the appropriate arrays in JSON files',
        howToBackup: 'Automatic backups are created before any modifications',
        howToRestore: 'Use the /restore endpoint with backup file path'
      }
    }

    res.json({
      success: true,
      data: templateInfo
    })
  } catch (error) {
    console.error('Error getting template info:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to get template information'
    })
  }
})

export default router