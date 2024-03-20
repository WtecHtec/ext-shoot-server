# extss
Chrome Plugin Ext Shoot Server
打开Chrome扩展程序本地文件夹所在位置。


本地启动服务,通过请求

## 安装

```
npm install -g --save extss
```

## 使用方法
启动
```javascript
extss
```
```javascript
extss start
```
停止
```javascript
extss stop
```
如下(表示成功)
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b3efa34a012e4ccbafc6031528b779b3~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=890&h=151&s=12112&e=png&b=0c0c0c)

请求(POST)：
```
http://localhost:5698/submit
```

参数
extId: Chrome扩展程序id(必填)
name: Chrome扩展名称(必填)

## 平台
目前，此实用程序适用于Windows，macOS和Linux。