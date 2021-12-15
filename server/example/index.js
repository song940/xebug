import { stringify } from 'https://lsong.org/scripts/query.js';
import { randomId } from 'https://lsong.org/scripts/math.js';
import storage from 'https://lsong.org/scripts/storage.js';
import { Xebug } from '../../protocol/dist/xebug.esm.js';

const devtools = new Xebug();

const ensureStorage = (key, fn) => {
    const { getSync, setSync } = storage({ store: sessionStorage });
    let value = getSync(key);
    if (!value) setSync(key, value = fn());
    return value;
};

const id = ensureStorage('app-id', () => randomId());
const protocol = location.protocol === 'https:' ? 'wss' : 'ws';
const host = `localhost:3000`;
const ws = new WebSocket(`${protocol}://${host}/?${stringify({
    id,
    title: document.title,
    href: location.href,
    connect: 'X4J1VuX1',
})}`);

ws.addEventListener('open', e => {
    console.log('open');
    const link = `${host}/?id=${randomId()}&connect=${id}`;
    window.open(`http://lsong.org/devtools-frontend/front_end/inspector.html?${protocol}=${encodeURIComponent(link)}`);
});

ws.addEventListener('close', e => {
    console.log('close');
});

ws.addEventListener('message', e => {
    devtools.sendMessage(e.data);
});

devtools.on('message', message => {
    console.log('devtools:message', message);
    ws.send(JSON.stringify(message));
});