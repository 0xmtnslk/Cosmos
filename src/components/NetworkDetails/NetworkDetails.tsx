
import React, { useState, useEffect } from 'react';
import styles from './NetworkDetails.module.css';

interface NetworkDetailsProps {
  name: string;
  description: string;
  details: string;
}

const NetworkDetails: React.FC<NetworkDetailsProps> = ({ name, description }) => {
  const [commands, setCommands] = useState<any>(null);
  const [selectedService, setSelectedService] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const services = ['installation', 'snapshots', 'upgrade', 'peers', 'usefulcommands', 'tools'];

  useEffect(() => {
    if (selectedService === 'usefulcommands') {
      fetch('/Pasted--commands-key-management-add-new-key-description-Add-a-n-1734297568095.txt')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          try {
            const data = JSON.parse(text);
            setCommands(data);
            setError(null);
          } catch (err) {
            setError('JSON parsing error');
          }
        })
        .catch(() => setError('Failed to load commands'));
    }
  }, [selectedService]);

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
        {error && <div className={styles.error}>{error}</div>}
        {selectedService === 'usefulcommands' && commands && (
          <div className={styles.commands}>
            {Object.entries(commands.commands).map(([category, items]: [string, any]) => (
              <div key={category} className={styles.category}>
                <h3>{category.replace(/_/g, ' ').toUpperCase()}</h3>
                {Object.entries(items).map(([key, item]: [string, any]) => (
                  <div key={key} className={styles.command}>
                    <p>{item.description}</p>
                    <pre><code>{item.command}</code></pre>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NetworkDetails;
