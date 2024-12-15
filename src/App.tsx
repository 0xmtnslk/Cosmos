
import React, { useState, useEffect } from 'react';
import Footer from './components/Layout/Footer';
import Header from './components/Layout/Header';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import './App.css';

interface Node {
  name: string;
  pic: string;
  details: string;
}

interface NodesData {
  mainnet: Node[];
  testnet: Node[];
}

export default function App() {
  const [nodes, setNodes] = useState<NodesData>({ mainnet: [], testnet: [] });

  const fetchNodes = async () => {
    try {
      const response = await fetch('https://snapshots.coinhunterstr.com/network.json');
      const data = await response.json();
      setNodes(data);
    } catch (error) {
      console.error('Error fetching nodes:', error);
    }
  };

  useEffect(() => {
    fetchNodes();
    const interval = setInterval(fetchNodes, 300000); // 5 minutes
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
                  {node.pic && <img src={node.pic} alt={node.name} className="node-icon" />}
                  <span className="node-name">{node.name}</span>
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
                  {node.pic && <img src={node.pic} alt={node.name} className="node-icon" />}
                  <span className="node-name">{node.name}</span>
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
