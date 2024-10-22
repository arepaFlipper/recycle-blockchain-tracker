#!/bin/sh

yarn install

# Start API service
echo "Starting API service..."
(cd apps/api && yarn dev) &

# Start Prisma Studio
echo "Starting Prisma Studio..."
(cd apps/api && npx prisma studio) &

# Start Web frontend
echo "Starting Web frontend..."
(cd apps/web && yarn dev) &

# Start UI service
echo "Starting UI service..."
(cd libs/ui && yarn dev) &

# Start Mobile app Metro bundler
# echo "Start Mobile app Metro bundler ..."
# (cd standalone/mobile-apps && npm i && npm install --global @expo/ngrok && npm run start) &

# Start Codegen service
echo "Start generic outputs..."
(cd libs/network && yarn codegen) &

wait
