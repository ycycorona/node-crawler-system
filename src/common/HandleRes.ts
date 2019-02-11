type Res = {
  status: 1 | 0
  msg: string
  data: any
  error: Error
  errNo: string
}
const DefaultRes: Res = {
  status: 1,
  msg:'success',
  data: null,
  error: null,
  errNo: null }

export default class HandleRes {
  status: 1 | 0
  msg: string
  data: any
  error: Error
  errNo: string

  constructor()
  constructor(o: { status: 0})
  constructor(o: { status?: 1 | 0; msg?: string; data?: any; error?: Error; errNo?: string })
  constructor(o: any = DefaultRes) {
    Object.assign(this, DefaultRes, o,)
  }
}

