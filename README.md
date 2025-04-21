# 天气显示应用

这是一个基于高德地图 API 的天气显示应用，可以实时查看指定位置的天气信息。

## 功能特点

- 使用高德地图 API 获取天气数据
- 实时显示当前天气状况
- 支持查看未来天气预测
- 简洁直观的用户界面

## 环境要求

- Node.js 20.x 或更高版本
- pnpm 包管理器

## 安装步骤

2. 安装依赖
```bash
pnpm install
```

3. 配置环境变量
创建 `.env.local` 文件并添加高德地图 API 密钥：
```
AMAP_KEY=你的高德地图API密钥
```

4. 启动开发服务器
```bash
pnpm dev
```

## 使用说明

1. 在浏览器中访问 `http://localhost:3000`
2. 输入或选择要查询天气的位置
3. 查看实时天气信息

## 技术栈

- Next.js
- React
- TypeScript
- Tailwind CSS
- 高德地图 API

## 许可证

MIT 