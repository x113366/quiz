#!/bin/zsh

# 加载 NVM 环境
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # 加载 nvm

# 切换到 quiz 项目目录
cd /Users/xiaohansong/Project/web/quiz-app/quiz

# 启动开发服务器
npm run dev