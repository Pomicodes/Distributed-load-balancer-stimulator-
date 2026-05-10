# AetherFlow: Distributed Load Balancer Simulator

AetherFlow is a premium, educational distributed systems simulator designed to visualize how multi-node load balancers coordinate traffic, manage shared state via Redis, and handle real-time server failures.

![Dashboard Preview](https://via.placeholder.com/1200x600/030712/3b82f6?text=AetherFlow+Distributed+Simulator)

## 🚀 Quick Start

### 1. Prerequisites
- **Python 3.10+**
- **Node.js 18+**
- **Upstash Redis Account** (or a local Redis instance)

### 2. Backend Configuration
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and configure your `.env` file (copy from `.env.example` if available):
   ```env
   UPSTASH_REDIS_REST_URL=your_upstash_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_token
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### 3. Frontend Configuration
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## 🛠️ Running the Simulation

### Step 1: Start the Distributed Backend
To simulate a real distributed cluster, you should run multiple load balancer nodes. We've provided a script to automate this:

**Windows (PowerShell):**
```powershell
./scripts/start-distributed.ps1
```
This will launch 3 nodes on ports **8001, 8002, and 8003**.

### Step 2: Start the Dashboard
In a new terminal:
```bash
cd frontend
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Simulation Features

### 📡 Real-time Routing
Toggle between different algorithms to see how they handle traffic:
- **Round Robin**: Sequential distribution.
- **Least Connections**: Dynamic routing to the idlest server.
- **Consistent Hashing**: Session persistence via client-IP hashing.

### 🌪️ Traffic Injection
Use the **Flow Dynamics** panel to simulate different traffic patterns:
- **Constant**: Steady stream.
- **Burst**: Sudden spikes to test scalability.
- **Poisson**: Randomized realistic inter-arrival times.

### 🛡️ Fault Tolerance
- **Simulated Failures**: A background task randomly kills servers.
- **Manual Control**: Click any server card to manually toggle it offline.
- **Observe**: Watch how the distributed nodes coordinate via Redis to immediately reroute traffic away from the "dead" node.

## 🏗️ Architecture

- **Load Balancer Nodes**: Built with FastAPI. They are stateless and coordinate via Redis.
- **Coordination Layer**: Upstash Redis (Serverless Redis) provides global state synchronization.
- **Observability Dashboard**: Built with Next.js 14, Tailwind CSS, and Framer Motion for ultra-premium visualizations.
- **Real-time Telemetry**: Powered by WebSockets for sub-second updates.

## 📖 Technical Documentation
For a deep dive into the mathematics and logic behind the algorithms, visit the internal docs at `/docs` while the dashboard is running.

---
Built for Distributed Systems Education.