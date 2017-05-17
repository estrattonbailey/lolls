const ls = localStorage
const _set = ls.setItem
const _get = ls.getItem
const _del = ls.removeItem

const isExp = exp => exp < Date.now()
const getExp = s => !s ? 0 : Date.now() + (s * 1000)

export default ls ? {
  get: key => {
    const { data, exp } = JSON.parse(_get(key))
    const e = isExp(exp)
    e && _del(key)
    return e ? null : data
  },
  set: (key, data, s = null)  => {
    _set(key, JSON.stringify({
      data,
      exp: getExp(s)
    }))
  }
} : {}
