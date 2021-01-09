import express from 'express'
type StaticMiddlewareParameters = Parameters<typeof express.static>

export function staticMiddleware(...args: StaticMiddlewareParameters) {
  return express.static(...args)
}
