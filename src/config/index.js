let config

// #ifdef H5
config = {
  baseURL: "/prod-api",
  S3_ENDPOINT: "/s3-endpoint",
  S3_BUCKET_NAME: "tiaoshi",
}
// #endif

// #ifndef H5
config = {
  baseURL: `http://120.195.176.62:8802/prod-api`,
  S3_ENDPOINT: "http://120.195.176.62:8800",
  S3_BUCKET_NAME: "tiaoshi",
}
// #endif

export default {
  ...config,
}
