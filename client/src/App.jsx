import React, { useEffect, useState } from 'react';

// Format timestamp to something user-friendly
const formatTimestamp = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString('en-US', {
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

function App() {
  const [readings, setReadings] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/data');
      const data = await res.json();
      setReadings(data.slice(0, 3));
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 20* 1000); // Every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🌤️ Weather Sensor Report</h1>
      {readings.length === 0 ? (
        <p style={styles.loading}>Loading data...</p>
      ) : (
        <div style={styles.cardContainer}>
          {readings.map((reading, index) => (
            <div
              key={index}
              style={{
                ...styles.card,
                ...(index === 0 ? styles.cardMain : styles.cardSecondary),
              }}
            >
              <div style={styles.tempRow}>
                <span style={styles.emoji}>🌡️</span>
                <span style={styles.tempText(reading.temperature, index === 0)}>
                  {reading.temperature}°C
                </span>
              </div>
              <div style={styles.humidityRow}>
                <span style={styles.emoji}>💧</span>
                <span style={styles.humidityText}>
                  {reading.humidity}% Humidity
                </span>
              </div>
              <div style={styles.timestamp}>
                🕒 {formatTimestamp(reading.timestamp)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Styles object
const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Segoe UI, sans-serif',
    background: 'linear-gradient(to top, #e0f7fa, #ffffff)',
    minHeight: '100vh',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '2rem',
    color: '#004d40',
  },
  loading: {
    fontSize: '1.5rem',
    color: '#888',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  card: {
    padding: '1rem 2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    background: '#fff',
    width: '250px',
    transition: 'transform 0.2s ease-in-out',
  },
  cardMain: {
    transform: 'scale(1.1)',
    border: '2px solid #26c6da',
  },
  cardSecondary: {
    opacity: 0.8,
  },
  tempRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '0.5rem',
  },
  tempText: (temp, isMain) => ({
    fontSize: isMain ? '2.5rem' : '1.8rem',
    fontWeight: isMain ? 'bold' : '500',
    color: temp >= 28 ? '#e53935' : temp <= 22 ? '#039be5' : '#fb8c00',
  }),
  humidityRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '0.5rem',
  },
  humidityText: {
    fontSize: '1.2rem',
    color: '#455a64',
  },
  timestamp: {
    fontSize: '0.9rem',
    color: '#607d8b',
    marginTop: '0.5rem',
  },
  emoji: {
    marginRight: '0.5rem',
  },
};

export default App;
