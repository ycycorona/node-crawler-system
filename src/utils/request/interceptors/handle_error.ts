export default function () {
  this.interceptors.response.use((res: any) => {
    const { data } = res
    // todo: 可通过data做一些判断
    return res
  }, (error: Error) => {
    return Promise.reject(error)
  })
}
