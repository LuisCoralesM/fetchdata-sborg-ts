"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getMockedRepoData = exports.getReposWithFiveStars = exports.sortReposByUpdateDate = exports.getStarsSum = void 0;
const fs = __importStar(require("fs"));
const axios_1 = __importDefault(require("axios"));
const fetchData = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(url);
    return response.data;
});
function getStarsSum(data) {
    return data.reduce((sum, repo) => sum + repo.stars, 0);
}
exports.getStarsSum = getStarsSum;
function sortReposByUpdateDate(data) {
    return data.sort((a, b) => {
        return Number(new Date(b.updated_at)) - Number(new Date(a.updated_at));
    }).slice(0, 5);
}
exports.sortReposByUpdateDate = sortReposByUpdateDate;
function getReposWithFiveStars(data) {
    return data.filter(data => data.stars > 5);
}
exports.getReposWithFiveStars = getReposWithFiveStars;
function getMockedRepoData(dire) {
    let path = (page) => dire + page + ".json";
    function recursiveData(page = 1, dataFetch) {
        const getData = fs.readFileSync(path(page));
        const data = JSON.parse(getData.toString());
        if (data.length === 0)
            return dataFetch;
        return recursiveData(page + 1, dataFetch.concat(data));
    }
    return recursiveData(1, []);
}
exports.getMockedRepoData = getMockedRepoData;
