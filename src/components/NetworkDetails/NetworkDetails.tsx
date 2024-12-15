
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
  const [commandsData, setCommandsData] = useState<any>(null);

  const services = ['installation', 'snapshots', 'upgrade', 'peers', 'usefulcommands', 'tools'];

  useEffect(() => {
    const networkPath = details.includes('mainnet') ? 'mainnet' : 'testnet';
    const networkName = details.split('/').pop() || '';
    
    const fetchInitialData = async () => {
      try {
        const url = `https://snapshots.coinhunterstr.com/site/${networkPath}/${networkName}/usefulcommands.json`;
        const response = await fetch(url);
        const data = await response.json();
        setCommandsData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchInitialData();
  }, [details]);

  const handleServiceClick = (service: string) => {
    setSelectedService(service);
    if (service === 'usefulcommands' && commandsData) {
      setServiceData(commandsData);
    } else {
      setServiceData(null);
    }
  };

  const renderServiceData = () => {
    if (!serviceData) return null;

    switch (selectedService) {
      case 'installation':
      case 'upgrade':
      case 'usefulcommands':
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

      case 'snapshots':
        return (
          <div className={styles.section}>
            <h3>Snapshots</h3>
            {Object.entries(serviceData).map(([key, value]: [string, any]) => (
              <div key={key} className={styles.command}>
                <p>{value.description || key}</p>
                {value.link && <a href={value.link} target="_blank" rel="noopener noreferrer">{value.link}</a>}
                {value.command && <pre><code>{value.command}</code></pre>}
              </div>
            ))}
          </div>
        );

      case 'peers':
        return (
          <div className={styles.section}>
            <h3>Peers</h3>
            {serviceData.map((peer: any, index: number) => (
              <div key={index} className={styles.command}>
                <pre><code>{peer}</code></pre>
              </div>
            ))}
          </div>
        );

      case 'tools':
        return (
          <div className={styles.section}>
            <h3>Tools</h3>
            {Object.entries(serviceData).map(([name, details]: [string, any]) => (
              <div key={name} className={styles.command}>
                <h4>{name}</h4>
                <p>{details.description}</p>
                {details.link && <a href={details.link} target="_blank" rel="noopener noreferrer">{details.link}</a>}
              </div>
            ))}
          </div>
        );

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
