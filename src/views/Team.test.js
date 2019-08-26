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
    const callData = {
      teamProps: {
        id: 3
      },
      usersProps: [{ name: 'UserName' }]
    }

    axiosMock.get.mockResolvedValueOnce({ data: callData })

    const address = { url: '/team3' }
    const { getByTestId } = render(<Team props={address} />)
    const resolvedSpan = await waitForElement(() => getByTestId('resolved'))

    expected(resolvedSpan).toHaveContent('Team')
  })
})
