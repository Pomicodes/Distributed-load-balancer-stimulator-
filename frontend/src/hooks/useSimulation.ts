import { useState, useEffect, useCallback } from 'react';

export const useSimulation = () => {
    const [servers, setServers] = useState<any[]>([]);
    const [metrics, setMetrics] = useState<any[]>([]);
    const [isRunning, setIsRunning] = useState(false);
    const [nodeId, setNodeId] = useState('');
    const [algorithm, setAlgorithm] = useState('round_robin');

    const connectWS = useCallback(() => {
        const socket = new WebSocket('ws://localhost:8001/ws/metrics');

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'heartbeat') {
                setServers(data.servers);
                setNodeId(data.node_id);
            } else if (data.type === 'metrics') {
                setMetrics((prev) => [...prev.slice(-20), data.data]);
            }
        };

        socket.onclose = () => {
            setTimeout(connectWS, 3000);
        };

        return socket;
    }, []);

    useEffect(() => {
        const socket = connectWS();
        return () => socket.close();
    }, [connectWS]);

    const startSimulation = async (pattern: string, rate: number) => {
        await fetch('http://localhost:8001/simulation/start?pattern=' + pattern + '&rate=' + rate, { method: 'POST' });
        setIsRunning(true);
    };

    const stopSimulation = async () => {
        await fetch('http://localhost:8001/simulation/stop', { method: 'POST' });
        setIsRunning(false);
    };

    const changeAlgorithm = async (algo: string) => {
        await fetch('http://localhost:8001/config/algorithm?algo=' + algo, { method: 'POST' });
        setAlgorithm(algo);
    };

    const toggleServer = async (serverId: string) => {
        await fetch(`http://localhost:8001/servers/${serverId}/toggle`, { method: 'POST' });
    };

    return {
        servers,
        metrics,
        isRunning,
        nodeId,
        algorithm,
        startSimulation,
        stopSimulation,
        changeAlgorithm,
        toggleServer
    };
};
