import React, { useState, useEffect } from 'react';
import { optimizeTraffic } from '../utils/optimizer';

const TrafficDashboard = () => {
  const [inputs, setInputs] = useState({
    north: 10,
    south: 10,
    east: 10,
    west: 10,
    emergency: false,
    time_of_day: 'Morning',
    weather: 'Clear',
  });

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputs({
      ...inputs,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) : value,
    });
  };

  const optimize = async () => {
    setLoading(true);
    try {
      // Simulate async operation for smooth UX
      await new Promise(resolve => setTimeout(resolve, 100));
      const result = optimizeTraffic(
        inputs.north,
        inputs.south,
        inputs.east,
        inputs.west,
        inputs.emergency,
        inputs.time_of_day,
        inputs.weather
      );
      setResults(result);
    } catch (err) {
      console.error('Error:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      optimize();
    }, 500); // Reduced delay for better responsiveness
    return () => clearTimeout(timeoutId);
  }, [inputs]);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#1a1a1a',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '20px'
      }}>
        <h1 style={{
          color: '#ffffff',
          textAlign: 'center',
          marginBottom: '40px',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          textShadow: '0 2px 4px rgba(0,0,0,0.5)'
        }}>
          🚦 Smart Traffic Signal Optimization
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '30px',
          marginBottom: '30px'
        }}>
          {/* Left side - Inputs */}
          <div style={{
            backgroundColor: '#2d2d2d',
            borderRadius: '15px',
            padding: '30px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            border: '1px solid #404040'
          }}>
            <h2 style={{
              color: '#4CAF50',
              marginBottom: '25px',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              Traffic Configuration
            </h2>

            <div style={{ display: 'grid', gap: '20px' }}>
              {['north', 'south', 'east', 'west'].map(dir => (
                <div key={dir} style={{
                  backgroundColor: '#3d3d3d',
                  padding: '20px',
                  borderRadius: '10px',
                  border: '1px solid #555'
                }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '10px',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    fontSize: '1.1rem'
                  }}>
                    {dir.toUpperCase()} Vehicles: {inputs[dir]}
                  </label>
                  <input
                    type="range"
                    name={dir}
                    min="0"
                    max="100"
                    value={inputs[dir]}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      height: '6px',
                      borderRadius: '3px',
                      background: '#555',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  />
                </div>
              ))}

              <div style={{
                backgroundColor: '#3d3d3d',
                padding: '20px',
                borderRadius: '10px',
                border: '1px solid #555'
              }}>
                <label style={{
                  display: 'block',
                  marginBottom: '10px',
                  fontWeight: 'bold',
                  color: '#ffffff',
                  fontSize: '1.1rem'
                }}>
                  Emergency Vehicle:
                  <input
                    type="checkbox"
                    name="emergency"
                    checked={inputs.emergency}
                    onChange={handleInputChange}
                    style={{
                      marginLeft: '15px',
                      transform: 'scale(1.2)',
                      cursor: 'pointer'
                    }}
                  />
                </label>
              </div>

              <div style={{
                backgroundColor: '#3d3d3d',
                padding: '20px',
                borderRadius: '10px',
                border: '1px solid #555'
              }}>
                <label style={{
                  display: 'block',
                  marginBottom: '10px',
                  fontWeight: 'bold',
                  color: '#ffffff',
                  fontSize: '1.1rem'
                }}>
                  Time of Day:
                  <select
                    name="time_of_day"
                    value={inputs.time_of_day}
                    onChange={handleInputChange}
                    style={{
                      marginLeft: '15px',
                      padding: '8px 12px',
                      borderRadius: '5px',
                      border: '1px solid #666',
                      backgroundColor: '#2d2d2d',
                      color: '#ffffff',
                      fontSize: '1rem',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="Morning">🌅 Morning</option>
                    <option value="Afternoon">☀️ Afternoon</option>
                    <option value="Evening">🌆 Evening</option>
                    <option value="Night">🌙 Night</option>
                  </select>
                </label>
              </div>

              <div style={{
                backgroundColor: '#3d3d3d',
                padding: '20px',
                borderRadius: '10px',
                border: '1px solid #555'
              }}>
                <label style={{
                  display: 'block',
                  marginBottom: '10px',
                  fontWeight: 'bold',
                  color: '#ffffff',
                  fontSize: '1.1rem'
                }}>
                  Weather:
                  <select
                    name="weather"
                    value={inputs.weather}
                    onChange={handleInputChange}
                    style={{
                      marginLeft: '15px',
                      padding: '8px 12px',
                      borderRadius: '5px',
                      border: '1px solid #666',
                      backgroundColor: '#2d2d2d',
                      color: '#ffffff',
                      fontSize: '1rem',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="Clear">☀️ Clear</option>
                    <option value="Rain">🌧️ Rain</option>
                    <option value="Fog">🌫️ Fog</option>
                  </select>
                </label>
              </div>
            </div>
          </div>

          {/* Right side - Results */}
          <div style={{
            backgroundColor: '#2d2d2d',
            borderRadius: '15px',
            padding: '30px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            border: '1px solid #404040'
          }}>
            <h2 style={{
              color: '#4CAF50',
              marginBottom: '25px',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              Optimization Results
            </h2>

            {loading && (
              <div style={{
                textAlign: 'center',
                padding: '40px',
                color: '#4CAF50',
                fontSize: '1.2rem'
              }}>
                🔄 Optimizing traffic signals...
              </div>
            )}

            {results && !loading && (
              <div style={{ display: 'grid', gap: '20px' }}>
                <div style={{
                  backgroundColor: '#3d3d3d',
                  padding: '25px',
                  borderRadius: '10px',
                  border: '1px solid #555'
                }}>
                  <h3 style={{
                    color: '#4CAF50',
                    marginBottom: '15px',
                    fontSize: '1.2rem'
                  }}>
                    🚦 Signal Timing
                  </h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '15px'
                  }}>
                    <div style={{
                      backgroundColor: results.priority_direction === 'NS' ? '#4CAF50' : '#666',
                      padding: '15px',
                      borderRadius: '8px',
                      textAlign: 'center',
                      color: '#ffffff',
                      fontWeight: 'bold'
                    }}>
                      North-South<br/>{results.north_south_green}s
                    </div>
                    <div style={{
                      backgroundColor: results.priority_direction === 'EW' ? '#4CAF50' : '#666',
                      padding: '15px',
                      borderRadius: '8px',
                      textAlign: 'center',
                      color: '#ffffff',
                      fontWeight: 'bold'
                    }}>
                      East-West<br/>{results.east_west_green}s
                    </div>
                  </div>
                  <p style={{
                    marginTop: '15px',
                    textAlign: 'center',
                    fontSize: '1.1rem',
                    color: '#ffffff'
                  }}>
                    <strong>Priority Direction:</strong> {results.priority_direction}
                  </p>
                </div>

                <div style={{
                  backgroundColor: '#3d3d3d',
                  padding: '25px',
                  borderRadius: '10px',
                  border: '1px solid #555'
                }}>
                  <h3 style={{
                    color: '#4CAF50',
                    marginBottom: '15px',
                    fontSize: '1.2rem'
                  }}>
                    📊 Performance Metrics
                  </h3>
                  <div style={{ display: 'grid', gap: '15px' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px 0',
                      borderBottom: '1px solid #555'
                    }}>
                      <span style={{ color: '#ffffff' }}>Average Wait Time:</span>
                      <span style={{
                        color: results.estimated_wait_time < 2 ? '#4CAF50' : results.estimated_wait_time < 4 ? '#FFC107' : '#F44336',
                        fontWeight: 'bold'
                      }}>
                        {results.estimated_wait_time} min
                      </span>
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px 0',
                      borderBottom: '1px solid #555'
                    }}>
                      <span style={{ color: '#ffffff' }}>Congestion Score:</span>
                      <span style={{
                        color: results.congestion_score < 30 ? '#4CAF50' : results.congestion_score < 60 ? '#FFC107' : '#F44336',
                        fontWeight: 'bold'
                      }}>
                        {results.congestion_score}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Intersection Visualization */}
        <div style={{
          backgroundColor: '#2d2d2d',
          borderRadius: '15px',
          padding: '30px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          border: '1px solid #404040',
          textAlign: 'center'
        }}>
          <h2 style={{
            color: '#4CAF50',
            marginBottom: '25px',
            fontSize: '1.5rem',
            fontWeight: 'bold'
          }}>
            🏙️ Intersection Status
          </h2>

          <div style={{
            width: '250px',
            height: '250px',
            border: '3px solid #666',
            margin: '20px auto',
            position: 'relative',
            backgroundColor: '#1a4d3a',
            borderRadius: '10px'
          }}>
            {/* Roads */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '0',
              right: '0',
              height: '50px',
              backgroundColor: '#666',
              transform: 'translateY(-50%)',
              borderRadius: '5px'
            }}></div>
            <div style={{
              position: 'absolute',
              left: '50%',
              top: '0',
              bottom: '0',
              width: '50px',
              backgroundColor: '#666',
              transform: 'translateX(-50%)',
              borderRadius: '5px'
            }}></div>

            {/* Traffic lights */}
            <div style={{
              position: 'absolute',
              top: '15px',
              left: '15px',
              width: '25px',
              height: '75px',
              backgroundColor: '#333',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
              padding: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.5)'
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: results?.priority_direction === 'NS' ? '#00ff00' : '#ff0000',
                boxShadow: results?.priority_direction === 'NS' ? '0 0 10px #00ff00' : 'none'
              }}></div>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#ffff00',
                opacity: 0.3
              }}></div>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: results?.priority_direction === 'NS' ? '#ff0000' : '#00ff00',
                boxShadow: results?.priority_direction === 'NS' ? 'none' : '0 0 10px #00ff00'
              }}></div>
            </div>

            <div style={{
              position: 'absolute',
              bottom: '15px',
              right: '15px',
              width: '25px',
              height: '75px',
              backgroundColor: '#333',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
              padding: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.5)'
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: results?.priority_direction === 'EW' ? '#00ff00' : '#ff0000',
                boxShadow: results?.priority_direction === 'EW' ? '0 0 10px #00ff00' : 'none'
              }}></div>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#ffff00',
                opacity: 0.3
              }}></div>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: results?.priority_direction === 'EW' ? '#ff0000' : '#00ff00',
                boxShadow: results?.priority_direction === 'EW' ? 'none' : '0 0 10px #00ff00'
              }}></div>
            </div>
          </div>

          <p style={{
            color: '#ffffff',
            fontSize: '1.1rem',
            marginTop: '20px'
          }}>
            Real-time traffic light status based on AI optimization
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrafficDashboard;
                style={{ marginLeft: '10px' }}
              >
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
                <option value="Night">Night</option>
              </select>
            </label>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Weather:
              <select
                name="weather"
                value={inputs.weather}
                onChange={handleInputChange}
                style={{ marginLeft: '10px' }}
              >
                <option value="Clear">Clear</option>
                <option value="Rain">Rain</option>
                <option value="Fog">Fog</option>
              </select>
            </label>
          </div>
        </div>

        {/* Right side - Results */}
        <div style={{ flex: 1 }}>
          <h2>Optimization Results</h2>

          {loading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}

          {results && (
            <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
              <h3>Traffic Signals</h3>
              <p><strong>Priority Direction:</strong> {results.priority_direction}</p>
              <p><strong>North-South Green Time:</strong> {results.north_south_green} seconds</p>
              <p><strong>East-West Green Time:</strong> {results.east_west_green} seconds</p>

              <h3 style={{ marginTop: '20px' }}>Performance Metrics</h3>
              <p><strong>Average Wait Time:</strong> {results.estimated_wait_time} minutes</p>
              <p><strong>Congestion Score:</strong> {results.congestion_score}%</p>
            </div>
          )}

          {/* Simple intersection visualization */}
          <div style={{ marginTop: '30px' }}>
            <h3>Intersection Status</h3>
            <div style={{
              width: '200px',
              height: '200px',
              border: '2px solid #333',
              margin: '20px auto',
              position: 'relative',
              backgroundColor: '#2d5a27'
            }}>
              {/* Roads */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '0',
                right: '0',
                height: '40px',
                backgroundColor: '#666',
                transform: 'translateY(-50%)'
              }}></div>
              <div style={{
                position: 'absolute',
                left: '50%',
                top: '0',
                bottom: '0',
                width: '40px',
                backgroundColor: '#666',
                transform: 'translateX(-50%)'
              }}></div>

              {/* Traffic lights */}
              <div style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                width: '20px',
                height: '60px',
                backgroundColor: '#333',
                borderRadius: '5px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
                padding: '5px'
              }}>
                <div style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: results?.priority_direction === 'NS' ? '#00ff00' : '#ff0000'
                }}></div>
                <div style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#ffff00',
                  opacity: 0.3
                }}></div>
                <div style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: results?.priority_direction === 'NS' ? '#ff0000' : '#00ff00'
                }}></div>
              </div>

              <div style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                width: '20px',
                height: '60px',
                backgroundColor: '#333',
                borderRadius: '5px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
                padding: '5px'
              }}>
                <div style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: results?.priority_direction === 'EW' ? '#00ff00' : '#ff0000'
                }}></div>
                <div style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#ffff00',
                  opacity: 0.3
                }}></div>
                <div style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: results?.priority_direction === 'EW' ? '#ff0000' : '#00ff00'
                }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficDashboard;