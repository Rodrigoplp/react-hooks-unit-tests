import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/react/cleanup-after-each'
import axiosMock from 'axios'
import Team from './Team'

describe('A team page', () => {
  it('should render without crashing', () => {
    const { getByTestId } = render(<Team />)

    expect(getByTestId('loading')).toHaveTextContent('Loading...')
  })

  it('should fetch and display data', async () => {
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

    const { getByTestId } = render(<Team props={mockProps} />)
    const resolvedSpan = await waitForElement(() => getByTestId('resolved'))

    expect(resolvedSpan).toHaveTextContent(mockProps.users[0].name)
  })
})
