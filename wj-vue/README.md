# login_test

> login test

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

nginx config file
client_header_buffer_size 128k;
large_client_header_buffers 4 128k;
client_max_body_size 16m;
server_name _;
location / {
  # First attempt to serve request as file, then
  # as directory, then fall back to displaying a 404.
  try_files $uri $uri/ =404;
  #add_header Access-Control-Allow-Origin *;
}
location /api {
  proxy_pass http://10.17.102.0:8080;
  #proxy_pass http://192.168.68.223:9000;
  proxy_cookie_path / /api;
  add_header 'Access-Control-Allow-Origin' '$http_origin' always;
  add_header 'Access-Control-Allow-Credentials' 'true' always;
  proxy_cookie_domain domino_server nginx_sever;
  proxy_temp_file_write_size 5120K;
  expires 1d;
}

