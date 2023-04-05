export interface adminLoginInterface {
  username: string
  password: string
}


export interface loginResponse {
  token: string,
  type: string,
  nombre: string,
  usuario: string,
  roles: []
}
