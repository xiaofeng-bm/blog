---
title: git commit规范
date: 2020-09-15
---
这里只做个人记录，推荐阅读阮一峰老师的[Commit message 和 Change log 编写指南](https://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)


## type
- feat：新功能（feature）
- fix：修补bug
- docs：文档（documentation）
- style： 格式（不影响代码运行的变动）
- refactor：重构（即不是新增功能，也不是修改bug的代码变动）
- test：增加测试
- chore：构建过程或辅助工具的变动

## Commitizen
安装命令如下：
```sh
npm install -g commitizen
```
然后，在项目目录里，运行下面的命令，使其支持 Angular 的 Commit message 格式。
```sh
commitizen init cz-conventional-changelog --save --save-exact
```
