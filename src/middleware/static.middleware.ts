import express from 'express'
type StaticMiddlewareParameters = Parameters<typeof express.static>

export function staticMiddlewate(...args: StaticMiddlewareParameters) {
  return express.static(...args)
}
