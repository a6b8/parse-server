import ParseServer          from './ParseServer';
import S3Adapter            from '@parse/s3-files-adapter'
import FileSystemAdapter    from '@parse/fs-files-adapter'
import InMemoryCacheAdapter from './Adapters/Cache/InMemoryCacheAdapter'
import NullCacheAdapter     from './Adapters/Cache/NullCacheAdapter'
import RedisCacheAdapter    from './Adapters/Cache/RedisCacheAdapter'
import LRUCacheAdapter      from './Adapters/Cache/LRUCache.js'
import * as TestUtils       from './TestUtils';
import { useExternal }      from './deprecated';
import { getLogger }        from './logger';
import { PushWorker }       from './Push/PushWorker';
import { ParseServerOptions }    from './Options';


console.log("--INDEX.JS--v2");
var OneSignalPushAdapter = require('/parse-server/node_modules/parse-server-onesignal-push-adapter/lib/OneSignalPushAdapter.js');
var oneSignalPushAdapter = new OneSignalPushAdapter({
oneSignalAppId:"de902289-bf36-42a1-9e59-cb20d877d6ab",
oneSignalApiKey:"ZjFhMWY0NmItZTY5OS00MTQ3LTllMTktM2NmMGZkYzNlNWIz"
});

console.log(process.env.PARSE_SERVER_PUSH);
console.log(process.env.PARSE_SERVER_PUSH.options);
console.log(process.env.PARSE_SERVER_PUSH.options.oneSignalAppId);
console.log(process.env.PARSE_SERVER_PUSH.options.oneSignalApiKey);

// Factory function
const _ParseServer = function(options: ParseServerOptions) {
  const server = new ParseServer(options);
  return server.app;
}
// Mount the create liveQueryServer
_ParseServer.createLiveQueryServer = ParseServer.createLiveQueryServer;
_ParseServer.start = ParseServer.start;

const GCSAdapter = useExternal('GCSAdapter', '@parse/gcs-files-adapter');

Object.defineProperty(module.exports, 'logger', {
  get: getLogger
});

export default ParseServer;
export {
  S3Adapter,
  GCSAdapter,
  FileSystemAdapter,
  InMemoryCacheAdapter,
  NullCacheAdapter,
  RedisCacheAdapter,
  LRUCacheAdapter,
  TestUtils,
  PushWorker,
  _ParseServer as ParseServer
};
