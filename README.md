# daily-timeline.js

**使用方法：**

**1、创建canvas标签**，id和daily-timeline.js中保持一致即可，宽高亦可修改，同时记得引入js

```
<canvas id="dailyTimeline" width="800px" height="1440px" style=""></canvas>

<script type="text/javascript" src="js/daily-timeline.js"></script>
```

**2、绘制日程格子**

```
createSchedule(startTime, endTime, contentText);
```

参数：

startTime，开始时间（格式"xx:xx"）<br/>
endTime，结束时间（格式"xx:xx"）<br/>
contentText，文本内容（可选）

例如：

```
createSchedule("08:20", "09:10", "吃饭");
createSchedule("09:45", "10:10", "睡觉");
createSchedule("11:20", "13:00", "打豆豆");
```

效果：

<img width="512px" src="http://img.blog.csdn.net/20170408121135933?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvU2tpcHBlcktldmlu/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast" alt="日程格子"/>

**3、空数据时显示友好提示**

```
drawEmptyView("今天还没有数据哦 ^_^");
```

说明：在实际运用中往往通过解析json来判断是否数据为空。

效果：

<img width="512px" src="http://img.blog.csdn.net/20170408121911639?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvU2tpcHBlcktldmlu/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast" alt="空数据"/>

**4、重绘时间轴**

```
redrawCanvas();
```

调用该方法后，重绘时间轴，清除时间轴里的所有日程格子。
<br/>

**实际项目中使用的效果：**

<img width="640px" src="http://img.blog.csdn.net/20170408110538448?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvU2tpcHBlcktldmlu/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast" alt="实际效果"/>

<br/>
注：请遵循[CC-BY-NC-ND](https://creativecommons.org/licenses/by-nc-nd/3.0/cn/) 协议
