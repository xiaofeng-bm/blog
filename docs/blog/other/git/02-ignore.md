---
title: git不懂知识
date: 2020-09-15
---
主要记录自己目前不太懂的一些点

## git pull 和 git fetch区别
我记得我有次面试，面试官问我这问题，我但是只知道git fetch是同步远程代码，后来查资料才知道
```sh
# 拉取远程最新代码
git fetch
# 合并两个分支代码
git merge 

# 拉取远程最新代码并与本地分支进行合并
git pull 

# 结论
git pull = git fetch + git merge
# or
git pull = git fetch + git rebase
```

## 取消merge
如果你从别的分支merge过来代码发现有冲突，想退回到merge之前。
```sh
# 回到merge之前
git merge --abort
```
