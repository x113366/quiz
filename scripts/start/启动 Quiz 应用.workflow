<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>Actions</key>
	<array>
		<dict>
			<key>ActionID</key>
			<string>com.apple.Terminal.action.runScript</string>
			<key>ActionParameters</key>
			<dict>
				<key>executionEnvironment</key>
				<string>inherit</string>
				<key>standardInput</key>
				<string>none</string>
				<key>script</key>
				<string>#!/bin/zsh

# 加载 NVM 环境
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # 加载 nvm

# 切换到 quiz 项目目录
cd /Users/xiaohansong/Project/web/quiz-app/quiz

# 启动开发服务器
npm run dev</string>
			</dict>
			<key>IsEnabled</key>
			<true/>
		</dict>
		<dict>
			<key>ActionID</key>
			<string>com.apple.Safari.openURL</string>
			<key>ActionParameters</key>
			<dict>
				<key>URL</key>
				<string>http://localhost:5178/quiz/</string>
			</dict>
			<key>IsEnabled</key>
			<true/>
		</dict>
	</array>
	<key>CreationDate</key>
	<date>2026-04-11T00:00:00Z</date>
	<key>Description</key>
	<string>启动 Quiz 应用并打开网页</string>
	<key>IconLocation</key>
	<string>-120,193</string>
	<key>Name</key>
	<string>启动 Quiz 应用</string>
	<key>WorkflowType</key>
	<string>application</string>
</dict>
</plist>