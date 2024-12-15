
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
      console.log('Fetching URL:', url);
      
      const response = await fetch(url);
      const data = await response.json();
      console.log('Fetched data:', data);
      setServiceData(data);
    } catch (error) {
      console.error('Error:', error);
      setServiceData(null);
    }
  };

  useEffect(() => {
    if (selectedService) {
      fetchServiceData(selectedService);
    }
  }, [selectedService]);

  const renderServiceData = () => {
    if (!serviceData) return null;

    if (selectedService === 'usefulcommands') {
      return Object.entries(serviceData).map(([title, commands]: [string, any]) => (
        <div key={title} className={styles.section}>
          <h3>{title}</h3>
          {Array.isArray(commands) && commands.map((cmd: any, index: number) => (
            <div key={index} className={styles.command}>
              <p>{cmd.description}</p>
              <pre><code>{cmd.command}</code></pre>
            </div>
          ))}
        </div>
      ));
    }
    return null;
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
        {renderServiceData()}
      </div>
    </div>
  );
};

export default NetworkDetails;
