import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./Dashboard.css";

const Dashboard = () => {
  const [homeValue, setHomeValue] = useState(5000);
  const [homeValueText, setHomeValueText] = useState("");
  const [downPayment, setDownPayment] = useState(1000);
  const [downPaymentText, setDownPaymentText] = useState("");
  const [loanValue, setLoanValue] = useState(4000);
  const [loanValueText, setLoanValueText] = useState("");
  const [interestPercentage, setInterestPercentage] = useState(5);
  const [interestPercentageText, setInterestPercentageText] = useState("");
  const [tenure, setTenure] = useState(5);
  const [chartData, setChartData] = useState({});
  const chartRef = useRef(null);

  useEffect(() => {
    setHomeValueText(homeValue);
    setDownPaymentText(downPayment);
    setLoanValueText(loanValue);
    setInterestPercentageText(interestPercentage);
  }, [homeValue, downPayment, loanValue, interestPercentage]);

  useEffect(() => {
    const calculatePayment = () => {
      const principle = homeValue - downPayment;
      const interest = (principle * interestPercentage * tenure) / 100;
      const data = {
        labels: ["Principle", "Interest"],
        datasets: [
          {
            label: "Payment Breakdown",
            data: [principle, interest],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)", // Principle
              "rgba(54, 162, 235, 0.6)", // Interest
            ],
            borderWidth: 1,
          },
        ],
      };
      setChartData(data);
    };

    calculatePayment();
  }, [homeValue, downPayment, loanValue, interestPercentage, tenure]);

  useEffect(() => {
    if (chartRef.current) {
      if (chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      chartRef.current.chartInstance = new Chart(ctx, {
        type: "pie",
        data: chartData,
      });
    }
  }, [chartData]);

  const handleSliderChange = (setValue, setText) => (event) => {
    const value = parseInt(event.target.value);
    setValue(value);
    setText(value);
  };

  return (
    <div className="dashboard">
      <div className="input-sliders">
        <label htmlFor="homeValue">Home Value: {homeValueText}</label>
        <input
          type="range"
          id="homeValue"
          min="0"
          max="10000"
          value={homeValue}
          onChange={handleSliderChange(setHomeValue, setHomeValueText)}
        />
        <label htmlFor="downPayment">Down Payment: {downPaymentText}</label>
        <input
          type="range"
          id="downPayment"
          min="0"
          max={homeValue}
          value={downPayment}
          onChange={handleSliderChange(setDownPayment, setDownPaymentText)}
        />
        <label htmlFor="loanValue">Loan Value: {loanValueText}</label>
        <input
          type="range"
          id="loanValue"
          min="0"
          max={homeValue}
          value={loanValue}
          onChange={handleSliderChange(setLoanValue, setLoanValueText)}
        />
        <label htmlFor="interestPercentage">
          Interest Percentage: {interestPercentageText}
        </label>
        <input
          type="range"
          id="interestPercentage"
          min="0"
          max="100"
          value={interestPercentage}
          onChange={handleSliderChange(
            setInterestPercentage,
            setInterestPercentageText
          )}
        />
        <label htmlFor="tenure">Tenure: {tenure} years</label>
        <select
          id="tenure"
          value={tenure}
          onChange={(e) => setTenure(parseInt(e.target.value))}
        >
          <option value="5">5 years</option>
          <option value="10">10 years</option>
          <option value="15">15 years</option>
          <option value="20">20 years</option>
          <option value="25">25 years</option>
        </select>
      </div>
      <div className="chart-container">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default Dashboard;
