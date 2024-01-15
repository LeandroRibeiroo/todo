#!/bin/sh

# Wait for the database to be ready
echo "Waiting for the database to be ready..."
while ! nc -z db 5432; do
  sleep 1
done

echo "Database ready!"

# Run migrations
echo "Running migrations..."
npm run typeorm -- migration:run -d ./src/data-source.ts

# Start the application
echo "Starting the application..."
exec npm run start
