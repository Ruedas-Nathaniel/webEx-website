import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import styles from "./Analysis.module.css";

const Analysis = () => {
  // Mock data
  const genderBiasData = [
    { name: "Male Bias", BERT: 12, Algo2: 8 },
    { name: "Female Bias", BERT: 20, Algo2: 15 },
  ];

  const harmfulWordsData = [
    { name: "Harmful", BERT: 18, Algo2: 10 },
    { name: "Neutral", BERT: 82, Algo2: 90 },
  ];

  const COLORS = ["#FF8042", "#0088FE"];

  return (
    <div className={styles.analysisContainer}>
      <h2>Gender Bias Analysis</h2>

      <div className={styles.chartRow}>
        <div className={styles.chartBox}>
          <h3>Gender Bias (BERT vs Algo2)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={genderBiasData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="BERT" fill="#8884d8" />
              <Bar dataKey="Algo2" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chartBox}>
          <h3>Harmful Words Detected</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={harmfulWordsData}
                dataKey="BERT"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {harmfulWordsData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
