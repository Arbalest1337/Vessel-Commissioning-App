let config

// #ifdef H5
config = {
  baseURL: "/dev-api",
}
// #endif

// #ifndef H5
config = {
  baseURL: `http://120.195.176.62:3030`,
}
// #endif

export default {
  ...config,
}
