import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/react/cleanup-after-each'
import axiosMock from 'axios'
import Member from './Member'

it('Renders without crashing', () => {
  const { getByTestId } = render(<Member />)
  expect(getByTestId('loading')).toHaveTextContent('Loading...')
})

it('Fetches and displays data', async () => {
  const callData = {
    username: 'goodpanda',
    member_teams: [3],
    lead_teams: [],
    id: 15,
    name: 'Charlotte Amsterdan'
  }

  axiosMock.get.mockResolvedValueOnce({ data: callData })

  const address = { url: '/user15' }
  const { getByTestId } = render(<Member props={address} />)
  const resolvedSpan = await waitForElement(() => getByTestId('resolved'))

  expect(resolvedSpan).toHaveTextContent('Member ' + callData.name)
  expect(axiosMock.get).toHaveBeenCalledTimes(1)
  expect(axiosMock.get).toHaveBeenCalledWith(address.url)
})
