import React, { useState, useEffect } from 'react';
import styles from './NetworkDetails.module.css';

interface NetworkDetailsProps {
  name: string;
  description: string;
  details: string;
}

interface CommandData {
  description?: string;
  command?: string;
}

const NetworkDetails: React.FC<NetworkDetailsProps> = ({ name, description, details }) => {
  const [selectedService, setSelectedService] = useState<string>('');
  const [serviceData, setServiceData] = useState<Record<string, CommandData[]> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const services = ['installation', 'snapshots', 'upgrade', 'peers', 'usefulcommands', 'tools'];

  const fetchData = async (service: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const networkPath = details.includes('mainnet') ? 'mainnet' : 'testnet';
      const networkName = details.split('/').pop()?.toLowerCase() || '';
      
      if (!networkName) {
        throw new Error('Invalid network name');
      }

      const url = `https://snapshots.coinhunterstr.com/site/${networkPath}/${networkName}/${service}.json`;
      console.log('Fetching from URL:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'omit'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      console.log('Raw response:', text);

      try {
        const data = JSON.parse(text);
        console.log('Parsed data:', data);
        setServiceData(data);
      } catch (parseError) {
        console.error('JSON Parse error:', parseError);
        throw new Error('Invalid JSON response');
      }
    } catch (error: any) {
      console.error('Fetch error:', error);
      setError(error.message || 'Failed to load data');
      setServiceData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedService) {
      fetchData(selectedService);
    }
  }, [selectedService, details]);

  const handleServiceClick = (service: string) => {
    setSelectedService(service);
  };

  const renderServiceData = () => {
    if (isLoading) {
      return <div className={styles.loading}>Loading...</div>;
    }

    if (error) {
      return <div className={styles.error}>{error}</div>;
    }

    if (!serviceData || !serviceData.commands) {
      return null;
    }

    return (
      <div className={styles.serviceContent}>
        {Object.entries(serviceData.commands).map(([category, categoryCommands]) => (
          <div key={category} className={styles.section}>
            <h3>{category.replace(/_/g, ' ').toUpperCase()}</h3>
            {Object.entries(categoryCommands).map(([cmdKey, cmdData]) => (
              <div key={cmdKey} className={styles.command}>
                <p>{cmdData.description}</p>
                <pre>
                  <code>{cmdData.command}</code>
                </pre>
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
        {renderServiceData()}
      </div>
    </div>
  );
};

export default NetworkDetails;