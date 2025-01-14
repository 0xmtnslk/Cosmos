
import React, { useState, useEffect } from 'react';
import Footer from './components/Layout/Footer';
import Header from './components/Layout/Header';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import NetworkDetails from './components/NetworkDetails/NetworkDetails';
import './App.css';

interface Node {
  name: string;
  pic: string;
  details: string;
  status: string;
  isNew?: boolean;
}

interface NodesData {
  mainnet: Node[];
  testnet: Node[];
}

export default function App() {
  const [nodes, setNodes] = useState<NodesData>({ mainnet: [], testnet: [] });
  const [selectedNetwork, setSelectedNetwork] = useState<Node | null>(null);

  const fetchNodes = async () => {
    try {
      const response = await fetch('https://snapshots.coinhunterstr.com/network.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setNodes(data);
      console.log('Data loaded:', data);
    } catch (error) {
      console.error('Error fetching nodes:', error);
      setNodes({ mainnet: [], testnet: [] });
    }
  };

  useEffect(() => {
    fetchNodes();
    const interval = setInterval(fetchNodes, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleNodeClick = (node: Node) => {
    setSelectedNetwork(node);
  };

  const handleBackClick = () => {
    setSelectedNetwork(null);
  };

  if (selectedNetwork) {
    return (
      <div className="app">
        <Header />
        <div className="network-container">
          <button onClick={handleBackClick} className="back-button">
            <span className="back-arrow">←</span>
            <span className="back-text">Networks</span>
          </button>
          <NetworkDetails 
            name={selectedNetwork.name}
            description="Join our innovative testnet ecosystem and help shape the future of blockchain."
            details={selectedNetwork.details}
          />
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Header />
      <ThemeToggle />
      <main className="main">
        <section className="banner-section">
          <img 
            src="https://pbs.twimg.com/profile_banners/1408025751463600128/1716412022/1500x500" 
            alt="CoinHunters Banner" 
            className="banner-image"
          />
          <div className="about-section">
            <h2>Who are we ?</h2>
            <p>We are one of the leading mentors and content creators in Turkey's blockchain technology and cryptocurrency market. We are creating contents related to blockchain technology, defi, web3, testnets, pre-sales and all cryptocurrency analystics for the Turkish community. Beside content creation, they are active node runner on Dymension, Nibiru mainnets and testnets such as CrossFi, Warden, Avail etc. We also have an organization for VC investments and launchpad called HuntersArena. We invest in important projects and startups together with our community.</p>
            <p className="contact-text">If you have any questions, please feel free to contact us</p>
          </div>
        </section>
        <section className="network-section mainnet">
          <h2>Mainnet</h2>
          <div className="network-content">
            <div className="node-grid">
              {nodes.mainnet.map((node, index) => (
                <button
                  key={index}
                  className="node-button"
                  onClick={() => handleNodeClick(node)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {node.pic && <img src={node.pic} alt={node.name} className="node-icon" />}
                    <div className="node-info">
                      <span className="node-name">{node.name}</span>
                      <span className="node-description">Click for details</span>
                    </div>
                  </div>
                  <div className={`status-indicator ${node.status === 'ongoing' ? 'ongoing' : 'finish'}`}></div>
                </button>
              ))}
            </div>
          </div>
        </section>
        
        <section className="network-section testnet">
          <h2>Testnet</h2>
          <div className="network-content">
            <h3 className="section-subtitle">Active</h3>
            <div className="node-grid">
              {nodes.testnet
                .filter(node => node.status === 'ongoing')
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((node, index) => (
                <button
                  key={index}
                  className="node-button"
                  onClick={() => handleNodeClick(node)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {node.pic && <img src={node.pic} alt={node.name} className="node-icon" />}
                    <div className="node-info">
                      <span className="node-name">{node.name}</span>
                      <span className="node-description">Click for details</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    {node.isNew && <span className="new-label">New</span>}
                    <div className="status-indicator ongoing"></div>
                  </div>
                </button>
              ))}
            </div>
            
            <h3 className="section-subtitle">Archive</h3>
            <div className="node-grid">
              {nodes.testnet
                .filter(node => node.status === 'finish')
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((node, index) => (
                <button
                  key={index}
                  className="node-button"
                  onClick={() => handleNodeClick(node)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {node.pic && <img src={node.pic} alt={node.name} className="node-icon" />}
                    <div className="node-info">
                      <span className="node-name">{node.name}</span>
                      <span className="node-description">Click for details</span>
                    </div>
                  </div>
                  <div className="status-indicator finish"></div>
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
