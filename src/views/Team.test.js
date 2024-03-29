import React from 'react'
import { fireEvent, render, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/react/cleanup-after-each'
import axiosMock from 'axios'
import Team from './Team'

describe('A team page', () => {
  it('should render without crashing', () => {
    const { getByTestId } = render(<Team />)

    expect(getByTestId('loading')).toHaveTextContent('Loading...')
  })

  it('should fetch data and display team lead', async () => {
    const callData = { lead: 1, id: 2, name: 'Awesome Tricksters', members: [2, 3, 4] }

    axiosMock.get.mockResolvedValueOnce({ data: callData })

    const mockProps = {
      users: [
        { id: 1, name: 'Leader', username: 'team leader' },
        { id: 2, name: 'First Member', username: 'first member' },
        { id: 3, name: 'Second Member', username: 'second member' },
        { id: 4, name: 'Third Member', username: 'third member' }
      ]
    }

    const { getByTestId, getByText } = render(<Team props={mockProps} />)
    const resolvedLead = await waitForElement(() => getByTestId('resolved-lead'))

    expect(resolvedLead).toHaveTextContent(mockProps.users[0].name)
    expect(getByText(mockProps.users[2].name)).toBeInTheDocument()
  })

  it('should fetch data and display team members', async () => {
    const callData = { lead: 1, id: 2, name: 'Awesome Tricksters', members: [2, 3, 4] }

    axiosMock.get.mockResolvedValueOnce({ data: callData })

    const mockProps = {
      users: [
        { id: 2, name: 'First Member', username: 'first member' },
        { id: 3, name: 'Second Member', username: 'second member' },
        { id: 4, name: 'Third Member', username: 'third member' }
      ]
    }

    const { getAllByTestId, getByText } = render(<Team props={mockProps} />)
    const resolvedList = await waitForElement(() => getAllByTestId('resolved-list'))

    expect(resolvedList).toContain(getByText(mockProps.users[0].name))
    expect(resolvedList).toContain(getByText(mockProps.users[1].name))
    expect(resolvedList).toContain(getByText(mockProps.users[2].name))
  })

  it('should display correct filtered team members', async () => {
    const callData = { lead: 1, id: 2, name: 'Awesome Tricksters', members: [2, 3, 4] }

    axiosMock.get.mockResolvedValueOnce({ data: callData })

    const mockProps = {
      users: [
        { id: 2, name: 'First Member', username: 'first member' },
        { id: 3, name: 'Second Member', username: 'second member' },
        { id: 4, name: 'Third Member', username: 'third member' }
      ]
    }

    const { getByPlaceholderText, getByText, getAllByTestId } = render(<Team props={mockProps} />)
    const resolved = await waitForElement(() => getByPlaceholderText('Filter'))
    const resolvedList = await waitForElement(() => getAllByTestId('resolved-list'))

    fireEvent.change(resolved, { target: { value: 'First' } })

    expect(resolvedList).toContain(getByText(mockProps.users[0].name))
    expect(resolvedList).not.toContain(mockProps.users[1].name)
  })

  it('should not display filtered out team members', async () => {
    const callData = { lead: 1, id: 2, name: 'Awesome Tricksters', members: [2, 3, 4] }

    axiosMock.get.mockResolvedValueOnce({ data: callData })

    const mockProps = {
      users: [
        { id: 2, name: 'First Member', username: 'first member' },
        { id: 3, name: 'Second Member', username: 'second member' },
        { id: 4, name: 'Third Member', username: 'third member' }
      ]
    }

    const { getByPlaceholderText, getByTestId } = render(<Team props={mockProps} />)
    const resolved = await waitForElement(() => getByPlaceholderText('Filter'))

    fireEvent.change(resolved, { target: { value: 'First' } })

    expect(getByTestId('content')).not.toHaveTextContent(mockProps.users[1].name)
    expect(getByTestId('content')).not.toHaveTextContent(mockProps.users[2].name)
  })
})
