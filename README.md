# 配置编辑器的代码风格

1.在根目录下创建一个 .editorconfig 同时配置一些信息，请查看该项目下的配置 2.给 vscode 安装一个插件 (EditorConfig for VS Code)

# 配置代码格式化风格

1.安装插件 npm install prettier -D 2.在根目录下创建一个 .prettierrc 的文件，然后在内部做配置
{
"useTabs": false, 使用 tab 缩进还是空格，选择 false
"tabWidth": 2, tab 是空格的情况下，是几个空格，选择 2 个
"printWidth": 80, 当行字符串的长度，推荐 80，也可以自己定义
"singleQuote": true, 用单引号还是双引号，新选择 true，使用的是单引号
"trailingComma": "none", 在多行输入的末尾逗号是否添加，设置为 none
"semi": false 语句末尾是否要加分号，默认为 true，选择 false 为不加
}
