let canvas = document.querySelector("#canvas")
let ctx = canvas.getContext ? canvas.getContext("2d") : new TypeError("no support")
// canvas.width = window.innerWidth
// canvas.height = window.innerHeight
let cw2 = canvas.width / 2
let ch2 = canvas.height / 2
let click = new Path2D()
let shop = new Path2D()
let add = new Path2D()
let back = new Path2D()
let aboutMe = new Path2D()
let clicks = 0
let multiplier = 1
let multiCost = 10
let multiAdd = 1.2
let c = { //c = coordinates
  r1: canvas.width / 4, //fillrect 1-4
  r2: ch2,
  r3: cw2 + 10,
  r4: cw2 - 10,
  t1: cw2 - 75, //text 1-2
  t2: ch2 + 150,
  c1: cw2 - 30, //clicks 1-2
  c2: canvas.height / 4,
  cp: 260,//click added
  s1: cw2 - 75, //shop 1-4
  s2: ch2 - 75,
  s3: cw2 - 100,
  s4: ch2 - 200,
  ct1: (cw2 - 75), //clicks shown coords
  ct2: (ch2 + 150) + 25,

}
function draw() {
  clearScreen()
  // click box
  drawBoxWithText(click, c.r1, c.r2, c.r3, c.r4, "white", "Click", c.t1, c.t2, "black", "72px cursive"
  )
  ctx.fillStyle = "white"
  // clicks text and multiplier text
  ctx.fillText(clicks, c.c1, c.c2)
  ctx.font = "14px cursive"
  ctx.fillText(`+${multiplier} Multiplier`, c.c1 - 15, c.c2 + 30)
  // shop button
  ctx.font = "72px cursive"
  drawBoxWithText(shop, c.s1, c.s2, c.s3, c.s4, "red", "Shop", cw2 - 35, cw2 - 40, "white", "32px cursive")
  // about me button
  drawBoxWithText(aboutMe, canvas.width - 150, canvas.height - 40, canvas.width, canvas.height, "red", "About Me", canvas.width - 150, canvas.height - 10, "white", "32px cursive")
}
function drawShop() {
  clearScreen()
  ctx.font = "72px cursive"
  ctx.fillText(clicks, c.c1, c.c2)
  ctx.font = "14px cursive"
  ctx.fillText(`+${multiplier} Multiplier`, c.c1 - 15, c.c2 + 30)
  ctx.font = "72px cursive"
  drawBoxWithText(add, c.r1, c.r2, c.r3, c.r4, "white", "+1 Multiplier", c.t1 - 50, c.t2 - 50, "black", "45px cursive", true, `${multiCost} Clicks`, c.ct1 - 25, c.ct2)
  drawBoxWithText(back, c.s1, c.s2, c.s3, c.s4, "red", "Back", cw2 - 35, cw2 - 40, "white", "32px cursive")
}
function drawAboutMe() {
  clearScreen()
  ctx.drawImage(document.querySelector("#me"), cw2 - 64, c.s2, 128, 128)
  ctx.fillText("Made by BestSpark687090", 50, c.s1 - 50)

  drawBoxWithText(back, canvas.width - 150, canvas.height - 40, canvas.width, canvas.height, "red", "Back", canvas.width - 100, canvas.height - 10, "white", "32px cursive")
}
canvas.addEventListener("click", function(e) {
  if (ctx.isPointInPath(click, e.offsetX, e.offsetY)) {
    clicks = (1 * multiplier) + clicks
    draw()
  }
  if (ctx.isPointInPath(shop, e.offsetX, e.offsetY)) {
    setTimeout(() => {
      drawShop()
      click = new Path2D()
      shop = new Path2D()
    }, 75)
  }
  if (ctx.isPointInPath(back, e.offsetX, e.offsetY)) {
    setTimeout(() => {
      back = new Path2D()
      add = new Path2D()
      aboutMe = new Path2D()
      draw()
    }, 75)
  }
  if (ctx.isPointInPath(add, e.offsetX, e.offsetY)) {
    if (clicks >= multiCost) {
      clicks -= multiCost
      multiplier++
      multiCost = Math.round(multiCost * multiAdd)
      multiAdd += 0.01
      drawShop()
    } else {
      alert(`You do not have enough clicks for this! You need ${multiCost - clicks} more clicks.`)
    }
  }
  if (ctx.isPointInPath(aboutMe, e.offsetX, e.offsetY)) {
    setTimeout(() => {
      click = new Path2D()
      shop = new Path2D()
      aboutMe = new Path2D()
      drawAboutMe()
    })
  }
})
function drawBoxWithText(v, bx = 0, by = 0, bw = 0, bh = 0, rectcol = "", text = "", tx = 0, ty = 0, textcol = "", font = "", otherText = false, text2 = "", tx2 = 0, ty2 = 0) {
  ctx.fillStyle = rectcol
  v.rect(bx, by, bw, bh)
  ctx.fill(v)
  ctx.font = font
  ctx.fillStyle = textcol
  ctx.fillText(text, tx, ty)
  if (otherText) {
    ctx.fillText(text2, tx2, ty2)
  }
}
function clearScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, canvas.width, canvas.height) //black bg
  ctx.fillStyle = "white"
}