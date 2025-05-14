"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
// 评论API（Serverless）
var mongoose = require('mongoose');
var url = require('url');
var MONGODB_URI = process.env.MONGODB_URI;
if (!global._mongoose) {
    global._mongoose = mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}
var CommentSchema = new mongoose.Schema({
    nickname: String,
    content: String,
    createdAt: { type: Date, default: Date.now }
});
var CommentModel = mongoose.models.Comment || mongoose.model('Comment', CommentSchema);
module.exports = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedUrl, idMatch, comments, _a, nickname, content, comment, id, comment;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, global._mongoose];
            case 1:
                _b.sent();
                parsedUrl = url.parse(req.url, true);
                idMatch = /^\/api\/comments\/(\w+)$/.exec(parsedUrl.pathname || '');
                if (!(req.method === 'GET' && parsedUrl.pathname === '/api/comments')) return [3 /*break*/, 3];
                return [4 /*yield*/, CommentModel.find().sort({ createdAt: -1 })];
            case 2:
                comments = _b.sent();
                res.status(200).json(comments);
                return [3 /*break*/, 8];
            case 3:
                if (!(req.method === 'POST' && parsedUrl.pathname === '/api/comments')) return [3 /*break*/, 5];
                _a = req.body, nickname = _a.nickname, content = _a.content;
                if (!content) {
                    res.status(400).json({ error: '内容不能为空' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, CommentModel.create({ nickname: nickname, content: content })];
            case 4:
                comment = _b.sent();
                res.status(201).json(comment);
                return [3 /*break*/, 8];
            case 5:
                if (!(req.method === 'GET' && idMatch)) return [3 /*break*/, 7];
                id = idMatch[1];
                return [4 /*yield*/, CommentModel.findById(id)];
            case 6:
                comment = _b.sent();
                if (comment) {
                    res.status(200).json(comment);
                }
                else {
                    res.status(404).json({ error: '未找到' });
                }
                return [3 /*break*/, 8];
            case 7:
                res.status(404).json({ error: 'Not Found' });
                _b.label = 8;
            case 8: return [2 /*return*/];
        }
    });
}); };
// 本地调试入口
if (require.main === module) {
    var http = require('http');
    var PORT_1 = 3001;
    http.createServer(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var parsedUrl, body_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    res.status = function (code) {
                        res.statusCode = code;
                        return res;
                    };
                    res.json = function (data) {
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify(data));
                    };
                    parsedUrl = url.parse(req.url, true);
                    if (!(req.method === 'POST' && parsedUrl.pathname === '/api/comments')) return [3 /*break*/, 1];
                    body_1 = '';
                    req.on('data', function (chunk) { body_1 += chunk; });
                    req.on('end', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    try {
                                        req.body = JSON.parse(body_1);
                                    }
                                    catch (e) {
                                        req.body = {};
                                    }
                                    return [4 /*yield*/, module.exports(req, res)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, module.exports(req, res)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); }).listen(PORT_1, function () {
        console.log('本地API调试服务已启动: http://localhost:' + PORT_1 + '/api/comments');
    });
}
