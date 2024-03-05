This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install package:

```bash
npm install
#don't use yarn
```

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## Build step

```bash
npm run build & nmp run start
```

## Build

#### build image

```bash
docker build --no-cache --progress=plain -t management-front-end .
```

#### run image

```bash
docker run -d -p 3001:3000 management-front-end
```
