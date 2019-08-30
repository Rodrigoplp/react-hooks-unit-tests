import React from 'react'
import { fireEvent, render, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/react/cleanup-after-each'
import axiosMock from 'axios'
import Home from './Home'

describe('A Home page', () => {
  it('should render without crashing', () => {
    const { getByTestId } = render(<Home />)

    expect(getByTestId('loading')).toHaveTextContent('Loading...')
  })

  it('should fetch data and display teams', async () => {
    let callData = [
      { name: 'Mock team 1', id: 1 },
      { name: 'Mock team 2', id: 2 },
      { name: 'Mock team 3', id: 3 },
      { name: 'Mock team 4', id: 4 },
      { name: 'Mock team 5', id: 5 }
    ]

    axiosMock.get.mockResolvedValueOnce({ data: callData })

    const mockProps = {
      selectTeam: 'testing'
    }

    const { getByTestId, getByText } = render(<Home props={mockProps} />)
    const resolved = await waitForElement(() => getByTestId('resolved'))

    expect(resolved).toHaveTextContent('Tempo teams')
    expect(getByText(callData[2].name)).toBeInTheDocument()
  })

  it('should display correct filtered teams', async () => {
    let callData = [
      { name: 'Mock team 1', id: 1 },
      { name: 'Mock team 2', id: 2 },
      { name: 'Mock team 3', id: 3 },
      { name: 'Mock team 4', id: 4 },
      { name: 'Mock team 5', id: 5 }
    ]

    axiosMock.get.mockResolvedValueOnce({ data: callData })

    const mockProps = {
      selectTeam: 'testing'
    }

    const { getByPlaceholderText, getByText } = render(<Home props={mockProps} />)
    const resolved = await waitForElement(() => getByPlaceholderText('Filter'))

    fireEvent.change(resolved, { target: { value: '2' } })

    expect(getByText(callData[1].name)).toBeInTheDocument()
  })

  it('should not display filtered out teams', async () => {
    let callData = [
      { name: 'Mock team 1', id: 1 },
      { name: 'Mock team 2', id: 2 },
      { name: 'Mock team 3', id: 3 },
      { name: 'Mock team 4', id: 4 },
      { name: 'Mock team 5', id: 5 }
    ]

    axiosMock.get.mockResolvedValueOnce({ data: callData })

    const mockProps = {
      selectTeam: 'testing'
    }

    const { getByPlaceholderText, getByTestId } = render(<Home props={mockProps} />)
    const resolved = await waitForElement(() => getByPlaceholderText('Filter'))

    fireEvent.change(resolved, { target: { value: '2' } })

    expect(getByTestId('content')).not.toHaveTextContent(callData[0].name)
    expect(getByTestId('content')).not.toHaveTextContent(callData[2].name)
    expect(getByTestId('content')).not.toHaveTextContent(callData[3].name)
    expect(getByTestId('content')).not.toHaveTextContent(callData[4].name)
  })
})
