const MockUrl = "./data.json"; // 定义请求地址
/**
 * @return {Array}  请求到的数组
 */
async function fetchCodeData() {
  // TODO：待补充代码 目标 1
  const { data } = await axios.get(MockUrl);
  return data;
}

// 根据数据绘制图表
function setChart(chart, data) {
  chart.setOption({
    title: {
      text: "代码量统计",
      left: "center",
      top: 20,
    },

    series: [
      {
        name: "Code Counter",
        type: "treemap",
        data,
        itemStyle: {
          gapWidth: 5,
        },
        // TODO：待补充代码 目标 3
        visibleMin: 6400,
        label: {
          formatter: "{b}\n{c}行",
          // TODO：待补充代码 目标 3
        },
        levels: [
          {
            color: ["#FCB944", "#80B7C2", "#C48483", "#F0663B", "#75D180"],
          },
          {
            colorSaturation: [0.35, 0.5],
          },
        ],
      },
    ],
  });
}

window.onload = async () => {
  const dom = document.querySelector("#canvasContainer");
  const chart = echarts.init(dom);

  // 获取原始数据
  const rawData = await fetchCodeData();

  // 处理后的数据
  const processedData = [];
  // TODO：待补充代码 目标 2

  function enter(prevChildren, dirs, value) {
    if (dirs.length === 1) {
      prevChildren.push({
        name: dirs[0],
        value,
        children: [],
      });
    } else {
      for (const child of prevChildren) {
        // 不对未匹配到的子节点进行处理
        // 数据可信，路径的层级结构是正确的（先出现父节点，后出现子节点）
        // 父节点先被处理，子节点后被处理
        // 例：
        // > components/
        // > components/dialogs/
        // > components/dialogs/components/
        // > components/dialogs/components/base
        if (child.name === dirs[0]) {
          dirs.shift();
          enter(child.children, dirs, value);
          break;
        }
      }
    }
  }

  for (let i = 0; i < rawData.length; i++) {
    const [dir, value] = rawData[i];
    enter(processedData, dir.split("/"), value);
  }
  // TODO：END
  // 绘制图表
  setChart(chart, processedData);
};
