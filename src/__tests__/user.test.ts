import axios from 'axios'
import { describe, expect, test, beforeAll, afterAll } from '@jest/globals'
import mongoose from 'mongoose'

const BASE_URL = 'http://localhost:5000/user'
let createdUserId: string

describe('User API Tests', () => {
  const testUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'password123',
  }

  const updatedUser = {
    firstName: 'Johnny',
    lastName: 'Doe Updated',
  }

  beforeAll(async () => {
    // Ensure the server is running and database is connected
    try {
      await axios.get(`${BASE_URL}/all`)
    } catch (error) {
      throw new Error('Server is not running. Please start the server first.')
    }
  })

  afterAll(async () => {
    // Close mongoose connection after all tests
    await mongoose.connection.close()
  })

  test('should create a new user', async () => {
    const response = await axios.post(BASE_URL, testUser)
    expect(response.status).toBe(201)
    expect((response.data as any).message).toBe('User created successfully')
    expect((response.data as any).user).toHaveProperty('_id')
    expect((response.data as any).user.firstName).toBe(testUser.firstName)
    expect((response.data as any).user.email).toBe(testUser.email)
    createdUserId = (response.data as any).user._id
  })

  test('should get all users', async () => {
    const response = await axios.get(`${BASE_URL}/all`)
    expect(response.status).toBe(200)
    expect(Array.isArray(response.data)).toBe(true)
    expect((response.data as any[]).length).toBeGreaterThan(0)
  })

  test('should get user by id', async () => {
    const response = await axios.get(`${BASE_URL}/${createdUserId}`)
    expect(response.status).toBe(200)
    expect((response.data as any)._id).toBe(createdUserId)
    expect((response.data as any).firstName).toBe(testUser.firstName)
  })

  test('should update user', async () => {
    const response = await axios.put(`${BASE_URL}/${createdUserId}`, updatedUser)
    expect(response.status).toBe(200)
    expect((response.data as any).message).toBe('User updated successfully')
    expect((response.data as any).user.firstName).toBe(updatedUser.firstName)
    expect((response.data as any).user.lastName).toBe(updatedUser.lastName)
    expect((response.data as any).user.email).toBe(testUser.email)
  })

  test('should delete user', async () => {
    const response = await axios.delete(`${BASE_URL}/${createdUserId}`)
    expect(response.status).toBe(200)
    expect((response.data as any).message).toBe('User deleted successfully')
  })

  test('should return 404 when getting deleted user', async () => {
    try {
      await axios.get(`${BASE_URL}/${createdUserId}`)
      // If the request succeeds, fail the test
      fail('Expected request to fail')
    } catch (error: any) {
      expect(error.response.status).toBe(404)
      expect(error.response.data.message).toBe('User not found')
    }
  })

  test('should return 404 when updating non-existent user', async () => {
    try {
      await axios.put(`${BASE_URL}/${createdUserId}`, updatedUser)
      fail('Expected request to fail')
    } catch (error: any) {
      expect(error.response.status).toBe(404)
      expect(error.response.data.message).toBe('User not found')
    }
  })

  test('should return 404 when deleting non-existent user', async () => {
    try {
      await axios.delete(`${BASE_URL}/${createdUserId}`)
      fail('Expected request to fail')
    } catch (error: any) {
      expect(error.response.status).toBe(404)
      expect(error.response.data.message).toBe('User not found')
    }
  })
}) 