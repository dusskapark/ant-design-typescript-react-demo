export const SAMPLE_TYPESCRIPT_CODE = `// TypeScript Configuration Example
// Complex Key-Value Pair Structure

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  metadata: Record<string, unknown>;
}

interface Config {
  database: {
    host: string;
    port: number;
    credentials: {
      username: string;
      password: string;
    };
  };
  api: {
    endpoints: Record<string, string>;
    timeout: number;
    retryConfig: {
      maxRetries: number;
      backoffMs: number;
    };
  };
  features: Record<string, boolean>;
}

const appConfig: Config = {
  database: {
    host: 'localhost',
    port: 5432,
    credentials: {
      username: 'admin',
      password: 'secret123'
    }
  },
  api: {
    endpoints: {
      users: '/api/v1/users',
      posts: '/api/v1/posts',
      comments: '/api/v1/comments',
      analytics: '/api/v1/analytics'
    },
    timeout: 5000,
    retryConfig: {
      maxRetries: 3,
      backoffMs: 1000
    }
  },
  features: {
    darkMode: true,
    notifications: true,
    analytics: false,
    betaFeatures: true
  }
};

const userRegistry: Map<number, User> = new Map([
  [1, {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'admin',
    metadata: {
      lastLogin: '2025-10-15T10:30:00Z',
      loginCount: 245,
      preferences: { theme: 'dark', language: 'en' }
    }
  }],
  [2, {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    role: 'user',
    metadata: {
      lastLogin: '2025-10-14T15:20:00Z',
      loginCount: 89,
      preferences: { theme: 'light', language: 'ko' }
    }
  }]
]);

function processConfig(config: Config): void {
  console.log('Database Configuration:', config.database);
  console.log('API Endpoints:', Object.keys(config.api.endpoints));
  console.log('Enabled Features:', 
    Object.entries(config.features)
      .filter(([_, enabled]) => enabled)
      .map(([feature]) => feature)
  );
}

processConfig(appConfig);
console.log('Total Users:', userRegistry.size);`;

