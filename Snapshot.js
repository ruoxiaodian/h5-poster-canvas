/*
* 海报快照
* */

class Snapshot {
    constructor (width, height) {
        const canvas = document.getElementById("canvas2"); //canvas实例
        const pixelRatio = window.devicePixelRatio;
        let boxWidth = width || window.innerWidth;
        let boxHeight = height || window.innerHeight;
        canvas.style.width = boxWidth + "px";
        canvas.style.height = boxHeight + "px";
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.canvas.width = pixelRatio * boxWidth;  //快照宽度
        this.canvas.height = pixelRatio * boxHeight;  //快照高度
    }


    /*
    * 绘制圆形
    * x, y圆心位置；
    * radius为半径大小
    * */
    drawArc (params) {
        const context = this.context;
        let {
            x,
            y,
            radius = 0,
            startAngle = 0,
            endAngle = 2 * Math.PI,
            anticlockwise = false,
            shadowColor,
            shadowOffsetX,
            shadowOffsetY,
            shadowBlur,
            lineWidth,
            strokeStyle,
            fillStyle,
            opacity
        } = params
        x += radius;
        y += radius; //开始绘制的高度
        context.save();
        context.beginPath();
        context.arc(x, y, radius, startAngle, endAngle, anticlockwise);
        if (fillStyle) {
            context.globalAlpha = opacity;
            if (shadowColor) {
                context.shadowColor = shadowColor;
                context.shadowOffsetX = shadowOffsetX;
                context.shadowOffsetY = shadowOffsetY;
                context.shadowBlur = shadowBlur;
            }
            context.fillStyle = fillStyle;
            context.fill();
        }
        if (strokeStyle) {
            context.globalAlpha = opacity;
            if (!fillStyle && shadowColor) {
                context.shadowColor = shadowColor;
                context.shadowOffsetX = shadowOffsetX;
                context.shadowOffsetY = shadowOffsetY;
                context.shadowBlur = shadowBlur;
            }
            context.lineWidth = lineWidth;
            context.strokeStyle = strokeStyle;
            context.stroke();
        }
        context.restore();
        return {
            instance: this,
            left: x + radius + lineWidth / 2,
            top: y + radius + lineWidth / 2,
            width: radius * 2 + lineWidth,
            height: radius * 2 + lineWidth
        }
    }

    /*
    * 绘制矩形
    * x, y开始绘制的左上角坐标
    * width, height 绘制宽高尺寸
    * borderRadius 圆角大小
    * hollowWidth 挖空尺寸
    * */
    drawRect (params = {}) {
        const context = this.context;
        let {
            x,
            y,
            width,
            height,
            borderRadius = 0, //圆角大小
            hollowWidth = 0, //是否挖空
            shadowColor,
            shadowOffsetX,
            shadowOffsetY,
            shadowBlur,
            lineWidth,
            strokeStyle,
            fillStyle,
            opacity
        } = params;
        context.save();
        context.beginPath();
        if (borderRadius === 0) { //普通矩形
            // context.rect(x, y, width, height); //没法使用非零原则
            context.moveTo(x, y);
            context.lineTo(x + width, y);
            context.lineTo(x + width, y + height);
            context.lineTo(x, y + height);
            context.lineTo(x, y);
            context.closePath();
        } else { //圆角矩形
            context.arc(x + borderRadius, y + borderRadius, borderRadius, Math.PI, Math.PI * 3 / 2);
            context.lineTo(x + width - borderRadius, y);
            context.arc(x + width - borderRadius, y + borderRadius, borderRadius, Math.PI * 3 / 2, Math.PI * 2);
            context.lineTo(x + width, y + height - borderRadius);
            context.arc(x + width - borderRadius, y + height - borderRadius, borderRadius, 0, Math.PI / 2);
            context.lineTo(x + borderRadius, y + height);
            context.arc(x + borderRadius, y + height - borderRadius, borderRadius, Math.PI / 2, Math.PI);
            context.lineTo(x, y + borderRadius);
            context.closePath();
        }
        //非零环绕原则 绘制镂空矩形
        if (hollowWidth) { //挖空
            if (borderRadius === 0) { //普通矩形
                context.moveTo(x + hollowWidth, y + hollowWidth);
                context.lineTo(x + hollowWidth, y + height - hollowWidth);
                context.lineTo(x + width - hollowWidth, y + height - hollowWidth);
                context.lineTo(x + width - hollowWidth, y + hollowWidth);
                context.lineTo(x + hollowWidth, y + hollowWidth);
                context.closePath();
            } else { //圆角矩形
                context.arc(x + borderRadius + hollowWidth, y + borderRadius + hollowWidth, borderRadius, 1.5 * Math.PI, Math.PI, true);
                context.lineTo(x + hollowWidth, y + height - borderRadius - hollowWidth);
                context.arc(x + borderRadius + hollowWidth, y + height - borderRadius - hollowWidth, borderRadius, Math.PI, 0.5 * Math.PI, true);
                context.lineTo(x + width - borderRadius - hollowWidth, y + height - hollowWidth);
                context.arc(x + width - borderRadius - hollowWidth, y + height - borderRadius - hollowWidth, borderRadius, 0.5 * Math.PI, 0, true);
                context.lineTo(x + width - hollowWidth, y + borderRadius + hollowWidth);
                context.arc(x + width - borderRadius - hollowWidth, y + borderRadius + hollowWidth, borderRadius, 2 * Math.PI, 1.5 * Math.PI, true);
                context.lineTo(x + borderRadius + hollowWidth , y + hollowWidth);
                context.closePath();
            }
        }
        if (fillStyle) {
            context.globalAlpha = opacity;
            if (shadowColor) {
                context.shadowColor = shadowColor;
                context.shadowOffsetX = shadowOffsetX;
                context.shadowOffsetY = shadowOffsetY;
                context.shadowBlur = shadowBlur;
            }
            context.fillStyle = fillStyle;
            context.fill();
        }
        if (strokeStyle) {
            context.globalAlpha = opacity;
            if (!fillStyle && shadowColor) {
                context.shadowColor = shadowColor;
                context.shadowOffsetX = shadowOffsetX;
                context.shadowOffsetY = shadowOffsetY;
                context.shadowBlur = shadowBlur;
            }
            context.lineWidth = lineWidth;
            context.strokeStyle = strokeStyle;
            context.stroke();
        }
        context.restore();
        return {
            instance: this,
            left: x + width + lineWidth / 2,
            top: y + height + lineWidth / 2,
            width: width + lineWidth,
            height: height + lineWidth
        }
    }

    /*
    * 绘制等边多边形
    * radius为多边形外切圆半径大小
    * num 多边形边数
    * rotate 旋转角度
    * lineWidth 描边宽度
    * borderRadius 为绘制圆角多边形
    * */
    drawPolygon (params = {}) {
        const context = this.context;
        let {
            x = 0, //距离左侧
            y = 0,  //距离头部
            radius = 0, //半径
            num = 3, //边数
            rotate = 0, //旋转角度
            borderRadius = 0, //是否圆角
            shadowColor,
            shadowOffsetX,
            shadowOffsetY,
            shadowBlur,
            lineWidth,
            strokeStyle,
            fillStyle,
            opacity
        } = params
        let angle = 180 - (num - 2) * 180 / num;  //两个相邻点对应的圆心的夹角
        let radian = angle / 180 * Math.PI; //弧度值  圆心夹角对应的弧度值
        x += radius;
        y += radius;
        context.save();
        context.beginPath();
        if (borderRadius === 0) { //没有圆角
            if (rotate === 0) {
                for (let i = 0; i < num; i ++) {
                    let pX = x + Math.sin(radian * i) * radius;
                    let pY = y - Math.cos(radian * i) * radius
                    context.lineTo(pX, pY);
                }
            } else {  //有旋转角度
                let rotateRadian = rotate / 180 * Math.PI; //旋转角度
                for (let i = 0; i < num; i ++) {
                    let pX = x + Math.sin(radian * i + rotateRadian) * radius;
                    let pY = y - Math.cos(radian * i + rotateRadian) * radius
                    context.lineTo(pX, pY);
                }
            }
        } else { //有圆角
            if (rotate === 0) {
                // for (let i = 0; i < num + 1; i ++) {
                //     let inclination = (180 - angle) / 2;
                //     let pX = x + Math.sin(radian * i) * radius;
                //     let pY = y - Math.cos(radian * i) * radius;
                //     let pX0 = pX - Math.cos(inclination / 180 * Math.PI) * borderRadius;
                //     let pY0 = pY + Math.sin(inclination / 180 * Math.PI) * borderRadius;
                //     let pX1 = pX - Math.cos((inclination + angle) / 180 * Math.PI) * borderRadius;
                //     let pY1 = pY + Math.sin((inclination + angle) / 180 * Math.PI) * borderRadius;
                //     // context.arcTo(pX0, pY0, pX1, pY1, borderRadius)
                //     context.lineTo(pX0,pY0)
                //     context.lineTo(pX1,pY1)
                // }
                let p0x = x + Math.sin(radian * 0) * radius;
                let p0y = y - Math.cos(radian * 0) * radius;
                let p1x = x + Math.sin(radian * 1) * radius;
                let p1y = y - Math.cos(radian * 1) * radius;
                let p2x = x + Math.sin(radian * 2) * radius;
                let p2y = y - Math.cos(radian * 2) * radius;
                let pAngle = (num - 2) * 180 / num; //多边形每个角的角度值
                let len = borderRadius / Math.tan((pAngle / 2) / 180 * Math.PI); //顶点离标记点的距离
                let difX = len * Math.sin((pAngle / 2) / 180 * Math.PI); //x坐标差值
                let difY = len * Math.cos((pAngle / 2) / 180 * Math.PI); //y差值
                context.lineTo(p0x - difX, p0y + difY)
                context.lineTo(p0x + difX, p0y + difY)
                context.lineTo(p1x - difX, p1y - difY)
                context.lineTo(p1x - len, p1y)
                context.lineTo(p2x + len, p2y)
                context.lineTo(p2x + difX, p2y - difY)

            } else {
                let rotateRadian = rotate / 180 * Math.PI; //旋转角度
                for (let i = 0; i < num; i ++) {
                    let pX = x + Math.sin(radian * i + rotateRadian) * radius;
                    let pY = y - Math.cos(radian * i + rotateRadian) * radius
                    context.lineTo(pX, pY);
                }
            }
        }
        context.closePath();
        if (fillStyle) {
            context.globalAlpha = opacity;
            if (shadowColor) {
                context.shadowColor = shadowColor;
                context.shadowOffsetX = shadowOffsetX;
                context.shadowOffsetY = shadowOffsetY;
                context.shadowBlur = shadowBlur;
            }
            context.fillStyle = fillStyle;
            context.fill();
            context.restore();
        }
        if (strokeStyle) {
            context.globalAlpha = opacity;
            if (!fillStyle && shadowColor) {
                context.shadowColor = shadowColor;
                context.shadowOffsetX = shadowOffsetX;
                context.shadowOffsetY = shadowOffsetY;
                context.shadowBlur = shadowBlur;
            }
            context.lineWidth = lineWidth;
            context.strokeStyle = strokeStyle;
            context.stroke();
            context.restore();
        }
        return {
            instance: this,
            left: x + radius + lineWidth / 2,
            top: y + radius + lineWidth / 2,
            width: radius * 2 + lineWidth,
            height: radius * 2 + lineWidth
        }
    }

    /*
    * 绘制文本内容
    * width 因为绘制文字会将绘制宽度减去x位移  所以在初始化width 加上x
    * */
    drawText (params = {}) {
        const context = this.context;
        const canvas = this.canvas;
        let {
            x = 0,
            y = 0,
            text = "",
            width, //字体块显示宽度
            lineNum = 0, //不限制
            fontSize = 20,
            lineHeight = 20,
            fontStyle = "normal",
            fontWeight = "normal",
            fontFamily = "arial",
            strokeStyle = "",
            fillStyle = "#000",
            textAlign = "left",
            textBaseline = "alphabetic",
            shadowColor,
            shadowOffsetX,
            shadowOffsetY,
            shadowBlur,
            lineWidth,
            opacity
        } = params;
        if (!text) {throw new Error("文本内容为空")};
        width = (width < canvas.width && width !== 0 ? width + x : canvas.width) - x;
        if (textAlign === "center") {
            x = x + width / 2
        } else if (textAlign === "right") {
            x = x + width
        }
        context.save()
        context.font = fontStyle + " normal" + " " + fontWeight + " " + fontSize + "px" + " " + fontFamily;
        context.textAlign = textAlign;
        context.textBaseline = textBaseline;
        context.globalAlpha = opacity;
        if (shadowColor) {
            context.shadowColor = shadowColor;
            context.shadowOffsetX = shadowOffsetX;
            context.shadowOffsetY = shadowOffsetY;
            context.shadowBlur = shadowBlur;
        }
        fillStyle ? context.fillStyle = fillStyle : null;
        if (strokeStyle) {
            context.lineWidth = lineWidth;
            context.strokeStyle = strokeStyle;
        }
        let textWidth = context.measureText(text).width;
        let baseLine = (lineHeight - fontSize) / 2; //基线居中
        let textArr = [];
        y = y + fontSize;
        if (textWidth > width) {
            let _singleWidth = textWidth / text.length;  //每个字体的平均宽度
            let _singleLineMaxTextNum = parseInt(width / _singleWidth); //每行可以放多少个字
            let _lineNum = Math.ceil(text.length / _singleLineMaxTextNum); //全部内容显示行数
            for (let i = 0; i < _lineNum; i ++) {
                textArr.push(text.substr(i*_singleLineMaxTextNum, _singleLineMaxTextNum))
            }
        } else {
            textArr.push(text);
        }
        if (lineNum !==0 && textArr.length > lineNum) {
            textArr = textArr.splice(0, lineNum);
            let lastText = textArr[textArr.length - 1];
            lastText = lastText.substr(0, lastText.length - 3) + "...";
            textArr[textArr.length - 1] = lastText;
        }
        for (let n = 0; n < textArr.length; n ++) {
            strokeStyle ? context.strokeText(textArr[n], x, y + baseLine * (2 * n + 1) + fontSize * n) : null;
            fillStyle ? context.fillText(textArr[n], x, y + baseLine * (2 * n + 1) + fontSize * n) : null;
        }
        context.restore()
        return {
            instance: this,
            left: x + width + lineWidth / 2,
            top: y + (lineHeight + lineWidth) * textArr.length - fontSize,
            width: width + lineWidth,
            height: (lineHeight + lineWidth) * textArr.length
        }
    }

    /*
    * 绘制图片
    * scr 图片路径
    * dx、dy 在画布上放置图像的坐标位置
    * dw、dh 绘制图片的宽高 如果dw、dh 没有定义 则按照画布剩余宽、高比例缩放要绘制的图片
    * mode 为裁剪方式: 默认原图的0、0点开始 按照绘制大小缩放拉伸；cover按照 等比例居中缩放 覆盖绘制区域
    * borderRadius 圆角大小
    * opacity 透明度
    * */
    async drawImage(params = {}) {
        const context = this.context;
        let {
            src,
            x: dx,
            y: dy,
            width,
            height,
            mode,  //裁剪模式
            borderRadius, //圆角大小
            shadowColor,
            shadowOffsetX,
            shadowOffsetY,
            shadowBlur,
            lineWidth,
            strokeStyle,
            fillStyle,
            opacity
        } = params
        if (!src) {return false};
        let {image, sx, sy, sw, sh, dw, dh} = await this._viewMode(src, width, height, mode);
        context.save();
        if (lineWidth || borderRadius) {
            if (borderRadius > Math.min(dw, dh) / 2) { //宽高最小值的一半 认为是绘制圆形
                this.drawArc({
                    x: dx,
                    y: dy,
                    radius: Math.abs(Math.min(dw, dh) / 2),
                    shadowColor,
                    shadowOffsetX,
                    shadowOffsetY,
                    shadowBlur,
                    lineWidth,
                    strokeStyle,
                    fillStyle,
                    opacity
                })
                context.clip();
            } else { //圆角矩形
                this.drawRect({
                    x: dx,
                    y: dy,
                    width: dw,
                    height: dh,
                    borderRadius,
                    shadowColor,
                    shadowOffsetX,
                    shadowOffsetY,
                    shadowBlur,
                    lineWidth,
                    strokeStyle,
                    fillStyle,
                    opacity
                })
                context.clip();
            }
        } else {
            if (shadowColor) {
                context.shadowColor = shadowColor;
                context.shadowOffsetX = shadowOffsetX;
                context.shadowOffsetY = shadowOffsetY;
                context.shadowBlur = shadowBlur;
            }
        }
        context.globalAlpha = opacity;
        context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
        context.restore();
        return {
            instance: this,
            left: dx + dw + lineWidth / 2,
            top: dy + dh + lineWidth / 2,
            width: dw,
            height: dh
        }
    }

    /*
    * 图片裁剪、缩放的模式
    * mode参数
    * */
    async _viewMode (src, dw, dh, mode) {
        let image = await this._getImageInstance(src);
        let imgWidth = image.width, //原图宽度
            imgHeight = image.height, //原图高度
            ratio = imgWidth / imgHeight; //原图宽高比
        let sx = 0,
            sy = 0,
            sw = imgWidth,
            sh = imgHeight,
            _dRatio = dw / dh; //即将绘制的图片宽高比
        switch (mode) {
            case "aspectFill":
                if (ratio <= _dRatio) {
                    sh = sw / _dRatio;
                    sy = imgHeight / 2 - sh / 2;

                } else {
                    sw = sh * _dRatio;
                    sx = imgWidth / 2 - sw / 2;
                }
                break
            case "widthFix":
                dh = dw / ratio
                break
            case "center":
                if (sw >= dw && sh >= dh) {
                    sy = (sh - dh) / 2;
                    sx = (sw - dw) / 2;
                    sh = dh;
                    sw = dw;
                } else if (sw > dw) {
                    let _sw = _dRatio * dh;
                    sx = (sw - _sw) / 2;
                    sw = _sw;
                    dh = sh
                } else if (sh > dh) {
                    let _sh = dw /_dRatio;
                    sy = (sh - _sh) / 2;
                    sh = _sh;
                    dw = sw
                } else { //如果原图宽高都小于绘制即将绘制的图片宽高  则启用aspectFill 模式
                    if (ratio <= _dRatio) {
                        sh = sw / _dRatio;
                        sy = imgHeight / 2 - sh / 2;

                    } else {
                        sw = sh * _dRatio;
                        sx = imgWidth / 2 - sw / 2;
                    }
                }
                break
            default:
                break
        }
        return {image, sx, sy, sw, sh, dw, dh}

    }

    /*
    * 获取image对象
    * */
    _getImageInstance (src) {
        return new Promise(function (resolve, reject) {
            let image = new Image();
            if (!src) {reject(new Error("图片路径不能为空"))}
            image.src = src;
            image.onload = function () {
                resolve(image)
            }
            image.onerror = function () {
                reject(new Error(src + "加载失败"))
            }
        })
    }


    /*
    * 导入数据处理
    * */
    async draw (data = {}) {
        try {
            const context = this.context;
            const canvas = this.canvas;
            let {
                name = "",
                src,
                left,
                top,
                right,
                bottom,
                width = 0,
                height = 0,
                radius = 0,
                borderWidth = 0,
                borderColor = "",
                fontColor = "#252525",
                backgroundColor = "",
                backgroundImage = "",
                backgroundRepeat = "no-repeat",
                linearGradient = "",
                radialGradient = "",
                gradientStops = "",
                shadowColor = "",
                shadowOffsetX = 0,
                shadowOffsetY = 0,
                shadowBlur = 0,
                opacity = 1.0,
            } = data;
            let x,
                y,
                lineWidth,
                strokeStyle,
                fillStyle;
            //计算x坐标的位置
            src ? borderWidth *= 2 : null; //图片裁切会覆盖一半的描边
            lineWidth = borderWidth;
            strokeStyle = borderColor;
            //计算x, y坐标位置
            if (left || left === 0) {
                x = left + borderWidth / 2;
            } else if (right || right === 0) {
                x = canvas.width - width - right - borderWidth / 2 - radius * 2;
            } else {
                x = borderWidth / 2;
            }
            if (top || top === 0) {
                y = top + borderWidth / 2;
            } else if (bottom || bottom === 0) {
                y = canvas.height - height - bottom - borderWidth / 2 - radius * 2
            } else {
                y = borderWidth / 2;
            }
            //计算fillStyle样式
            fillStyle = (name !== "text" ? backgroundColor : fontColor) || "";
            if (backgroundImage && backgroundRepeat) {
                let img = new Image();    //创建Image对象
                img.src = backgroundImage;    //为Image对象指定图片源
                fillStyle = context.createPattern(img, backgroundRepeat);
            }
            if ((linearGradient || radialGradient) && gradientStops) {
                let grd = null;
                let gradientArr = (linearGradient || radialGradient).split(",").map(function (item) {
                    return parseInt(item)
                });
                if (gradientArr.length < 6) { //线性渐变
                    gradientArr[0] += x;
                    gradientArr[1] += y;
                    gradientArr[2] += x;
                    gradientArr[3] += y;
                    grd = context.createLinearGradient(gradientArr[0], gradientArr[1], gradientArr[2], gradientArr[3]);
                } else {
                    gradientArr[0] += x;
                    gradientArr[1] += y;
                    gradientArr[3] += x;
                    gradientArr[4] += y;
                    grd = context.createRadialGradient(gradientArr[0], gradientArr[1], gradientArr[2], gradientArr[3], gradientArr[4], gradientArr[5]);
                }
                for (let i = 0; i < gradientStops.length; i++) {
                    grd.addColorStop(gradientStops[i][0], gradientStops[i][1]);
                }
                fillStyle = grd;
            }

            //绘制内容选择
            if (name === "block") {
                switch (true) {
                    case radius > 0 && !data.num: //绘制圆形
                        return this.drawArc({
                            x,
                            y,
                            radius,
                            startAngle: data.startAngle,
                            endAngle: data.endAngle,
                            anticlockwise: data.anticlockwise,
                            shadowColor,
                            shadowOffsetX,
                            shadowOffsetY,
                            shadowBlur,
                            lineWidth,
                            strokeStyle,
                            fillStyle,
                            opacity
                        })
                    case width > 0 && height > 0 && !radius: //绘制方形
                        return this.drawRect({
                            x,
                            y,
                            width,
                            height,
                            borderRadius: data.borderRadius,
                            hollowWidth: data.hollowWidth,
                            shadowColor,
                            shadowOffsetX,
                            shadowOffsetY,
                            shadowBlur,
                            lineWidth,
                            strokeStyle,
                            fillStyle,
                            opacity
                        })
                    case radius > 0 && !!data.num: //绘制多边形
                        return this.drawPolygon({
                            x,
                            y,
                            num: data.num,
                            radius: radius,
                            rotate: data.rotate,
                            shadowColor,
                            shadowOffsetX,
                            shadowOffsetY,
                            shadowBlur,
                            lineWidth,
                            strokeStyle,
                            fillStyle,
                            opacity
                        })
                    default:

                        break
                }
            } else if (name === "text") {
                return this.drawText({
                    x,
                    y,
                    width,
                    text: data.text,
                    fontSize: data.fontSize,
                    lineHeight: data.lineHeight,
                    fontWeight: data.fontWeight,
                    lineNum: data.lineNum,
                    fontStyle: data.fontStyle,
                    fontFamily: data.fontFamily,
                    textAlign: data.textAlign,
                    textBaseline: data.textBaseline,
                    shadowColor,
                    shadowOffsetX,
                    shadowOffsetY,
                    shadowBlur,
                    lineWidth,
                    strokeStyle,
                    fillStyle,
                    opacity
                })
            } else if (name === "image") {
                return await this.drawImage({
                    src: data.src,
                    x,
                    y,
                    width,
                    height,
                    mode: data.mode,
                    borderRadius: data.borderRadius,
                    shadowColor,
                    shadowOffsetX,
                    shadowOffsetY,
                    shadowBlur,
                    lineWidth,
                    strokeStyle,
                    fillStyle: fillStyle || "#fff", //默认有背景色是为了实现投影
                    opacity
                })
            }
        } catch (e) {
            console.log(e.message)
        }
    }
}