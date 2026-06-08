import Dockerode from 'dockerode';
import { readFile, unlink } from 'fs/promises';
import os from 'os';
import path from 'path';

const CONTAINER_ID_FILE = path.join(os.tmpdir(), 'node-api-js-test-container-id');

export default async function globalTeardown(): Promise<void> {
    let containerId: string;
    try {
        containerId = (await readFile(CONTAINER_ID_FILE, 'utf8')).trim();
    } catch {
        return;
    }

    const docker = new Dockerode();
    const container = docker.getContainer(containerId);

    try {
        await container.stop();
        await container.remove();
        console.log(`Stopped and removed container ${containerId}`);
    } catch (e) {
        console.error(`Failed to stop/remove container ${containerId}: ${e}`);
    } finally {
        await unlink(CONTAINER_ID_FILE).catch(() => null);
    }
}
