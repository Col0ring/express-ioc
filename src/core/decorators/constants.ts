export const EXCEPTION_KEY = 'exception_key'
export const CONTROLLER_EXCEPTION_KEY = 'controller_exception_key'
export const INJECT_KEY = 'inject_key'
export const INJECTABLE_KEY = 'injectable_key'
export const PATH_KEY = 'path_key'
export const MIDDLEWARE_KEY = 'middleware_key'
export const POST_MIDDLEWARE_KEY = 'post_middleware_key'
export const CONTROLLER_MIDDLEWARE_KEY = 'controller_middleware_key'
export const POST_CONTROLLER_MIDDLEWARE_KEY = 'post_controller_middleware_key'
export const PIPE_KEY = 'pipe_key'

// http
export const METHOD_KEY = 'method_key'
export const REQUEST_KEY = 'request_key'
export const RESPONSE_KEY = 'response_key'
export const REQUEST_QUERY_KEY = 'request_query_key'
export const REQUEST_PARAM_KEY = 'request_param_key'
export const REQUEST_BODY_KEY = 'request_body_key'
export const REQUEST_HEADER_KEY = 'request_header_key'
export const REQUEST_UPLOADED_FILE_KEY = 'request_uploaded_file_key'

export enum RequestProps {
  Query = 'query',
  Param = 'params',
  Header = 'headers',
  Body = 'body',
  File = 'file'
}

export const requestProps = [
  { key: REQUEST_QUERY_KEY, prop: RequestProps.Query },
  { key: REQUEST_QUERY_KEY, prop: RequestProps.Query },
  { key: REQUEST_PARAM_KEY, prop: RequestProps.Param },
  { key: REQUEST_BODY_KEY, prop: RequestProps.Body },
  { key: REQUEST_HEADER_KEY, prop: RequestProps.Header },
  { key: REQUEST_UPLOADED_FILE_KEY, prop: RequestProps.File }
]
