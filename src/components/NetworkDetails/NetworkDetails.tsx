
import React, { useState } from 'react';
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

const commandsData = {
  "key_management": {
    "add_new_key": {
      "description": "Add a new key",
      "command": "pellcored keys add wallet"
    },
    "recover_existing_key": {
      "description": "Recover an existing key",
      "command": "pellcored keys add wallet --recover"
    },
    "list_all_keys": {
      "description": "List all keys",
      "command": "pellcored keys list"
    },
    "delete_key": {
      "description": "Delete a key",
      "command": "pellcored keys delete wallet"
    },
    "export_key": {
      "description": "Export a key to a file",
      "command": "pellcored keys export wallet"
    },
    "import_key": {
      "description": "Import a key from a file",
      "command": "pellcored keys import wallet wallet.backup"
    },
    "query_wallet_balance": {
      "description": "Query wallet balance",
      "command": "pellcored q bank balances $(pellcored keys show wallet -a)"
    }
  },
  "validator_management": {
    "create_validator": {
      "description": "Create a validator using JSON configuration",
      "command": "pellcored tx staking create-validator validator.json --from wallet --chain-id ignite_186-1 --gas auto --gas-adjustment 1.5 --fees 30apell"
    },
    "unjail_validator": {
      "description": "Unjail a validator",
      "command": "pellcored tx slashing unjail --from wallet --chain-id ignite_186-1 --gas-adjustment 1.5 --gas auto --gas-prices 30apell -y"
    },
    "jail_reason": {
      "description": "Query the reason for validator jailing",
      "command": "pellcored query slashing signing-info $(pellcored tendermint show-validator)"
    },
    "list_active_validators": {
      "description": "List all active validators",
      "command": "pellcored q staking validators -oj --limit=3000 | jq '.validators[] | select(.status==\"BOND_STATUS_BONDED\")' | jq -r '(.tokens|tonumber/pow(10; 6)|floor|tostring) + \" \\t \" + .description.moniker' | sort -gr | nl"
    },
    "list_inactive_validators": {
      "description": "List all inactive validators",
      "command": "pellcored q staking validators -oj --limit=3000 | jq '.validators[] | select(.status==\"BOND_STATUS_UNBONDED\")' | jq -r '(.tokens|tonumber/pow(10; 6)|floor|tostring) + \" \\t \" + .description.moniker' | sort -gr | nl"
    },
    "view_validator_details": {
      "description": "View details of a specific validator",
      "command": "pellcored q staking validator $(pellcored keys show wallet --bech val -a)"
    }
  },
  "token_management": {
    "withdraw_rewards_all": {
      "description": "Withdraw rewards from all validators",
      "command": "pellcored tx distribution withdraw-rewards $(pellcored keys show wallet --bech val -a) --commission --from wallet --chain-id ignite_186-1 --gas-adjustment 1.5 --gas auto --gas-prices 30apell -y"
    },
    "withdraw_commission_rewards": {
      "description": "Withdraw commission and rewards from your validator",
      "command": "pellcored tx distribution withdraw-rewards $(pellcored keys show wallet --bech val -a) --commission --from wallet --chain-id ignite_186-1 --gas-adjustment 1.5 --gas auto --gas-prices 30apell -y"
    },
    "delegate_tokens_self": {
      "description": "Delegate tokens to yourself",
      "command": "pellcored tx staking delegate $(pellcored keys show wallet --bech val -a) 1000000000000000000apell --from wallet --chain-id ignite_186-1 --gas-adjustment 1.5 --gas auto --gas-prices 30apell -y"
    },
    "delegate_tokens_validator": {
      "description": "Delegate tokens to a specific validator",
      "command": "pellcored tx staking delegate <TO_VALOPER_ADDRESS> 1000000000000000000apell --from wallet --chain-id ignite_186-1 --gas-adjustment 1.5 --gas auto --gas-prices 30apell -y"
    },
    "redelegate_tokens": {
      "description": "Redelegate tokens to another validator",
      "command": "pellcored tx staking redelegate $(pellcored keys show wallet --bech val -a) <TO_VALOPER_ADDRESS> 1000000000000000000apell --from wallet --chain-id ignite_186-1 --gas-adjustment 1.5 --gas auto --gas-prices 30apell -y"
    },
    "unbond_tokens": {
      "description": "Unbond tokens from your validator",
      "command": "pellcored tx staking unbond $(pellcored keys show wallet --bech val -a) 1000000000000000000apell --from wallet --chain-id ignite_186-1 --gas-adjustment 1.5 --gas auto --gas-prices 30apell -y"
    },
    "send_tokens": {
      "description": "Send tokens to another wallet",
      "command": "pellcored tx bank send wallet <TO_WALLET_ADDRESS> 1000000000000000000apell --from wallet --chain-id ignite_186-1 --gas-adjustment 1.5 --gas auto --gas-prices 30apell -y"
    }
  },
  "governance": {
    "list_proposals": {
      "description": "List all proposals",
      "command": "pellcored query gov proposals"
    },
    "view_proposal": {
      "description": "View a proposal by ID",
      "command": "pellcored query gov proposal 1"
    },
    "vote_yes": {
      "description": "Vote 'YES' on a proposal",
      "command": "pellcored tx gov vote 1 yes --from wallet --chain-id ignite_186-1 --gas-adjustment 1.5 --gas auto --gas-prices 30apell -y"
    },
    "vote_no": {
      "description": "Vote 'NO' on a proposal",
      "command": "pellcored tx gov vote 1 no --from wallet --chain-id ignite_186-1 --gas-adjustment 1.5 --gas auto --gas-prices 30apell -y"
    },
    "vote_abstain": {
      "description": "Vote 'ABSTAIN' on a proposal",
      "command": "pellcored tx gov vote 1 abstain --from wallet --chain-id ignite_186-1 --gas-adjustment 1.5 --gas auto --gas-prices 30apell -y"
    },
    "vote_nowithveto": {
      "description": "Vote 'NOWITHVETO' on a proposal",
      "command": "pellcored tx gov vote 1 NoWithVeto --from wallet --chain-id ignite_186-1 --gas-adjustment 1.5 --gas auto --gas-prices 30apell -y"
    }
  },
  "utility": {
    "update_ports": {
      "description": "Update ports in configuration files",
      "command": "CUSTOM_PORT=110; sed -i -e \"s%^proxy_app = \\\"tcp://127.0.0.1:26658\\\"%proxy_app = \\\"tcp://127.0.0.1:${CUSTOM_PORT}58\\\"%\" $HOME/.pellcored/config/config.toml"
    },
    "update_indexer_disable": {
      "description": "Disable the indexer",
      "command": "sed -i -e 's|^indexer *=.*|indexer = \"null\"|' $HOME/.pellcored/config/config.toml"
    },
    "update_indexer_enable": {
      "description": "Enable the indexer",
      "command": "sed -i -e 's|^indexer *=.*|indexer = \"kv\"|' $HOME/.pellcored/config/config.toml"
    },
    "update_pruning": {
      "description": "Update pruning settings",
      "command": "sed -i -e 's|^pruning *=.*|pruning = \"custom\"|' $HOME/.pellcored/config/app.toml"
    }
  },
  "maintenance": {
    "get_validator_info": {
      "description": "Get validator information",
      "command": "pellcored status 2>&1 | jq .ValidatorInfo"
    },
    "get_sync_info": {
      "description": "Get sync information",
      "command": "pellcored status 2>&1 | jq"
    },
    "get_node_peer": {
      "description": "Get node peer information",
      "command": "echo $(pellcored tendermint show-node-id)'@'$(curl -s ifconfig.me)':'$(cat $HOME/.pellcored/config/config.toml | sed -n '/Address to listen for incoming connection/{n;p;}' | sed 's/.*://; s/\".*//')"
    },
    "check_validator_key": {
      "description": "Check if validator key is correct",
      "command": "[[ $(pellcored q staking validator $(pellcored keys show wallet --bech val -a) -oj | jq -r .consensus_pubkey.key) = $(pellcored status | jq -r .ValidatorInfo.PubKey.value) ]] && echo -e \"\\n\\e[1m\\e[32mTrue\\e[0m\\n\" || echo -e \"\\n\\e[1m\\e[31mFalse\\e[0m\\n\""
    },
    "get_live_peers": {
      "description": "Get live peers",
      "command": "curl -sS http://0.0.0.0:26657/net_info | jq -r '.result.peers[] | \"\\(.node_info.id)@\\(.remote_ip):\\(.node_info.listen_addr)\"' | awk -F ':' '{print $1\":\"$(NF)}'"
    },
    "set_minimum_gas_price": {
      "description": "Set minimum gas price",
      "command": "sed -i -e \"s/^minimum-gas-prices *=.*/minimum-gas-prices = \\\"30apell\\\"/\" $HOME/.pellcored/config/app.toml"
    },
    "enable_prometheus": {
      "description": "Enable Prometheus",
      "command": "sed -i -e \"s/prometheus = false/prometheus = true/\" $HOME/.pellcored/config/config.toml"
    },
    "reset_chain_data": {
      "description": "Reset chain data",
      "command": "pellcored tendermint unsafe-reset-all --keep-addr-book --home $HOME/.pellcored --keep-addr-book"
    },
    "remove_node": {
      "description": "Remove node",
      "command": "cd $HOME; sudo systemctl stop pellcored; sudo systemctl disable pellcored; sudo rm /etc/systemd/system/pellcored.service; sudo systemctl daemon-reload; rm -f $(which pellcored); rm -rf $HOME/.pellcored"
    }
  },
  "service_management": {
    "reload_service": {
      "description": "Reload service configuration",
      "command": "sudo systemctl daemon-reload"
    },
    "enable_service": {
      "description": "Enable service",
      "command": "sudo systemctl enable pellcored"
    },
    "disable_service": {
      "description": "Disable service",
      "command": "sudo systemctl disable pellcored"
    },
    "start_service": {
      "description": "Start service",
      "command": "sudo systemctl start pellcored"
    },
    "stop_service": {
      "description": "Stop service",
      "command": "sudo systemctl stop pellcored"
    },
    "restart_service": {
      "description": "Restart service",
      "command": "sudo systemctl restart pellcored"
    },
    "check_service_status": {
      "description": "Check service status",
      "command": "sudo systemctl status pellcored"
    },
    "check_service_logs": {
      "description": "Check service logs",
      "command": "sudo journalctl -u pellcored -f --no-hostname -o cat"
    }
  }
};

const NetworkDetails: React.FC<NetworkDetailsProps> = ({ name, description }) => {
  const [selectedService, setSelectedService] = useState<string>('');

  const services = ['installation', 'snapshots', 'upgrade', 'peers', 'usefulcommands', 'tools'];

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
        {selectedService === 'usefulcommands' && (
          <div className={styles.commands}>
            {Object.entries(commandsData).map(([category, items]) => (
              <div key={category} className={styles.category}>
                <h3>{category.toUpperCase().replace(/_/g, ' ')}</h3>
                <div className={styles.commandList}>
                  {Object.entries(items).map(([key, item]) => (
                    <div key={key} className={styles.command}>
                      <p className={styles.description}>{item.description}</p>
                      <pre className={styles.code}>
                        <code>{item.command}</code>
                        <button 
                          className={styles.copyButton}
                          onClick={(e) => {
                            const btn = e.target as HTMLButtonElement;
                            navigator.clipboard.writeText(item.command);
                            
                            // Create tooltip
                            const tooltip = document.createElement('div');
                            tooltip.textContent = 'Copied!';
                            tooltip.style.position = 'absolute';
                            tooltip.style.right = '100%';
                            tooltip.style.marginRight = '10px';
                            tooltip.style.background = '#4CAF50';
                            tooltip.style.color = 'white';
                            tooltip.style.padding = '5px 10px';
                            tooltip.style.borderRadius = '4px';
                            tooltip.style.fontSize = '12px';
                            tooltip.style.whiteSpace = 'nowrap';
                            
                            btn.parentElement?.appendChild(tooltip);
                            btn.style.background = '#4CAF50';
                            
                            setTimeout(() => {
                              tooltip.remove();
                              btn.style.background = 'var(--primary-color)';
                            }, 1500);
                          }}
                        >
                          Copy
                        </button>
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
