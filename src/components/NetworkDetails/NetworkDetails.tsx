
import React, { useState, useEffect } from 'react';
import styles from './NetworkDetails.module.css';

interface NetworkDetailsProps {
  name: string;
  description: string;
  details: string;
}

interface Command {
  description: string;
  command: string;
}

interface CommandCategory {
  [key: string]: Command;
}

interface CommandData {
  [category: string]: CommandCategory;
}

const NetworkDetails: React.FC<NetworkDetailsProps> = ({ name, description }) => {
  const [commands, setCommands] = useState<CommandData | null>(null);
  const [selectedService, setSelectedService] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const services = ['installation', 'snapshots', 'upgrade', 'peers', 'usefulcommands', 'tools'];

  useEffect(() => {
    if (selectedService === 'usefulcommands') {
      const loadCommands = async () => {
        try {
          const response = await fetch('./Pasted--key-management-add-new-key-description-Add-a-new-key-comman-1734298136519.txt');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const text = await response.text();
          console.log('Raw text:', text); // Debug için
          const jsonData = JSON.parse(text);
          console.log('Parsed data:', jsonData); // Debug için
          setCommands(jsonData);
          setError(null);
        } catch (err) {
          console.error('Error loading commands:', err);
          setError('Failed to load commands. Please try again.');
          setCommands(null);
        }
      };

      loadCommands();
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
            {Object.entries(commands).map(([category, items]) => (
              <div key={category} className={styles.category}>
                <h3>{category.toUpperCase().replace(/_/g, ' ')}</h3>
                <div className={styles.commandList}>
                  {Object.entries(items).map(([key, item]) => (
                    <div key={key} className={styles.command}>
                      <p className={styles.description}>{item.description}</p>
                      <pre className={styles.code}>
                        <code>{item.command}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NetworkDetails;
