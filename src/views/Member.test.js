import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/react/cleanup-after-each'
import axiosMock from 'axios'
import Member from './Member'

describe('A members page', () => {
  it('should render without crashing', () => {
    const { getByTestId } = render(<Member />)
    expect(getByTestId('loading')).toHaveTextContent('Loading...')
  })

  it('should fetch and display data', async () => {
    const callData = {
      username: 'goodpanda',
      name: 'Charlotte Amsterdan'
    }

    axiosMock.get.mockResolvedValueOnce({ data: callData })

    const address = { url: '/user15' }
    const { getByTestId } = render(<Member props={address} />)
    const resolvedName = await waitForElement(() => getByTestId('resolved-name'))
    const resolvedUsername = await waitForElement(() => getByTestId('resolved-username'))

    expect(resolvedName).toHaveTextContent('Member ' + callData.name)
    expect(resolvedUsername).toHaveTextContent(callData.username)
    expect(axiosMock.get).toHaveBeenCalledTimes(1)
    expect(axiosMock.get).toHaveBeenCalledWith(address.url)
  })
})
