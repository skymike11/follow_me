import request from '@/utils/request'

export function getSampleData() {
  return request.get('https://reqres.in/api/users', {
    params: {
      page: 2,
    },
  })
}
