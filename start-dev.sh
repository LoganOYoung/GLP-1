#!/bin/bash

# 清理端口3000上的进程
echo "正在清理端口3000..."
lsof -ti:3000 | xargs kill -9 2>/dev/null
sleep 2

# 清理.next缓存
echo "正在清理缓存..."
rm -rf .next

# 启动开发服务器
echo "正在启动开发服务器..."
npm run dev
