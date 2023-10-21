# Memo

**在此记录一些工作生活中常用的东西 ...**

## Git 命令

| 命令                            | 详情                               |
| ------------------------------- | ---------------------------------- |
| git clone `<url>`               | 将远端仓库克隆到本地               |
| git status                      | 查看工作树状态                     |
| git add `<file(s)>`             | 将文件添加到缓冲区                 |
| git diff                        | 比对工作树和上次提交的区别         |
| git rm --cached `<file_name>`   | 将文件移出缓冲区                   |
| git branch                      | 查看所有本地分支                   |
| git branch -r                   | 查看所有远端分支                   |
| git branch -a                   | 查看所有分支                       |
| git checkout -b `<branch_name>` | 创建并切换到一个新分支             |
| git branch -d `<branch_name>`   | 删除一个分支                       |
| git rebase `<branch_name>`      | 将当前分支变基到另一分支           |
| git rebase -i                   | 交互模式进行变基                   |
| git fetch                       | 拉去远端仓库改动                   |
| git log --oneline               | 以行的形式查看提交记录             |
| git stash save "xxx"            | 暂存改动不提交                     |
| git stash list                  | 查看所有暂存记录                   |
| git stash apply `<stash>`       | 应用某次暂存的改动                 |
| git stash drop `<stash>`        | 移除某次暂存记录                   |
| git stash clear                 | 清除所有暂存记录                   |
| git cherry-pick `<commit_id>`   | 根据提交 ID 嫁接改动               |
| git commit --amend              | 修改最近的一次提交                 |
| git reset --soft `<commit_id>`  | 根据提交 ID 将某次改动退回到缓冲区 |
| git reflog                      | 查看本地仓库头指针的所有改动       |

> [点此查看更多 Git 命令](../frontend/VersionControlSystem/git-cheatsheet.md)
