# h5-poster-canvas
h5 海报生成器

## 概述
在canvas中元素之间距离都是坐标系间的关系；假定每个元素都是position:absolute; 那么left、top、right、bottom这些位置字段跟css中的思路就很接近了；
相对复杂的属性比如投影、渐变参考的是canvas原生写法；详见 [canvas 原生写法](https://airingursb.gitbooks.io/canvas/content/07.html)

### name: image配置

| 字段名          | 类型             | 必填 | 描述                                   |
| --------------- | ---------------- | ---- | -------------------------------------- |
| src               | String | 是   | 图片地址                               |
| left               | Number(单位:px) | 否   | 图片离画布左边距离                             |
| top               | Number(单位:px) | 否   | 图片离画布底部距离                               |
| right               | Number(单位:px) | 否   | 图片画布右边距离 left存在则right无效                           |
| bottom               | Number(单位:px) | 否   | 图片离画布底部距离 top存在 则bottom无效                            |
| width           | Number(单位:px) | 是   | 图片宽度 |
| height          | Number(单位:px) | 是   | 图片高度                                       |
| borderRadius    | Number(单位:px) | 否   | 圆角                                   |
| borderWidth     | Number(单位:px) | 否   | 边框宽度                               |
| borderColor     | String           | 否   | 边框颜色                               |
| shadowColor | String           | 否   | 投影颜色                               |
| shadowOffsetX | Number           | 否   | X轴偏移 依赖shadowColor是否有值                           |
| shadowOffsetY | Number           | 否   | Y轴偏移 依赖shadowColor是否有值                             |
| shadowBlur | Number           | 否   | 虚化程度 依赖shadowColor是否有值                              |
| linearGradient          | String              | 否   | 线性渐变区间坐标（x0, y0, x1, y1）    |
| radialGradient          | String              | 否   | 镜像渐变区间坐标（x0, y0, r0, x1, y1, r0）                    |
| gradientStops          | Array              | 否   | 渐变区间颜色值设定[[0, "#fff"],[200, "rgba(0, 0, 0, 0.5)"]]      |
| opacity          | Number              | 否   | 默认值1.0              |