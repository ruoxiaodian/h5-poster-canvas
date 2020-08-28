(async function () {
    try {
        let instance = new DrawImage();
        await instance.drawRect({
            x: 0,
            y: 0,
            width: instance.canvas.width,
            height: instance.canvas.height,
            fillStyle: "#57bd6a"
        })

        let res = instance.drawText({
            x: 0,
            y: 0,
            text: "寻物启事",
            fillStyle: "#57bd6a",
            fontSize: 40,
            fontWeight: "bold",
            lineHeight: 120,
            textAlign: "center",
            lineWidth: 10,
            strokeStyle: "#fff"
        })

        res = await instance.drawImage({
            src: "./images/share.png",
            dx: 20,
            dy: res.top,
            dw: instance.canvas.width - 70,
            dh: 500,
            mode: "aspectFill",
            lineWidth: 15,
            strokeStyle: "rgba(0, 0, 0, 0.1)"
            // borderRadius: 40
        })
        res = instance.drawText({
            x: 30,
            y: res.top + 20,
            text: "适当好好安徽省都hi哦扫我好滴哦哈 我哦爱好死哦对吼以后爱好爱好死哦和哦哈我爱好死哦和迪欧好好",
            width: instance.canvas.width - 60,
            fillStyle: "#fff",
            fontSize: 28,
            lineHeight: 40,
            textAlign: "center"
        })
        instance.drawRect({
            x: 100,
            y: res.top + 20,
            width: instance.canvas.width - 200,
            height: 50,
            lineWidth: 4,
            strokeStyle: "#fff",
            borderRadius: 10
        })
        res = instance.drawText({
            x: 0,
            y: res.top + 25,
            text: "联系方式: 13770962386",
            fillStyle: "#fff",
            fontSize: 32,
            fontWeight: "bold",
            lineHeight: 32,
            textAlign: "center"
        })
        instance.drawRect({
            x: 0,
            y: res.top +60,
            width: instance.canvas.width,
            height: instance.canvas.height,
            fillStyle: "#fff",
            borderRadius: 60
        })
        instance.drawText({
            x: 30,
            y: res.top + 110,
            text: "寻丢还拾、善小为之",
            fillStyle: "#57bd6a",
            fontSize: 28,
            fontWeight: "bold",
            lineHeight: 32,
            textAlign: "left"
        })
        instance.drawText({
            x: 30,
            y: res.top + 150,
            width: instance.canvas.width - 250,
            text: "寻物启事、拾物认领；来【寻丢还拾】小程序",
            fillStyle: "#999",
            fontSize: 24,
            lineHeight: 32,
            textAlign: "left"
        })
        await instance.drawImage({
            src: "./images/xcx.jpg",
            dx: instance.canvas.width - 200,
            dy: res.top + 80,
            dw: 200,
            dh: 200,
            mode: "aspectFill",
            lineWidth: 15,
            strokeStyle: "#fff",
            borderRadius: 200
        })

    } catch (e) {

    }
})()

let x = [
    {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        width: 0,
        height: 0,
        borderWidth: 10,
        borderStyle: "solid",
        borderColor: "#ccc",
        backgroundColor: "#ebebeb",
        backgroundImage: "",
        backgroundRepeat: "",
        linearGradient: "x1, y1, x2, y2",
        radialGradient: "x1, y1, x2, y2, rx, ry",
        gradientStops: [[0, "block"], [0.5, "white"], [1, "black"]],
        shadowColor: "#ebebeb",
        shadowOffsetX: "",
        shadowOffsetY: "",
        shadowBlur: "",
        opacity: 1.0,
        zIndex: 1
    }
]