

### electron 运行

* npm install 之后用npm run electron:serve运行



### electron-builder打包

> npm run electron:build打包的时候会链接github下载electron打包的依赖包很慢，而且容易链接不上，所以直接缓存依赖包

* 清理掉**~\AppData\Local\electron\Cache**缓存数据 
* 将**electron-v16.0.2-win32-ia32.zip** **electron-v16.0.2-win32-x64.zip**放在
  * **~\AppData\Local\electron\Cache**下面
* 清理掉**~\AppData\Local\electron-builder\Cache\nsis** **~\AppData\Local\electron-builder\Cache\winCodeSign**缓存数据 

* 将**nsis-resources-3.4.1.7z**  **nsis-resources-3.4.1.7z**解压之后放在
  * **~\AppData\Local\electron-builder\Cache\nsis**下面

* 将**winCodeSign-2.6.0.7z**解压之后放在
  * **~\AppData\Local\electron-builder\Cache\winCodeSign**下面

> 打包完成之后，主目录的dist_electron会有打包结果

