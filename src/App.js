import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AverageCalculator = () => {
  const [windowPrevState, setWindowPrevState] = useState([]);
  const [windowCurrState, setWindowCurrState] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [avg, setAvg] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const primeResponse = await axios.get('http://20.244.56.144/test/primes');
      const evenResponse = await axios.get('http://20.244.56.144/test/even');
      const randomResponse = await axios.get('http://20.244.56.144/test/rand');
      const fiboResponse = await axios.get('http://20.244.56.144/test/fibo');
      
      const primeNumbers = primeResponse.data.numbers;
      const evenNumbers = evenResponse.data.numbers;
      const randomNumbers = randomResponse.data.numbers;
      const fiboNumbers = fiboResponse.data.numbers;
      
      // Merge all numbers into one array
      const allNumbers = [...primeNumbers, ...evenNumbers, ...randomNumbers, ...fiboNumbers];

      // Calculate average
      const sum = allNumbers.reduce((acc, num) => acc + num, 0);
      const average = sum / allNumbers.length;

      setWindowPrevState(numbers);
      setWindowCurrState(allNumbers);
      setNumbers(allNumbers);
      setAvg(average);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  return (
    <div>
      <h1>Average Calculator Microservice</h1>
      <h2>Window Previous State</h2>
      <p>{windowPrevState}</p>

      <h2>Window Current State</h2>
      <p>{windowCurrState}</p>

      <h2>Numbers</h2>
      <ul>
        {numbers.map((number, index) => (
          <li key={index}>{number}</li>
        ))}
      </ul>

      <h2>Average</h2>
      <p>{avg}</p>
    </div>
  );
};

export default AverageCalculator;
