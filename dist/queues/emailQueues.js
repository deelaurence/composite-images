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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNewEmail = void 0;
const bull_1 = __importDefault(require("bull"));
const emailProcess_1 = __importDefault(require("../process/emailProcess"));
const emailQueue = new bull_1.default('emails', {
    redis: '127.0.0.1:6379'
});
emailQueue.process(emailProcess_1.default);
const sendNewEmail = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield emailQueue.add({
        message: data
    });
});
exports.sendNewEmail = sendNewEmail;
emailQueue.on('completed', (job, result) => {
    console.log(`job completed ${result}`);
});
