export const getFileName = fileName => fileName.replace(/^\.\/(.*)\.\w+$/, '$1')

export const isFunction = obj => toString.call(obj) === '[object Function]'
