import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import LineChart from "../../component/charts/LineChart";
import '../../../assets/styles/BackTestResultPage.css';
import Button from "../../../components/common/buttons/Button";
import Heading from "../../../components/common/text/Heading";
import CardComponent from "../../../components/common/cards/CardWithChart";

const BackTestResultPage = () => {
    const location = useLocation();
    const { labels, datasets } = location.state;
    const [view, setView] = useState('capital');

    // 切换视图
    const handleToggle = () => {
        setView(view === 'capital' ? 'percentChange' : 'capital');
    };

    // 格式化标签
    function formatLabels(labels) {
        return labels.map(label => {
            // 如果标签是时间戳或时间数组，请根据实际情况修改
            const date = new Date(label);
            const options = {
                year: 'numeric',
                month: 'short', // 'short' 为缩写的月份名称，'long' 为全称
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true, // true 为 12 小时制, false 为 24 小时制
            };
            return date.toLocaleString('en-SG', options); // 根据需要调整格式
        });
    }

    const formattedLabels = formatLabels(labels);

    const data = {
        labels: formattedLabels,
        datasets: view === 'capital' ? [
            {
                label: 'Capital',
                data: datasets[0].data,
                yAxisID: 'y-axis-1',
                borderColor: '#800000',
                backgroundColor: '#800000',
                tension: 0.4,
            }] : [
            {
                label: 'Percent Change',
                data: datasets[1].data,
                yAxisID: 'y-axis-2',
                borderColor: '#000080',
                backgroundColor: '#000080',
                tension: 0.4,
            },
        ],
    };

    return (
        <div>
            <CardComponent
                title={<Heading as="h1" color="brand.10" mb={2}>BackTest Performance</Heading>}
                chart={<LineChart data={data} labels={formattedLabels} />}
                button={<Button onClick={handleToggle}>Toggle View</Button>}
            />
        </div>
    );
};

export default BackTestResultPage;
