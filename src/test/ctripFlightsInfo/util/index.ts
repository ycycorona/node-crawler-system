import * as dayjs from 'dayjs'

export function getDateList(dateStartStr: string, dateEndStr: string) {
  const dataList: string[] = []
  const dateStart: dayjs.Dayjs = dayjs(dateStartStr)
  const dateEnd: dayjs.Dayjs = dayjs(dateEndStr)
  const diffDays = dateEnd.diff(dateStart, 'day')
  for (let i = 0; i <= diffDays; i++) {
    dataList.push(dateStart.add(i, 'day').format('YYYY-MM-DD'))
  }
  return dataList
}
export function getTextNode(obj: any) {
  return obj.contents().filter((index: number, content: any) => {
    return content.nodeType === 3
  })
}
export function sleep(delay: number) {
  return new Promise((resolve, reject) => {
    console.info(`等待${delay}ms`)
    setTimeout(() => resolve(), delay)
  })
}

