class DrawImage extends Poster{
    constructor () {
        super()
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
        let {image, sx, sy, sw, sh, dw, dh} = await this._viewMode(src, width, height, mode);
        context.save();
        context.globalAlpha = opacity;
        if (shadowColor) {
            context.shadowColor = shadowColor;
            context.shadowOffsetX = shadowOffsetX;
            context.shadowOffsetY = shadowOffsetY;
            context.shadowBlur = shadowBlur;
        }
        if (lineWidth || borderRadius) {
            if (borderRadius > Math.min(dw, dh) / 2) { //宽高最小值的一半 认为是绘制圆形
                this.drawArc({
                    x: dx,
                    y: dy,
                    radius: Math.abs(Math.min(dw, dh) / 2),
                    lineWidth,
                    strokeStyle
                    // fillStyle
                })
                context.clip();
                dw = dw + lineWidth;
                dh = dh + lineWidth;
            } else { //圆角矩形
                this.draw({
                    x: dx,
                    y: dy,
                    width: dw,
                    height: dh,
                    borderRadius,
                    lineWidth,
                    strokeStyle
                    // fillStyle
                })
                context.clip();
                dw = dw + lineWidth;
                dh = dh + lineWidth;
            }
        }
        context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
        context.restore();
        return {
            instance: this,
            left: dx + dw,
            top: dy + dh,
            width: dw,
            height: dh
        }

    }

    /*
    * 图片裁剪、缩放的模式
    * mode参数
    * */
    async _viewMode (src, dw, dh, mode) {
        try {
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
        } catch (e) {
            console.log(e.message)
        }
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

}