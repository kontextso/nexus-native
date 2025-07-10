#!/bin/bash

ROOT_DIR=$(dirname "$(dirname "$(realpath "$0")")")

PROJECT_ADS_DIR="$ROOT_DIR/ads"
PROJECT_NEXUS_NATIVE_DIR="$ROOT_DIR/nexus-native"

SDK_REACT_DIR="$PROJECT_ADS_DIR/packages/sdk"
SDK_REACT_NATIVE_DIR="$PROJECT_ADS_DIR/packages/sdk-react-native"

echo "Building SDK React"

# build sdk react dir 
cd "$SDK_REACT_DIR"
npm run build:js

echo ""
echo "Building SDK React Native"

# build sdk react native dir
cd "$SDK_REACT_NATIVE_DIR"
npm run build:js

echo ""
echo "Copying SDK React to Nexus Native"

# cp "$SDK_REACT_DIR"/dist/* "$PROJECT_NEXUS_NATIVE_DIR/node_modules/@kontextso/sdk/dist"
cp "$SDK_REACT_NATIVE_DIR"/dist/* "$PROJECT_NEXUS_NATIVE_DIR/node_modules/@kontextso/sdk-react-native/dist"

echo "Done."