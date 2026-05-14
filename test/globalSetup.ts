import Dockerode from 'dockerode';
import { writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import os from 'os';
import { writeState } from './setup/write';

const NODE_IMAGE = 'wavesplatform/waves-private-node';
const HOST_PORT = 6869;
const CONTAINER_PORT = 6869;

const CONTAINER_ID_FILE = path.join(os.tmpdir(), 'node-api-js-test-container-id');

export default async function globalSetup(): Promise<void> {
    let nodeUrl: string;

    if (process.env.NODE_URL) {
        nodeUrl = process.env.NODE_URL;
        console.log(`Using existing node at ${nodeUrl}`);
    } else {
        nodeUrl = await startContainer();
        await waitForNode(nodeUrl);
    }

    await writeState(nodeUrl, path.join(__dirname, '_state.ts'));
}

function isInsideDocker(): boolean {
    return existsSync('/.dockerenv');
}

async function startContainer(): Promise<string> {
    const docker = new Dockerode();

    await pullImage(docker, NODE_IMAGE);

    const container = await docker.createContainer({
        Image: NODE_IMAGE,
        HostConfig: {
            PortBindings: {
                [`${CONTAINER_PORT}/tcp`]: [{ HostPort: String(HOST_PORT) }]
            }
        }
    });

    await container.start();
    await writeFile(CONTAINER_ID_FILE, container.id);
    console.log(`Started container ${container.id}`);

    const host = isInsideDocker() ? 'host.docker.internal' : 'localhost';
    return `http://${host}:${HOST_PORT}`;
}

async function pullImage(docker: Dockerode, image: string): Promise<void> {
    const images = await docker.listImages({ filters: { reference: [image] } });
    if (images.length > 0) return;

    return new Promise((resolve, reject) => {
        docker.pull(image, (err: Error | null, stream: NodeJS.ReadableStream) => {
            if (err) return reject(err);
            docker.modem.followProgress(stream, (err: Error | null) => {
                if (err) reject(err);
                else resolve();
            });
        });
    });
}

async function waitForNode(nodeUrl: string, timeoutMs = 120000): Promise<void> {
    const deadline = Date.now() + timeoutMs;
    console.log(`Waiting for node at ${nodeUrl}...`);
    while (Date.now() < deadline) {
        try {
            const response = await fetch(`${nodeUrl}/node/status`);
            if (response.ok) {
                console.log('Node is ready');
                return;
            }
        } catch {
            // not ready yet
        }
        await new Promise(r => setTimeout(r, 1000));
    }
    throw new Error(`Node at ${nodeUrl} did not become ready within ${timeoutMs}ms`);
}
