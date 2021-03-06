const info = (...params) => {
  if(process.env.NODE_ENV!=='test'){
    params.forEach(para => console.log(para))
  }
}

const error = (...params) => {
  params.forEach(para => console.error(para))
}

module.exports = {
  info,
  error
}
