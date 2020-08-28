# h5-poster-canvas
h5 海报生成器

## 概述
在canvas中元素之间距离都是坐标系间的关系；假定每个元素都是block且position:absolute; 那么left、top、right、bottom这些位置字段跟css中的思路就很接近了；
相对复杂的属性比如投影、渐变参考的是canvas原生写法；详见 [canvas 原生写法](https://airingursb.gitbooks.io/canvas/content/07.html)

### name: image配置

| 字段名           | 类型              | 必填  | 描述                                    |
| --------------- | ---------------- | ---- | -------------------------------------- |
| name            | String           | 是   | 内容块名称 图片为name: "image" |
| src             | String           | 是   | 图片地址 |
| left            | Number(单位:px)   | 否   | 图片离画布左边距离 |
| top             | Number(单位:px)   | 否   | 图片离画布底部距离 |
| topFollow       | Boolean          | 否   | 默认false; 是否跟随上一个元素之后；true则top为当前模块与上一个模块顶部间距 |
| right           | Number(单位:px)   | 否   | 图片画布右边距离 left存在则right无效 |
| bottom          | Number(单位:px)   | 否   | 图片离画布底部距离 top存在 则bottom无效 |
| width           | Number(单位:px)   | 是   | 图片宽度 |
| height          | Number(单位:px)   | 是   | 图片高度 |
| borderRadius    | Number(单位:px)   | 否   | 圆角 如果圆角大于最小边的一半 则为圆形|
| borderWidth     | Number(单位:px)   | 否   | 边框宽度 |
| borderColor     | String           | 否   | 边框颜色 |
| shadowColor     | String           | 否   | 投影颜色 |
| shadowOffsetX   | Number           | 否   | X轴偏移 依赖shadowColor是否有值 |
| shadowOffsetY   | Number           | 否   | Y轴偏移 依赖shadowColor是否有值 |
| shadowBlur      | Number           | 否   | 虚化程度 依赖shadowColor是否有值 |
| opacity         | Number           | 否   | 默认值1.0 |


### name: text配置

| 字段名           | 类型              | 必填  | 描述                                   |
| --------------- | ---------------------- | ---- | -------------------------------------- |
| name            | String           | 是   | 内容块名称 文本为name: "text" |
| text            | String           | 是   | 文本内容 |
| left            | Number(单位:px)   | 否   | 离画布左边距离 |
| top             | Number(单位:px)   | 否   | 离画布底部距离 |
| topFollow       | Boolean          | 否   | 默认false; 是否跟随上一个元素之后；true则top为当前模块与上一个模块顶部间距 |
| right           | Number(单位:px)   | 否   | 离画布右边距离 left存在则right无效 |
| bottom          | Number(单位:px)   | 否   | 离画布底部距离 top存在 则bottom无效 |
| width           | Number(单位:px)   | 否   | 文本内容宽度  超出宽度则换行 |
| fontSize        | String / Number  | 否   | 字体大小 默认20 |
| fontColor       | String           | 否   | 字体颜色 默认 #000 |
| fontWeight      | String / Int     | 否   | 文本的粗细 默认normal|
| fontStyle       | String           | 否   | 文本样式 默认normal|
| fontFamily      | String           | 否   | 字体 |
| textAlign       | String           | 否   | 对齐方式 默认left|
| lineHeight      | Int              | 否   | 字体行高 默认20 |
| lineNum         | Int              | 否   | 文本内容显示行数限制 |
| borderWidth     | Number(单位:px)   | 否   | 描边宽度 |
| borderColor     | String           | 否   | 描边颜色 |
| shadowColor     | String           | 否   | 投影颜色 |
| shadowOffsetX   | Number           | 否   | X轴偏移 依赖shadowColor是否有值 |
| shadowOffsetY   | Number           | 否   | Y轴偏移 依赖shadowColor是否有值 |
| shadowBlur      | Number           | 否   | 虚化程度 依赖shadowColor是否有值 |
| linearGradient  | String           | 否   | 线性渐变区间坐标（x0, y0, x1, y1）|
| radialGradient  | String           | 否   | 镜像渐变区间坐标（x0, y0, r0, x1, y1, r0）|
| gradientStops   | Array            | 否   | 渐变区间颜色值设定[[0, "#fff"],[200, "rgba(0, 0, 0, 0.5)"]]|
| opacity         | Number           | 否   | 默认值1.0 |


### name: block配置

##### 矩形

| 字段名           | 类型              | 必填  | 描述                                    |
| --------------- | ---------------- | ---- | -------------------------------------- |
| name            | String           | 是   | 内容块名称 图片为name: "block" |
| left            | Number(单位:px)   | 否   | 离画布左边距离 |
| top             | Number(单位:px)   | 否   | 离画布底部距离 |
| topFollow       | Boolean          | 否   | 默认false; 是否跟随上一个元素之后；true则top为当前模块与上一个模块顶部间距 |
| right           | Number(单位:px)   | 否   | 离画布右边距离 left存在则right无效 |
| bottom          | Number(单位:px)   | 否   | 离画布底部距离 top存在 则bottom无效 |
| width           | Number(单位:px)   | 否   | 宽度 |
| height          | Number(单位:px)   | 否   | 高度 |
| borderRadius    | Number(单位:px)   | 否   | 圆角 |
| borderWidth     | Number(单位:px)   | 否   | 边框宽度 |
| borderColor     | String           | 否   | 边框颜色 |
| backgroundColor | String           | 否   | 背景色 |
| backgroundImage | String           | 否   | 背景图片路径 |
| backgroundRepeat| String           | 否   | 背景图片覆盖方式 默认no-repeat |
| shadowColor     | String           | 否   | 投影颜色 |
| shadowOffsetX   | Number           | 否   | X轴偏移 依赖shadowColor是否有值 |
| shadowOffsetY   | Number           | 否   | Y轴偏移 依赖shadowColor是否有值 |
| shadowBlur      | Number           | 否   | 虚化程度 依赖shadowColor是否有值 |
| linearGradient  | String           | 否   | 线性渐变区间坐标（x0, y0, x1, y1）|
| radialGradient  | String           | 否   | 镜像渐变区间坐标（x0, y0, r0, x1, y1, r0）|
| gradientStops   | Array            | 否   | 渐变区间颜色值设定[[0, "#fff"],[200, "rgba(0, 0, 0, 0.5)"]] |
| opacity         | Number           | 否   | 默认值1.0 |


##### 圆形

| 字段名           | 类型              | 必填  | 描述                                   |
| --------------- | ---------------------- | ---- | -------------------------------------- |
| name            | String           | 是   | 内容块名称 图片为name: "block" |
| left            | Number(单位:px)   | 否   | 离画布左边距离 |
| top             | Number(单位:px)   | 否   | 离画布底部距离 |
| topFollow       | Boolean          | 否   | 默认false; 是否跟随上一个元素之后；true则top为当前模块与上一个模块顶部间距 |
| right           | Number(单位:px)   | 否   | 离画布右边距离 left存在则right无效 |
| bottom          | Number(单位:px)   | 否   | 离画布底部距离 top存在 则bottom无效 |
| radius          | Number(单位:px)   | 是   | 半径 半径大小 |
| borderWidth     | Number(单位:px)   | 否   | 边框宽度 |
| borderColor     | String           | 否   | 边框颜色 |
| backgroundColor | String           | 否   | 背景色 |
| backgroundImage | String           | 否   | 背景图片路径 |
| backgroundRepeat| String           | 否   | 背景图片覆盖方式 默认no-repeat |
| shadowColor     | String           | 否   | 投影颜色 |
| shadowOffsetX   | Number           | 否   | X轴偏移 依赖shadowColor是否有值 |
| shadowOffsetY   | Number           | 否   | Y轴偏移 依赖shadowColor是否有值 |
| shadowBlur      | Number           | 否   | 虚化程度 依赖shadowColor是否有值 |
| linearGradient  | String           | 否   | 线性渐变区间坐标（x0, y0, x1, y1）|
| radialGradient  | String           | 否   | 镜像渐变区间坐标（x0, y0, r0, x1, y1, r0）|
| gradientStops   | Array            | 否   | 渐变区间颜色值设定[[0, "#fff"],[200, "rgba(0, 0, 0, 0.5)"]] |
| opacity         | Number           | 否   | 默认值1.0 |


##### 正多边形

| 字段名           | 类型              | 必填  | 描述                                   |
| --------------- | ---------------- | ---- | -------------------------------------- |
| name            | String           | 是   | 内容块名称 图片为name: "block" |
| left            | Number(单位:px)   | 否   | 离画布左边距离 |
| top             | Number(单位:px)   | 否   | 离画布底部距离 |
| topFollow       | Boolean          | 否   | 默认false; 是否跟随上一个元素之后；true则top为当前模块与上一个模块顶部间距 |
| right           | Number(单位:px)   | 否   | 离画布右边距离 left存在则right无效 |
| bottom          | Number(单位:px)   | 否   | 离画布底部距离 top存在 则bottom无效 |
| radius          | Number(单位:px)   | 是   | 半径 半径大小 |
| num             | Int              | 是   | 边数 多边形边数 默认3 |
| borderWidth     | Number(单位:px)   | 否   | 边框宽度 |
| borderColor     | String           | 否   | 边框颜色 |
| backgroundColor | String           | 否   | 背景色 |
| backgroundImage | String           | 否   | 背景图片路径 |
| backgroundRepeat| String           | 否   | 背景图片覆盖方式 默认no-repeat |
| shadowColor     | String           | 否   | 投影颜色 |
| shadowOffsetX   | Number           | 否   | X轴偏移 依赖shadowColor是否有值 |
| shadowOffsetY   | Number           | 否   | Y轴偏移 依赖shadowColor是否有值 |
| shadowBlur      | Number           | 否   | 虚化程度 依赖shadowColor是否有值 |
| linearGradient  | String           | 否   | 线性渐变区间坐标（x0, y0, x1, y1）|
| radialGradient  | String           | 否   | 镜像渐变区间坐标（x0, y0, r0, x1, y1, r0）|
| gradientStops   | Array            | 否   | 渐变区间颜色值设定[[0, "#fff"],[200, "rgba(0, 0, 0, 0.5)"]] |
| opacity         | Number           | 否   | 默认值1.0 |