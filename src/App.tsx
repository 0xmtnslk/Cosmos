
import React, { useState, useEffect } from 'react';
import Footer from './components/Layout/Footer';
import Header from './components/Layout/Header';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import './App.css';

interface Node {
  name: string;
  pic: string;
  details: string;
  status: string;
}

interface NodesData {
  mainnet: Node[];
  testnet: Node[];
}

export default function App() {
  const [nodes, setNodes] = useState<NodesData>({ mainnet: [], testnet: [] });

  const fetchNodes = async () => {
    try {
      const timestamp = new Date().getTime();
      const response = await fetch(`https://snapshots.coinhunterstr.com/network.json?t=${timestamp}`, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      if (data && typeof data === 'object') {
        const formattedData = {
          mainnet: Array.isArray(data.mainnet) ? data.mainnet : [],
          testnet: Array.isArray(data.testnet) ? data.testnet : []
        };
        setNodes(formattedData);
        console.log('Data loaded:', formattedData);
      }
    } catch (error) {
      console.error('Error fetching nodes:', error);
      setNodes({ mainnet: [], testnet: [] });
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchNodes();
    
    // Fetch every 30 seconds
    const interval = setInterval(fetchNodes, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleNodeClick = (details: string) => {
    window.open(details, '_blank');
  };

  return (
    <div className="app">
      <Header />
      <main className="main">
        <section className="network-section mainnet">
          <h2>Mainnet</h2>
          <div className="network-content">
            <div className="node-grid">
              {nodes.mainnet.map((node, index) => (
                <button
                  key={index}
                  className="node-button"
                  onClick={() => handleNodeClick(node.details)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {node.pic && <img src={node.pic} alt={node.name} className="node-icon" />}
                    <div className="node-info">
                      <span className="node-name">{node.name}</span>
                      <span className="node-description">Click for details</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
        
        <section className="network-section testnet">
          <h2>Testnet</h2>
          <div className="network-content">
            <div className="node-grid">
              {nodes.testnet.map((node, index) => (
                <button
                  key={index}
                  className="node-button"
                  onClick={() => handleNodeClick(node.details)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {node.pic && <img src={node.pic} alt={node.name} className="node-icon" />}
                    <div className="node-info">
                      <span className="node-name">{node.name}</span>
                      <span className="node-description">Click for details</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>
      <ScrollToTop />
      <Footer />
    </div>
  );
}
