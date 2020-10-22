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

## push
这里直说一个点，本地新建的分支如何推送到远端
```sh
# push时，如果本地新创建的分支，推送的时候需要指定远程仓库名(origin)和分支名(xxx)
git push origin xxx
```

## Feature Branching: 最流行的工作流
小公司或者小团队有时候经常是直接在master上开发，这种方式存在弊端，容易造成master分支混乱，并且加大了出错的可能。当人多了以后这种方式问题就会越来越严重。

所以目前会出现了这种Feature Branching的工作流，总结如下：
- 1、任何新的功能或者bug修复都要新建一个branch分支来写。
- 2、当branch开发完成后，合并到master分支，并删除这个branch。

这种开发的好处如下：
- 1、避免了直接改master，减少了出错的可能。
- 2、方便review。你开发完成后，将新分支告诉同事，同事review通过后，并入master分支。
- 3、方便一人多任务开发，比如你正在开发A功能，突然产品过来让你紧急改个bug，此时你给当前分支一个commit，标记为未完成，然后在新开一个分支去解决bug。

## git log
```sh
# 查看详细历史。
git log -p   # git log --patch 的简写

# 查看简要统计
git log --stat 

# 查看具体的commit
git show  xxxx  # xxxx就是那个对应的HEAD标记
```

## git rebase 
git merge 会在Git的历史中留下分叉，这种分叉后又会和的方式有些人会觉得换乱，所以还有个命令能提到merge，叫做rebase

rebase：在新位置重新提交
