import React, {useEffect, useState} from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip } from 'recharts';
import Title from './Title';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function Chart({ row }) {
    const theme = useTheme();
    const [newData, setNewData] = useState([]);
    const [groupedData, setGroupedData] = useState([]);


    useEffect(() => {
        const newData = row.map(item => {
            const date = new Date(item.dateContributed);
            const month = date.getMonth();
            return { key: month, amount: item.amount };
        });

        setNewData(newData);
    }, [row]);

    useEffect(() => {
        const data = newData.reduce((acc, item) => {
            const key = item.key;
            const amount = item.amount;

            if (acc[key]) {
                // If the key already exists in the accumulator, add the amount
                acc[key].amount += amount;
            } else {
                // If the key doesn't exist, create a new entry
                acc[key] = { key, amount };
            }

            return acc;
        }, {});

        const groupedDataArray = Object.values(data);
        setGroupedData(groupedDataArray);
    }, [newData]);

    const formatXAxis = (value) => {
        // Assuming value is the index of the month in your groupedData array
        return months[value];
    };

    return (
        <React.Fragment>
            <Title>Today</Title>
            <ResponsiveContainer>
                <LineChart
                    data={groupedData}
                    margin={{ top: 16, right: 16, bottom: 0, left: 24, }}
                >
                    <XAxis
                        dataKey="key"
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}
                        tickFormatter={formatXAxis}
                    />
                    <YAxis stroke={theme.palette.text.secondary} style={theme.typography.body2} >
                        <Label
                            angle={270}
                            position="left"
                            style={{
                                textAnchor: 'middle',
                                fill: theme.palette.text.primary,
                                ...theme.typography.body1,
                            }}
                        >
                            Amount (₱)
                        </Label>
                    </YAxis>
                    <Tooltip
                        contentStyle={{ background: 'white', border: '1px solid #ccc' }} // Customize tooltip style
                        labelFormatter={(value) => months[value]} // Format the label in the tooltip
                        formatter={(value) => [`Amount: ₱${value}`]} // Format the data in the tooltip
                    />
                    <Line
                        isAnimationActive={false}
                        type="monotone"
                        dataKey="amount"
                        stroke={theme.palette.primary.main}
                        dot={true}
                    />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}
