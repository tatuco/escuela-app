"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NodeCache = require("node-cache");
const crypto = require("crypto");
const cache = new NodeCache({ stdTTL: 15 });
class CacheService {
    static validateRequest(req) {
        const reqHash = crypto.createHash('sha256').update(JSON.stringify(req)).digest('hex');
        if (cache.has(reqHash)) {
            return false;
        }
        else {
            cache.set(reqHash, reqHash);
            return true;
        }
    }
    static store(key, value, ttl = 3600) {
        if (cache.has(key))
            return cache.get(key);
        return (cache.set(key, value, ttl));
    }
    static get(key) {
        return cache.get(key);
    }
    static has(key) {
        return cache.has(key);
    }
}
exports.CacheService = CacheService;
//# sourceMappingURL=CacheService.js.map