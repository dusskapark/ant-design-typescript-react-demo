// src/constants/terminalScripts.ts
import { NavigateFunction } from "react-router-dom"; // Import NavigateFunction type

// Define the type for the script functions, now accepting styles and navigate
export type ScriptFunction = (instance: any, styles: Record<string, string>, navigate: NavigateFunction) => any;

// Sorted and deduplicated platform list
const platformList = [
  "AIHome", "AIP / DataForge", "Airflow", "API Gateway", "Artifactory", "AWS", "CDP", 
  "Coban", "Concedo", "Conveyor", "Dash", "Data Curator", "Databricks", "Datadog", 
  "Device Farm", "Doorman", "Genchi", "Gitlab", "GrabGPT", "GrabX", "Grafana", "Helix", 
  "Hubble", "Hugo", "Iris", "Lighthouse", "Loki", "Marionette", "MEKS", "MIDAS", 
  "Middle Earth", "Mobile Release Train & Crash Plugin", "Mystique", "OdinX", 
  "OpenDashboards", "Orbit", "PaySDK", "Porta", "Presto Observability", 
  "QuickSilver (-> Hive)", "S3", "Slide", "SMI", "Sourcegraph", "SparkOne", 
  "Splunk Oncall", "Superset", "Terraform", "UCM", "Vault (GT)", "Web-kit", 
  "Workspace Manager", "Yamato", "Yoshi"
];

// Function to format the list into two columns
const formatListTwoColumns = (list: string[]): string => {
  const midpoint = Math.ceil(list.length / 2);
  const firstHalf = list.slice(0, midpoint);
  const secondHalf = list.slice(midpoint);
  const columnWidth = Math.max(...firstHalf.map(item => item.length)) + 4; // Calculate width for first column + padding

  let formattedString = "";
  for (let i = 0; i < midpoint; i++) {
    const leftItem = `  - ${firstHalf[i]}`.padEnd(columnWidth);
    const rightItem = secondHalf[i] ? `  - ${secondHalf[i]}` : "";
    formattedString += `\n${leftItem}${rightItem}`;
  }
  return formattedString;
};

// Define the array of script functions
export const scriptDefinitions: ScriptFunction[] = [
  // Script 1: Welcome Script with Instant Two-Column List
  (instance, styles, navigate) => {
    // Format the list instantly
    const formattedPlatforms = formatListTwoColumns(platformList);

    instance
      .options({ speed: 0 })
      .type('Last login: Mon Apr 28 14:14:16 on ttys002')
      .options({ speed: 60 })
      .break({ delay: 500 })
      .type('+======================+')
      .break()
      .type('| Welcome to My Console |')
      .break()
      .type('+======================+')
      .break({ delay: 800 })
      .type(' ')
      .pause(500)
      .type(`<span class="${styles.prompt}"></span>platform list --all`)
      .pause(500)
      .break()
      .options({ speed: 0 })
      .type(formattedPlatforms)
      .options({ speed: 60 })
      .pause(1000);
    return instance;
  },
  // Script 2: System Check Script
  (instance, styles, navigate) => {
    instance
      .type('Boot sequence initiated...')
      .pause(750)
      .delete(null, { instant: true })
      .type('System check: <span style="color: #27c93f;">OK</span>')
      .break({ delay: 600 })
      .type('Loading user profile...')
      .pause(1000)
      .delete(null, { instant: true })
      .type('Profile loaded successfully.')
      .break({ delay: 500 })
      .type(' ')
      .pause(500)
      .type(`<span class="${styles.prompt}"></span>list_projects --all`)
      .pause(1500)
      .break()
      .type('  - Project Alpha [prod]')
      .break()
      .type('  - Project Beta [dev]')
      .pause(1000);
    return instance;
  },
  // Script 3: Connection Script
  (instance, styles, navigate) => {
    instance
      .type('Connecting to secure server...')
      .pause(1200)
      .delete(null, { instant: true })
      .type('Connection established. Encrypted. <span style="color: #27c93f;">✔</span>')
      .break({ delay: 400 })
      .type('Authenticating user credentials...')
      .pause(900)
      .delete(null, { instant: true })
      .type('Authentication successful. Welcome back!')
      .break({ delay: 700 })
      .type(' ')
      .pause(600)
      .type(`<span class="${styles.prompt}"></span>show_server_status --verbose`)
      .pause(1200);
    return instance;
  },
  // Script 4: Login Success Script (Much Faster)
  (instance, styles, navigate) => {
    const okSpan = '<span style="color: #27c93f;">OK</span>';
    instance
      .delete(null, { instant: true, delay: 10 }) // Even faster clear
      .type('Authenticating...').pause(100).exec(async () => { await instance.delete(null, { instant: true }).go() })
      .type(`Credentials verified. ${okSpan}`).pause(100).break()
      .type('Checking permissions...').pause(100).exec(async () => { await instance.delete(null, { instant: true }).go() }) // Shortened text
      .type(`Permissions granted. ${okSpan}`).pause(100).break()
      .type('Establishing session...').pause(150).exec(async () => { await instance.delete(null, { instant: true }).go() }) // Shortened text
      .type(`Session established. ${okSpan}`).pause(100).break()
      .type('Loading dashboard...').pause(150).break()
      .type('Redirecting...')
      .pause(100) 
      // Final action to trigger navigation
      .type('', { delay: 1 })
      .options({ afterComplete: () => navigate('/login-success') });
    return instance;
  },
  // Add more script functions here as needed
];

// Define an identifier for the login success script (optional but good practice)
export const LOGIN_SUCCESS_SCRIPT_INDEX = scriptDefinitions.length - 1; // Assuming it's the last one added 