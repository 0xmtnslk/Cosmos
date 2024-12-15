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

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched data:', data);
      setServiceData(data);
    } catch (error: any) {
      console.error('Error fetching data:', error);
      if (error.name === 'AbortError') {
        setError('Request timed out. Please try again.');
      } else {
        setError(`Failed to load data: ${error.message}`);
      }
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

    if (!serviceData) {
      return null;
    }

    return (
      <div className={styles.serviceContent}>
        {Object.entries(serviceData).map(([section, commands]) => (
          <div key={section} className={styles.section}>
            <h3>{section}</h3>
            {Array.isArray(commands) ? (
              commands.map((cmd, index) => (
                <div key={index} className={styles.command}>
                  {cmd.description && <p>{cmd.description}</p>}
                  {cmd.command && (
                    <pre>
                      <code>{cmd.command}</code>
                    </pre>
                  )}
                </div>
              ))
            ) : (
              <pre>
                <code>{JSON.stringify(commands, null, 2)}</code>
              </pre>
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
        {renderServiceData()}
      </div>
    </div>
  );
};

export default NetworkDetails;