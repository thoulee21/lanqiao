import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';

/**
 * 知识点统计组件
 * 统计试题库中各知识点的分布情况
 */
export default {
    setup() {
        const mockUrl = "./mock/question_bank.json";
        let knowledgePoints = [];
        const chartContainer = ref(), rawData = ref([]);
        const difficultyOptions = ['简单', '中等', '困难'];
        const progressOptions = ['选题待审核', '题目制作中', '题目待测试', '题目待修改', '题目完成'];

        const filterObj = reactive({
            difficulty: "",
            progress: ""
        });
        //检测需要，请勿修改 Start
        window.setKnowledgePoints = function (data) {
            knowledgePoints = data;
            applyFilter();
        }
        window.getRawData = function () {
            return JSON.stringify(rawData.value);
        };
        window.setFilter = function (d, p) {
            filterObj.difficulty = d;
            filterObj.progress = p;
            applyFilter();
        };
        window.getExtractUniquePoints = function (data) {
            return extractUniquePoints(data);
        };
        //检测需要，请勿修改 End

        let chart;

        /**
         * 应用筛选条件并更新图表
         */
        function applyFilter() {
            let data;
            // TODO 4 请在下面补充代码 
            data = knowledgePoints.map(point => {
                // 筛选符合条件的题目并计数
                return rawData.value.filter(item => {
                    // 检查难度和进度是否匹配
                    const difficultyMatch = !filterObj.difficulty || item.difficulty === filterObj.difficulty;
                    const progressMatch = !filterObj.progress || item.progress === filterObj.progress;
                    // 检查题目是否包含当前知识点
                    return difficultyMatch && progressMatch && item.points.includes(point);
                }).length;
            });
            // TODO 4 END
            window.filteredData = JSON.stringify(data);
            const option = {
                title: {
                    text: '知识点统计图'
                },
                tooltip: {
                    // TODO 6 请在下面补充代码 

                    // TODO 6 END
                },
                xAxis: {
                    type: 'category',
                    axisLabel: {
                        interval: 0
                    },
                    data: knowledgePoints
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    // TODO 5 请在下面补充代码 

                    // TODO 5 END
                ]
            };
            window.chartData = JSON.stringify(option);
            // TODO 3 请在下面补充代码 

            // TODO 3 END
        }

        /**
         * 提取所有题目中的唯一知识点
         * @param {Array} data - 题目数据
         * @returns {Array} 知识点数组
         */ 
        function extractUniquePoints(data) {
            // TODO 2 请在下面补充代码
            // HIGHLIGHT NOTE
            // 从所有题目中提取知识点并合并成一个数组
            const allPoints = data.reduce((prev, current) => {
                return prev.concat(current.points);
            }, []);

            // 去重并排序
            return [...new Set(allPoints)].sort();
            // HIGHLIGHT NOTE END
            // TODO 2 END
        }

        onMounted(function () {
            chart = echarts.init(chartContainer.value);
            // TODO 1 请在下面补充代码
            axios.get(mockUrl)
                .then(response => {
                    rawData.value = response.data;
                    knowledgePoints = extractUniquePoints(rawData.value);
                    applyFilter();
                })
                .catch(error => {
                    console.error('获取数据失败:', error);
                });
            // TODO 1 END
        });

        return {
            chartContainer,
            difficultyOptions, progressOptions,
            filterObj,
            applyFilter
        };
    },
    template:
        `<div class="window">
    <main ref="chartContainer"></main>
    <aside>
        <h2>筛选数据</h2>
        <el-form label-width="auto">
            <el-form-item label="题目难度">
                <el-select placeholder="选择要显示的题目难度" v-model="filterObj.difficulty">
                    <el-option v-for="(it, idx) in difficultyOptions" :key="idx" :value="it">{{ it }}</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="题目制作进度">
                <el-select placeholder="选择要显示的题目制作进度" v-model="filterObj.progress">
                    <el-option v-for="(it, idx) in progressOptions" :key="idx" :value="it">{{ it }}</el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="applyFilter">应用筛选</el-button>
            </el-form-item>
        </el-form>
    </aside>
</div>`
}