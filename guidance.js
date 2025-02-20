const xhr = new XMLHttpRequest()
xhr.overrideMimeType("application/json");
xhr.open('GET', 'config.json', true);
xhr.onreadystatechange = function () {
  if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
    let json = JSON.parse(xhr.responseText);
    init(json)
  }
};
xhr.send();

//引导组件代码片段
const introduceDomFragment = `<div id="introduce">
<div class="introduce-box">
   <p class="introduce-title">标题</p>
   <p class="introduce-desc">描述</p>
   <div class="introduce-operate">
     <button class="exit">跳过</button>
     <button class="next">下一步</button>
   </div>
</div>
</div>`

const viewWidth = window.innerWidth || document.documentElement.clientWidth;
const viewHeight = window.innerHeight || document.documentElement.clientHeight;

//当前引导索引
var curIndex = 0
//引导组件内容
var comp, introduce, introduceTitle, introduceDesc
//跳过，下一步按钮
var exit, next
//要引导的目标元素、目标元素的大小位置，显示的复制元素
var target, boundingClientRect, clone
//引导弹窗与目标元素的距离
const distance = 16

//获取到引导组件的配置信息后开始引导
function init(config = []) {
  if (!config[curIndex]) return
  document.body.insertAdjacentHTML('afterbegin', introduceDomFragment)
  exit = document.querySelector('.exit')
  next = document.querySelector('.next')
  comp = document.querySelector('#introduce')
  introduce = document.querySelector('.introduce-box')
  introduceTitle = document.querySelector('.introduce-title')
  introduceDesc = document.querySelector('.introduce-desc')
  setIntorduceInfo(config)
  setIntorducePosition(config)

  exit.onclick = function (e) {
    e.stopPropagation()
    document.body.removeChild(comp)
    removeTarget()
  }
  next.onclick = function (e) {
    if (curIndex < config.length - 1) {
      // 下一步
      if (curIndex == config.length - 2) {
        exit.style.display = 'none'
        next.innerText = '完成'
      }
      curIndex++
      setIntorduceInfo(config)
      setIntorducePosition(config)
    } else {
      document.body.removeChild(comp)
      removeTarget()
    }
  }

}

// 设置引导内容
function setIntorduceInfo(config) {
  if (!introduceTitle || !introduceDesc) return
  introduceTitle.innerText = config[curIndex].title
  introduceDesc.innerHTML = config[curIndex].content
}

// 设置引导位置
function setIntorducePosition(config) {
  removeTarget() // 移除上一次复制的元素 
  // 定义当前 target 元素
  target = document.querySelector(config[curIndex].target);

  config[curIndex].click && target.click()
  // 获取目标组件的位置信息
  boundingClientRect = getDomWholeRect(target)

  const { top, right, bottom, left, x, y, width, height } = boundingClientRect
  //是否在可视区域
  let isInViewPort = top >= 0 && left >= 0 && right <= viewWidth && bottom <= viewHeight
  if (!isInViewPort) {
    target.scrollIntoView()
    // 获取目标组件的位置信息
    boundingClientRect = getDomWholeRect(target)
  }
  // 判断引导组件显示位置，如果未 true 表示位于左侧，否则位于右侧
  let isLeft = (x + width / 2) < viewWidth / 2

  // 设置引导组件的位置
  // TODO：待补充代码 目标 1
  introduce.style.top = y + "px";
  if (isLeft) {
    introduce.style.left = (right + distance) + "px";
  } else {
    introduce.style.left = (left - introduce.clientWidth - distance) + "px";
  }

  // TODO：END

  if (config[curIndex].clip) {
    // 添加蒙层
    comp.style.background = 'rgba(0, 0, 0, .5)'
    // 复制 target 元素
    copyTarget()
  } else {
    //不需要蒙层
    comp.style.background = 'none'
  }
}

// 复制元素
function copyTarget() {
  //  TODO：待补充代码
  // 克隆 DOM 节点
  clone = target.cloneNode(true);

  // 当前target的位置大小
  const { top, right, bottom, left, x, y, width, height } = boundingClientRect;

  // 设置clone的位置和样式属性
  clone.style.zIndex = 9999;
  clone.style.top = y + "px";
  clone.style.left = x + "px";
  clone.style.position = "absolute";
  clone.style.width = width + "px";
  clone.style.height = height + "px";

  // 添加在target上
  target.parentNode.appendChild(clone);
  //  TODO：END
}

// 移除元素
function removeTarget() {
  //  TODO：待补充代码
  if (clone) {
    clone.remove();
  }
  //  TODO：END
}

// 获取元素整体的大小和位置 (注意：元素占据的位置要把里面的子元素计算在内，即如果里面有子元素是绝对定位且大小超出父元素，也要把这个子元素超出的部分计算在内)
function getDomWholeRect(dom) {
  if (!dom || !dom.getBoundingClientRect) return
  let customClientRect = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
  let leftArr = []
  let rightArr = []
  let topArr = []
  let bottomArr = []
  const { x, y, width, height } = dom.getBoundingClientRect()
  customClientRect.width = width
  customClientRect.height = height
  customClientRect.x = x
  customClientRect.y = y

  function getPlaceholderSize(dom) {
    if (!dom || !dom.getBoundingClientRect) return
    let childRect = dom.getBoundingClientRect()
    topArr.push(childRect.top)
    rightArr.push(childRect.right)
    bottomArr.push(childRect.bottom)
    leftArr.push(childRect.left)

    if (dom.childNodes) {
      for (let i = 0; i < dom.childNodes.length; i++) {
        const child = dom.childNodes[i]
        getPlaceholderSize(child)
      }
    }
  }
  getPlaceholderSize(dom)

  customClientRect.top = Math.min(...topArr)
  customClientRect.right = Math.max(...rightArr)
  customClientRect.bottom = Math.max(...bottomArr)
  customClientRect.left = Math.min(...leftArr)
  return customClientRect
}
