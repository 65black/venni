import request from 'superagent'
import chai from 'chai'
import chaiHttp from 'chai-http'
import { UserModel } from '../database/models/User'
import server from '../app'
import { AuthCredentials } from '../interfaces'

chai.use(chaiHttp)

class TestUtils {
  static async addUser(userCred?: AuthCredentials): Promise<request.Response> {
    return chai
      .request(server)
      .post('/api/signup')
      .send(userCred)
      .then(res => res)
  }

  static async destroyUser(email: string): Promise<void> {
    await UserModel.destroy({ where: { email } })
  }

  static async getProfile(token?: string): Promise<request.Response> {
    return chai
      .request(server)
      .get('/api/profile')
      .set('authorization', token || '')
      .then(res => res)
  }

  static async loginUser(userCred?: AuthCredentials): Promise<request.Response> {
    return chai
      .request(server)
      .post('/api/login')
      .send(userCred)
      .then(res => res)
  }

  static async sendInvite(to: string, token?: string): Promise<request.Response> {
    return chai
      .request(server)
      .put(`/api/invites/${to}`)
      .set('authorization', token || '')
      .then(res => res)
  }

  static async cancelInvite(to: string, token?: string): Promise<request.Response> {
    return chai
      .request(server)
      .delete(`/api/invites/${to}`)
      .set('authorization', token || '')
      .then(res => res)
  }

  static async getInvites(token?: string): Promise<request.Response> {
    return chai
      .request(server)
      .get('/api/invites')
      .set('authorization', token || '')
      .then(res => res)
  }
}

export default TestUtils
