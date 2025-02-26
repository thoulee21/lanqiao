const items = {
    value: [
        {
            scores: [90, 80, 70],
        },
        {
            scores: [85, 75, 65],
        },
        {
            scores: [95, 85, 75],
        },
    ],
}
const itemsLength = items.value.length;

const techTotal = items.value.reduce((acc, item) => acc + item.scores[0], 0);
const hardTotal = items.value.reduce((acc, item) => acc + item.scores[1], 0);
const softTotal = items.value.reduce((acc, item) => acc + item.scores[2], 0);


const averageScores = [
    techTotal / itemsLength,
    hardTotal / itemsLength,
    softTotal / itemsLength,
];

console.log(averageScores);
