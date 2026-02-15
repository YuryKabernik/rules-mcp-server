---
id: ms-sec-001
title: Service-to-Service Authentication
description: Implement secure authentication between microservices
category: security
system: microservice
tags:
  - security
  - authentication
  - jwt
  - mtls
---

# Service-to-Service Authentication

Secure communication between microservices using mutual TLS or JWT.

## Best Practices

- Use mTLS for service mesh environments
- Implement JWT with short expiry for service tokens
- Rotate secrets regularly
- Use service accounts, not user accounts
- Implement principle of least privilege

## JWT-based Authentication

```typescript
import jwt from 'jsonwebtoken';

// Generate token for service communication
function generateServiceToken(serviceName: string) {
  const token = jwt.sign(
    { 
      service: serviceName,
      scope: 'user:read orders:write',
      iss: 'auth-service'
    },
    process.env.SERVICE_SECRET,
    { 
      expiresIn: '5m',
      algorithm: 'HS256'
    }
  );
  return token;
}

// Verify token in receiving service
function verifyServiceToken(token: string) {
  try {
    const verified = jwt.verify(
      token, 
      process.env.SERVICE_SECRET,
      { algorithms: ['HS256'] }
    );
    return verified;
  } catch (error) {
    throw new Error('Invalid service token');
  }
}

// Middleware for Express
function serviceAuthMiddleware(req, res, next) {
  const token = req.headers['x-service-token'];
  
  if (!token) {
    return res.status(401).json({ error: 'No service token' });
  }
  
  try {
    req.serviceAuth = verifyServiceToken(token);
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
}
```

## Mutual TLS (mTLS)

```typescript
import https from 'https';
import fs from 'fs';

// Server configuration
const options = {
  key: fs.readFileSync('server-key.pem'),
  cert: fs.readFileSync('server-cert.pem'),
  ca: fs.readFileSync('ca-cert.pem'),
  requestCert: true,
  rejectUnauthorized: true
};

const server = https.createServer(options, (req, res) => {
  // Client certificate is verified by TLS layer
  const clientCert = req.socket.getPeerCertificate();
  
  if (req.client.authorized) {
    res.writeHead(200);
    res.end('Authenticated');
  } else {
    res.writeHead(401);
    res.end('Unauthorized');
  }
});

server.listen(443);
```

## API Key Management

```typescript
// Rotate API keys regularly
class ApiKeyManager {
  private keys: Map<string, { key: string, expiresAt: Date }>;
  
  async rotateKey(serviceName: string) {
    const newKey = generateSecureKey();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
    
    this.keys.set(serviceName, { key: newKey, expiresAt });
    
    // Store in secret manager
    await secretManager.store(`service/${serviceName}/api-key`, newKey);
    
    return newKey;
  }
  
  async validateKey(serviceName: string, providedKey: string): Promise<boolean> {
    const stored = this.keys.get(serviceName);
    
    if (!stored || stored.expiresAt < new Date()) {
      return false;
    }
    
    return stored.key === providedKey;
  }
}
```

## Security Checklist

- [ ] Use HTTPS/TLS for all service communication
- [ ] Implement certificate rotation
- [ ] Use short-lived tokens (5-15 minutes)
- [ ] Store secrets in a secret manager (not in code)
- [ ] Implement token refresh mechanisms
- [ ] Log authentication failures
- [ ] Monitor for unusual patterns
- [ ] Implement rate limiting per service
