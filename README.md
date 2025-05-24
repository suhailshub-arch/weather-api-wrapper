# weather-api-wrapper

An Express + TypeScript service that wraps the Visual Crossing Weather API, with optional Redis caching.

## Setup

```bash
git clone git@github.com:suhailshub-arch/weather-api-wrapper.git
cd weather-api-wrapper
npm install
cp .env.example .env        # fill in your API key & Redis URL
npm run dev
