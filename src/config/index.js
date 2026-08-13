let config

// #ifdef H5
config = {
  baseURL: "/dev-api",
  S3_ENDPOINT: "http://192.168.3.52:9000",
  S3_BUCKET_NAME: "tiaoshi",
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