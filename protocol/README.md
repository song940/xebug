# xebug

Chrome devtools protocol JavaScript implementation.

## Install

You can get it on npm.

```bash
npm install xebug --save
```

## Usage

```javascript
const xebug = require('xebug');

xebug.setOnMessage(message => {
  console.log(message);
});

xebug.sendRawMessage(JSON.stringify({
  id: 1,  
  method: 'DOMStorage.clear',
  params: {
    storageId: {
      isLocalStorage: true,
      securityOrigin: 'http://example.com'
    }
  }
}));

!(async () => {
  console.log(await xebug.sendMessage('Storage.clearDataForOrigin', {
    storageTypes: 'local_storage'
  }));
})();

const domStorage = xebug.domain('DOMStorage');
domStorage.enable();
domStorage.on('domStorageItemUpdated', params => console.log(params));
```
