
import React, { useState, useEffect } from 'react';
import styles from './NetworkDetails.module.css';

interface NetworkDetailsProps {
  name: string;
  description: string;
  details: string;
}

const NetworkDetails: React.FC<NetworkDetailsProps> = ({ name, description, details }) => {
  const [selectedService, setSelectedService] = useState<string>('');
  const [serviceData, setServiceData] = useState<any>(null);

  const services = ['installation', 'snapshots', 'upgrade', 'peers', 'usefulcommands', 'tools'];

  const fetchServiceData = async (service: string) => {
    try {
      const networkPath = details.includes('mainnet') ? 'mainnet' : 'testnet';
      const networkName = details.split('/').pop() || '';
      const url = `https://snapshots.coinhunterstr.com/site/${networkPath}/${networkName}/${service}.json`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setServiceData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setServiceData(null);
    }
  };

  useEffect(() => {
    if (selectedService) {
      fetchServiceData(selectedService);
    }
  }, [selectedService, details]);

  const renderContent = () => {
    if (!serviceData) return null;

    switch (selectedService) {
      case 'usefulcommands':
      case 'installation':
      case 'upgrade':
        return Object.entries(serviceData).map(([section, commands]: [string, any]) => (
          <div key={section} className={styles.section}>
            <h3>{section}</h3>
            {Array.isArray(commands) && commands.map((item: any, index: number) => (
              <div key={index} className={styles.command}>
                <p>{item.description}</p>
                <pre><code>{item.command}</code></pre>
              </div>
            ))}
          </div>
        ));

      case 'snapshots':
        return (
          <div className={styles.section}>
            <h3>Latest Snapshot</h3>
            <div className={styles.snapshot}>
              <p><strong>Height:</strong> {serviceData.height}</p>
              <p><strong>Size:</strong> {serviceData.size}</p>
              <p><strong>Download:</strong> <a href={serviceData.download} target="_blank" rel="noopener noreferrer">Download Link</a></p>
              {serviceData.command && <pre><code>{serviceData.command}</code></pre>}
            </div>
          </div>
        );

      case 'peers':
        return (
          <div className={styles.section}>
            <h3>Live Peers</h3>
            <pre><code>{serviceData.peers?.join('\n')}</code></pre>
            <h3>Seeds</h3>
            <pre><code>{serviceData.seeds?.join('\n')}</code></pre>
            <h3>Addrbook</h3>
            <p><a href={serviceData.addrbook} target="_blank" rel="noopener noreferrer">Download Addrbook</a></p>
          </div>
        );

      case 'tools':
        return Object.entries(serviceData).map(([name, tool]: [string, any]) => (
          <div key={name} className={styles.section}>
            <h3>{name}</h3>
            <p>{tool.description}</p>
            <a href={tool.link} target="_blank" rel="noopener noreferrer">Go to Tool</a>
          </div>
        ));

      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <h1>{name}</h1>
      <p className={styles.description}>{description}</p>
      
      <div className={styles.services}>
        {services.map(service => (
          <button
            key={service}
            onClick={() => setSelectedService(service)}
            className={`${styles.serviceButton} ${selectedService === service ? styles.active : ''}`}
          >
            {service.charAt(0).toUpperCase() + service.slice(1)}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        {renderContent()}
      </div>
    </div>
  );
};

export default NetworkDetails;
