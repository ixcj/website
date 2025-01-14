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
  snowing()
}

export function outputInfo() {
  const lableStyle = `color: #fff; font-weight: bold; background: #000; border-radius: 4px 0 0 4px; overflow: hidden; padding: 2px 4px 2px 6px;`
  const valueStyle = `color: #fff; font-weight: bold; background: #ffb003; border-radius: 0 4px 4px 0; overflow: hidden; padding: 2px 6px 2px 4px;`

  console.log(ASCII_Art.join('\n'))

  console.log(`%c${'Author:'}%c${'XCJ'}`, lableStyle, valueStyle)
  console.log(`%c${'GitHub:'}%c${'https://github.com/ixcj'}`, lableStyle, valueStyle)
  console.log(`%c${'Project Git URL:'}%c${'https://github.com/ixcj/website'}`, lableStyle, valueStyle)
  console.log(`%c${'Blog URL:'}%c${'https://blog.xcj.pw'}`, lableStyle, valueStyle)

  console.log("您好！今天是：" + new Date().toLocaleDateString() + "，希望你有个美好的一天！")
}

type FlakeItem = {
  element: HTMLElement,
  x: number,
  y: number,
  swing: number,
  swingInc: number,
}

function snowing() {
  const numFlakes = 150;
  const flakes: FlakeItem[] = [];
  let width = window.innerWidth;
  let height = window.innerHeight;

  // 创建样式
  const style = document.createElement('style');
  document.head.appendChild(style);
  style.sheet!.insertRule(`
    .snowflake {
      position: fixed;
      top: 0;
      background: #c0c0c0;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      filter: blur(1px);
      box-shadow: 0 0 10px rgba(192, 192, 192, 0.8);
      opacity: 0;
      transition: opacity 0.5s;
    }
  `, 0);

  // 初始化雪花
  function init() {
    for (let i = 0; i < numFlakes; i++) {
      const flake = document.createElement('div');
      flake.className = 'snowflake';
      resetFlake(flake);
      document.body.appendChild(flake);
      flakes.push({
        element: flake,
        x: parseFloat(flake.style.left),
        y: parseFloat(flake.style.top),
        swing: 0,
        swingInc: Math.random() * 0.02 - 0.01
      });
    }
    animate();
  }

  // 重置雪花位置和属性
  function resetFlake(flake: HTMLElement) {
    const size = Math.random() * 6 + 2; // 更大的尺寸范围
    const startX = Math.random() * width;
    const startY = Math.random() * -height;

    flake.style.width = `${size}px`;
    flake.style.height = `${size}px`;
    flake.style.left = `${startX}px`;
    flake.style.top = `${startY}px`;
    flake.style.opacity = String(Math.random() * 0.5 + 0.3); // 随机透明度
    flake.dataset.speed = String(Math.random() * 2 + 0.5); // 调整下落速度
  }

  // 动画效果
  function animate() {
    flakes.forEach(flake => {
      // 更新位置
      flake.y += parseFloat(String(flake.element.dataset.speed));

      // 添加摇摆效果
      flake.swing += flake.swingInc;
      flake.x += Math.sin(flake.swing) * 0.5;

      // 检查边界
      if (flake.y > height || flake.x < 0 || flake.x > width) {
        resetFlake(flake.element);
        flake.x = parseFloat(flake.element.style.left);
        flake.y = parseFloat(flake.element.style.top);
        flake.swing = 0;
      } else {
        flake.element.style.top = `${flake.y}px`;
        flake.element.style.left = `${flake.x}px`;

        // 添加旋转效果
        flake.element.style.transform = `rotate(${flake.swing * 10}deg)`;
      }
    });

    requestAnimationFrame(animate);
  }

  // 调整窗口大小
  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
  }

  // 初始化
  init();
  window.addEventListener('resize', resize);
}
