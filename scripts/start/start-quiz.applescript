tell application "Terminal"
    activate
    do script "# 加载 NVM 环境\nexport NVM_DIR=\"$HOME/.nvm\"\n[ -s \"$NVM_DIR/nvm.sh\" ] && . \"$NVM_DIR/nvm.sh\"  # 加载 nvm\n\n# 切换到 quiz 项目目录\ncd /Users/xiaohansong/Project/web/quiz-app/quiz\n\n# 启动开发服务器\nnpm run dev"
end tell

# 等待服务器启动
delay 3

tell application "Safari"
    activate
    open location "http://localhost:5178/quiz/"
end tell