
import React, { useState } from 'react';
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

  const handleServiceClick = async (service: string) => {
    try {
      setSelectedService(service);
      const networkPath = details.includes('mainnet') ? 'mainnet' : 'testnet';
      const networkName = details.split('/').pop() || '';
      const url = `https://snapshots.coinhunterstr.com/site/${networkPath}/${networkName}/${service}.json`;
      console.log('Fetching URL:', url);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Fetched data:', data);
      setServiceData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setServiceData(null);
    }
  };

  const renderCommandContent = () => {
    if (!serviceData || !selectedService) return null;

    return (
      <div className={styles.commandsContainer}>
        {Object.entries(serviceData).map(([key, value]: [string, any]) => (
          <div key={key} className={styles.section}>
            <h3>{key}</h3>
            {Array.isArray(value) && value.map((item, index) => (
              <div key={index} className={styles.command}>
                <p>{item.description}</p>
                <pre><code>{item.command}</code></pre>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <h1>{name}</h1>
      <p className={styles.description}>{description}</p>
      
      <div className={styles.services}>
        {services.map(service => (
          <button
            key={service}
            onClick={() => handleServiceClick(service)}
            className={`${styles.serviceButton} ${selectedService === service ? styles.active : ''}`}
          >
            {service.charAt(0).toUpperCase() + service.slice(1)}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        {renderCommandContent()}
      </div>
    </div>
  );
};

export default NetworkDetails;
