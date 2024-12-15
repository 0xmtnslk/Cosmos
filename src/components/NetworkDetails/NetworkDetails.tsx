
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const services = ['installation', 'snapshots', 'upgrade', 'peers', 'usefulcommands', 'tools'];

  const fetchData = async (service: string) => {
    setIsLoading(true);
    setError(null);

    const networkPath = details.includes('mainnet') ? 'mainnet' : 'testnet';
    const networkName = details.split('/').pop() || '';
    const url = `https://snapshots.coinhunterstr.com/site/${networkPath}/${networkName}/${service}.json`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setServiceData(data);
      console.log('Fetched data:', data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleServiceClick = (service: string) => {
    setSelectedService(service);
    fetchData(service);
  };

  const renderServiceData = () => {
    if (!serviceData) return null;

    return (
      <div className={styles.section}>
        <h3>{selectedService}</h3>
        {Object.entries(serviceData).map(([title, commands]: [string, any]) => (
          <div key={title} className={styles.command}>
            <h4>{title}</h4>
            {Array.isArray(commands) ? (
              commands.map((cmd: any, index: number) => (
                <div key={index}>
                  <p>{cmd.description}</p>
                  <pre><code>{cmd.command}</code></pre>
                </div>
              ))
            ) : (
              <pre><code>{JSON.stringify(commands, null, 2)}</code></pre>
            )}
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
        {isLoading && <div>Loading...</div>}
        {error && <div className={styles.error}>{error}</div>}
        {!isLoading && !error && renderServiceData()}
      </div>
    </div>
  );
};

export default NetworkDetails;
