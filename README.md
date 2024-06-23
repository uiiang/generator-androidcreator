Android 工程生成器

- 操作方法
  - 执行命令
    ```
    yo androidcreator // 要创建的工程目录下执行
    ```
  - 选择工程模板，现支持
    android-showcase[https://github.com/igorwojda/android-showcase]

  - 选择创建工程
    - 输入工程名
    - 输入基础包名
    - 输入主业务模块名
    - 选择是否继续生成新的模块
  - 选择创建模块
    - 输入业务模块名
    - 选择是否继续生成新的模块
  - 选择生成DataModel
    - 选择DataModel属于哪个业务模块
    - 输入要生成DataModel的Json源文件

- 开发
  - 调试命令
  ```
    npm root -g // 查看全局npm包保存路径
    npm link // 此工程根目录执行，将工程软链接到全局npm包保存路径

    npm start // 此工程根目录下执行，启动代码修改监听
  ```