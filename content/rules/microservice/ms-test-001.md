---
id: ms-test-001
title: Contract Testing
description: Implement contract testing between services
category: testing
system: microservice
codeType: test
tags:
  - testing
  - contract-testing
  - pact
---

# Contract Testing for Microservices

Use contract testing to ensure service compatibility and prevent breaking changes.

## Why Contract Testing?

- Catch integration issues early
- Test without running all services
- Validate API contracts
- Enable independent deployment
- Reduce end-to-end test complexity

## Tools

- **Pact** - Consumer-driven contract testing
- **Spring Cloud Contract** - For JVM services
- **Postman** - API contract testing

## Example (Pact)

### Consumer Side

```typescript
import { Pact } from '@pact-foundation/pact';
import { UserService } from './UserService';

describe('User Service Contract', () => {
  const provider = new Pact({
    consumer: 'OrderService',
    provider: 'UserService',
    port: 8080
  });

  beforeAll(() => provider.setup());
  afterEach(() => provider.verify());
  afterAll(() => provider.finalize());

  describe('when getting user by id', () => {
    beforeEach(() => {
      return provider.addInteraction({
        state: 'user exists with id 1',
        uponReceiving: 'a request for user 1',
        withRequest: {
          method: 'GET',
          path: '/users/1',
          headers: {
            Accept: 'application/json'
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          },
          body: {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com'
          }
        }
      });
    });

    it('should return user data', async () => {
      const userService = new UserService('http://localhost:8080');
      const user = await userService.getUser(1);
      
      expect(user.id).toBe(1);
      expect(user.name).toBe('John Doe');
      expect(user.email).toBe('john@example.com');
    });
  });
});
```

### Provider Side

```typescript
import { Verifier } from '@pact-foundation/pact';

describe('User Service Provider', () => {
  it('should validate the contract', async () => {
    const options = {
      provider: 'UserService',
      providerBaseUrl: 'http://localhost:3000',
      pactUrls: [
        'path/to/pacts/OrderService-UserService.json'
      ],
      stateHandlers: {
        'user exists with id 1': async () => {
          // Setup test data
          await db.users.create({
            id: 1,
            name: 'John Doe',
            email: 'john@example.com'
          });
        }
      }
    };

    await new Verifier(options).verifyProvider();
  });
});
```

## GraphQL Contract Testing

```typescript
import { Pact } from '@pact-foundation/pact';

describe('GraphQL Contract', () => {
  it('should match query response', async () => {
    await provider.addInteraction({
      state: 'products exist',
      uponReceiving: 'a query for products',
      withRequest: {
        method: 'POST',
        path: '/graphql',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          query: `
            query GetProducts {
              products {
                id
                name
                price
              }
            }
          `
        }
      },
      willRespondWith: {
        status: 200,
        body: {
          data: {
            products: [
              { id: 1, name: 'Product 1', price: 10.99 }
            ]
          }
        }
      }
    });
  });
});
```

## Best Practices

- Run contract tests in CI/CD pipeline
- Publish contracts to a Pact Broker
- Version your contracts
- Test both happy paths and error cases
- Include authentication in contracts
- Document contract states
- Use realistic test data
- Test backward compatibility when upgrading
