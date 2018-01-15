# furhr-grabbing

Fetch data from http://furhr.com, total `6174` pages, `123464` rows.

> run `npm start`

about 20 - 30 minutes, depends on network and your machine.   
save into `banks.csv`, separated by tab

> write file in loop when network is unstable, see source code and change by yourself.

# 中文

从 http://furhr.com 中抓取数据, 截止2018/01/15一共有`6174`页, `123464`条银行数据.

> 运行 `npm start`

大约需要20 - 30分钟, 依赖于网络速度以及运行机器性能.   
数据被保存到`banks.csv`中, 用tab字符隔开.

> 网络速度不稳定时, 可以边拉数据边写文件, 可以查看源代码中的注解自行修改.