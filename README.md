### A Binance proxy for the Binance API in Docker
Deploy the server on a location which is not restricted by Binance. The server will forward all requests to Binance and return the response to the client. This way you can use the Binance API from a restricted location.


#### Usage
```
git pull; docker build -t dale0525/binance-server:latest .; docker container rm -f binance-server; docker rmi $(docker images --filter "dangling=true" -q --no-trunc); docker run -d -p 3000:3000 --name binance-server --restart always dale0525/binance-server:latest
```