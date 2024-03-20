# extss
Chrome Plugin Ext Shoot Server
Open the local file folder where the Chrome extension is located.

Start the local service through the request.

## Installation

```
npm install -g --save extss
```

## How to use
Start
```javascript
extss
```
```javascript
extss start
```
Stop
```javascript
extss stop
```
As follows (indicates success)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b3efa34a012e4ccbafc6031528b779b3~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=890&h=151&s=12112&e=png&b=0c0c0c)

Request (POST):
```
http://localhost:5698/submit
```

Parameters
extId: Chrome extension id (required)
name: Chrome extension name (required)

## Platform
Currently, this utility is suitable for Windows, macOS, and Linux.