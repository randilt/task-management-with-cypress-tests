describe('Add Task Functionality', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('should display the add task form', () => {
    cy.get('[data-test="add-task-form"]').should('be.visible')
  })

  it('should add a new task successfully', () => {
    const taskTitle = 'New Test Task'
    const taskDescription = 'This is a test task description'

    cy.get('[data-test="task-title-input"]').type(taskTitle)
    cy.get('[data-test="task-description-input"]').type(taskDescription)
    cy.get('[data-test="task-priority-select"]').select('high')
    cy.get('[data-test="add-task-button"]').click()

    cy.contains(taskTitle).should('be.visible')
    cy.contains(taskDescription).should('be.visible')
    cy.contains('High').should('be.visible')
  })

  it('should not add a task with empty title', () => {
    cy.get('[data-test="task-description-input"]').type('Some description')
    cy.get('[data-test="add-task-button"]').click()
    cy.get('[data-test="task-title-input"]').should('have.attr', 'required')
  })

  it('should not add a task with empty description', () => {
    cy.get('[data-test="task-title-input"]').type('Some title')
    cy.get('[data-test="add-task-button"]').click()
    cy.get('[data-test="task-description-input"]').should(
      'have.attr',
      'required'
    )
  })

  it('should clear the form after adding a task', () => {
    cy.get('[data-test="task-title-input"]').type('Test Task')
    cy.get('[data-test="task-description-input"]').type('Test Description')
    cy.get('[data-test="add-task-button"]').click()

    cy.get('[data-test="task-title-input"]').should('have.value', '')
    cy.get('[data-test="task-description-input"]').should('have.value', '')
    cy.get('[data-test="task-priority-select"]').should('have.value', 'medium')
  })

  it('should add multiple tasks', () => {
    const tasks = [
      { title: 'Task 1', description: 'Description 1', priority: 'low' },
      { title: 'Task 2', description: 'Description 2', priority: 'medium' },
      { title: 'Task 3', description: 'Description 3', priority: 'high' },
    ]

    tasks.forEach((task) => {
      cy.get('[data-test="task-title-input"]').type(task.title)
      cy.get('[data-test="task-description-input"]').type(task.description)
      cy.get('[data-test="task-priority-select"]').select(task.priority)
      cy.get('[data-test="add-task-button"]').click()
    })

    tasks.forEach((task) => {
      cy.contains(task.title).should('be.visible')
    })
  })
})
