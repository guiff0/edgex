# Welcome to your new ignited app!

> The latest and greatest boilerplate for Infinite Red opinions

This is the boilerplate that [Infinite Red](https://infinite.red) uses as a way to test bleeding-edge changes to our React Native stack.

- [Quick start documentation](https://github.com/infinitered/ignite/blob/master/docs/boilerplate/Boilerplate.md)
- [Full documentation](https://github.com/infinitered/ignite/blob/master/docs/README.md)

## Getting Started

```bash
npm install --legacy-peer-deps
npm run start
```

To make things work on your local simulator, or on your phone, you need first to [run `eas build`](https://github.com/infinitered/ignite/blob/master/docs/expo/EAS.md). We have many shortcuts on `package.json` to make it easier:

```bash
npm run build:ios:sim # build for ios simulator
npm run build:ios:device # build for ios device
npm run build:ios:prod # build for ios device
```

### `./assets`

This directory is designed to organize and store various assets, making it easy for you to manage and use them in your application. The assets are further categorized into subdirectories, including `icons` and `images`:

```tree
assets
├── icons
└── images
```

**icons**
This is where your icon assets will live. These icons can be used for buttons, navigation elements, or any other UI components. The recommended format for icons is PNG, but other formats can be used as well.

Ignite comes with a built-in `Icon` component. You can find detailed usage instructions in the [docs](https://github.com/infinitered/ignite/blob/master/docs/boilerplate/app/components/Icon.md).

**images**
This is where your images will live, such as background images, logos, or any other graphics. You can use various formats such as PNG, JPEG, or GIF for your images.

Another valuable built-in component within Ignite is the `AutoImage` component. You can find detailed usage instructions in the [docs](https://github.com/infinitered/ignite/blob/master/docs/Components-AutoImage.md).

How to use your `icon` or `image` assets:

```typescript
import { Image } from 'react-native';

const MyComponent = () => {
  return (
    <Image source={require('assets/images/my_image.png')} />
  );
};
```

## Running Maestro end-to-end tests

Follow our [Maestro Setup](https://ignitecookbook.com/docs/recipes/MaestroSetup) recipe.

## Next Steps

### Ignite Cookbook

[Ignite Cookbook](https://ignitecookbook.com/) is an easy way for developers to browse and share code snippets (or “recipes”) that actually work.

### Upgrade Ignite boilerplate

Read our [Upgrade Guide](https://ignitecookbook.com/docs/recipes/UpdatingIgnite) to learn how to upgrade your Ignite project.

## Community

⭐️ Help us out by [starring on GitHub](https://github.com/infinitered/ignite), filing bug reports in [issues](https://github.com/infinitered/ignite/issues) or [ask questions](https://github.com/infinitered/ignite/discussions).

💬 Join us on [Slack](https://join.slack.com/t/infiniteredcommunity/shared_invite/zt-1f137np4h-zPTq_CbaRFUOR_glUFs2UA) to discuss.

📰 Make our Editor-in-chief happy by [reading the React Native Newsletter](https://reactnativenewsletter.com/).


Copilot Search Branding

Like

Dislike
Running PowerSync Locally
You can run PowerSync locally in two main ways:

Using the PowerSync CLI with Docker (recommended for quick setup)

Writing your own Docker Compose configuration

1. Using the PowerSync CLI (Easiest for Development)
The PowerSync CLI scaffolds and manages a Docker Compose stack for you:

Install the CLI

npm install -g powersync
Or run via npx:

npx powersync@0.9.0
Initialize a self-hosted instance
powersync init self-hosted
This creates a powersync/ directory with service.yaml and sync-config.yaml docs.powersync.com.

Configure Docker
powersync docker configure
This generates a docker-compose.yaml for your environment.

Start the local stack
powersync docker start
This launches PowerSync Service, your source database, and bucket storage (e.g., MongoDB) docs.powersync.com.

Optional: Generate client schema
powersync generate schema
This outputs SDK-compatible schema from your sync-config.yaml deepwiki.com.

2. Manual Docker Compose Setup
If you prefer full control, create a powersync/ directory with:

service.yaml (PowerSync config)

sync-config.yaml (sync streams/rules)

docker-compose.yaml (stack definition)

Example minimal docker-compose.yaml (Postgres + MongoDB) docs.powersync.com:

services:
  powersync:
    image: journeyapps/powersync-service:latest
    command: ["start", "-r", "unified"]
    volumes:
      - ./service.yaml:/config/service.yaml
      - ./sync-config.yaml:/config/sync-config.yaml
    environment:
      POWERSYNC_CONFIG_PATH: /config/service.yaml
    ports:
      - "8080:8080"
    depends_on:
      postgres:
        condition: service_healthy
      mongo:
        condition: service_completed_successfully

  postgres:
    image: postgres:latest
    environment:
      POSTGRES_USER: postgres
      POSTGRES_DB: postgres
      POSTGRES_PASSWORD: postgres
      PGPORT: 5432
    volumes:
      - pg_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    command: ["postgres", "-c", "wal_level=logical"]

  mongo:
    image: mongo:7.0
    command: --replSet rs0 --bind_ip_all --quiet
    ports:
      - "27017:27017"
    volumes:
      - mongo_storage:/data/db

  mongo-rs-init:
    image: mongo:7.0
    entrypoint: bash -c 'mongosh --host mongo:27017 --eval "try{rs.status().ok && quit(0)} catch {} rs.initiate({_id: \"rs0\", version: 1, members: [{ _id: 0, host : \"mongo:27017\" }]})"'
    depends_on:
      - mongo

volumes:
  pg_data:
  mongo_storage:
Run:


Tips
Use powersync validate before deploying to catch config errors deepwiki.com.

For CI/CD, set PS_ADMIN_TOKEN instead of interactive login docs.powersync.com.

You can link to an existing self-hosted instance with powersync link self-hosted to manage it locally Github.