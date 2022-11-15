// 不同环境不同地址
const apis = {
    production: 'http://www.seele-exzzz.xyz:10000', // 线上 (生成环境)
    development: 'http://localhost:10000', // 本地 (开发环境) 
}
  
  // ajax请求设置
  const ajax = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? apis.production : apis.development
  })
