const ASCII_Art = [
  '$$\\   $$\\  $$$$$$\\     $$$$$\\',
  '$$ |  $$ |$$  __$$\\    \\__$$ |',
  '\\$$\\ $$  |$$ /  \\__|      $$ |',
  ' \\$$$$  / $$ |            $$ |',
  ' $$  $$<  $$ |      $$\\   $$ |',
  '$$  /\\$$\\ $$ |  $$\\ $$ |  $$ |',
  '$$ /  $$ |\\$$$$$$  |\\$$$$$$  |',
  '\\__|  \\__| \\______/  \\______/',
]

export function cheatsExecute() {
  const lableStyle = `color: #fff; font-weight: bold; background: #000; border-radius: 4px 0 0 4px; overflow: hidden; padding: 2px 4px 2px 6px;`
  const valueStyle = `color: #fff; font-weight: bold; background: #ffb003; border-radius: 0 4px 4px 0; overflow: hidden; padding: 2px 6px 2px 4px;`

  console.log(ASCII_Art.join('\n'))

  console.log(`%c${'Author:'}%c${'XCJ'}`, lableStyle, valueStyle)
  console.log(`%c${'GitHub:'}%c${'https://github.com/ixcj'}`, lableStyle, valueStyle)
  console.log(`%c${'Project Git URL:'}%c${'https://github.com/ixcj/website'}`, lableStyle, valueStyle)
  console.log(`%c${'Blog URL:'}%c${'https://blog.xcj.pw'}`, lableStyle, valueStyle)

  console.log("您好！今天是：" + new Date().toLocaleDateString() + "，希望你有个美好的一天！")
}