'use strict'


;(async () => {
  try {
    throw 123
  } catch (error) {
    throw error
  }
})().catch(err => {
  console.log('外捕获', err)
})
