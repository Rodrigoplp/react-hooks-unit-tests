import React from 'react'
import axios from 'axios'
import { mount } from 'enzyme'
import Member from './Member.jsx'

jest.mock('axios')

// test('should fetch users', () => {
// 	const userMock = {
// 		"username": "goodpanda", 
// 		"member_teams": [
// 			3
// 		], 
// 		"lead_teams": [], 
// 		"id": 15, 
// 		"name": "Charlotte Amsterdan"
// 	}
// 	const resp = {data: userMock}
// 	axios.get.mockResolvedValue(resp)

// 	// or you could use the following depending on your use case:
// 	// axios.get.mockImplementation(() => Promise.resolve(resp))

// 	return Users.then(data => expect(data).toEqual(userMock))
// })

jest.mock("services/dataService", () => ({
  getData: jest.fn(),
}))

let getDataPromise

getData.mockImplementation(() => {
  getDataPromise = new MockPromise()

  return getDataPromise
})

it('When fetching succeed', async () => {
	const wrapper = mount(<Member />)
	let loadingNode = wrapper.find('[data-test-id="loading"]')
	let dataNoode = wrapper.find('[data-test-id="user"]')

	const data = {
		"username": "goodpanda", 
		"member_teams": [
			3
		], 
		"lead_teams": [], 
		"id": 15, 
		"name": "Charlotte Amsterdan"
	}

	expect(loadingNode).toHaveLength(1)
	expect(loadingNode.text()).toBe("Loading...")
	expect(dataNode).toHaveLength(0)

	await getDataPromise.resolve(data)

	wrapper.update()

	loadingNode = wrapper.find('[data-test-id="loading"]')
	dataNode = wrapper.find('[data-test-id="user"]')

	expect(loadingNode).toHaveLength(0)

	expect(dataNode).toHaveLength(1)
	expect(dataNode.text()).toBe(data)
})
