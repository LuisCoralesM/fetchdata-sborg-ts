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
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const fs = __importStar(require("fs"));
const url = "https://api.github.com/orgs/stackbuilders/repos";
const mockPath = "./data/mock/3_entries/data";
(() => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, app_1.getRepoData)(url);
    const wholeDataText = JSON.stringify(data);
    fs.writeFileSync('./data/whole_data.json', wholeDataText);
    const updatedRecentlyText = JSON.stringify((0, app_1.sortReposByUpdateDate)(data));
    fs.writeFileSync('./data/sorted_by_update_data.json', updatedRecentlyText);
    const fiveStarsText = JSON.stringify((0, app_1.getReposWithFiveStars)(data));
    fs.writeFileSync('./data/five_stars_data.json', fiveStarsText);
    fs.writeFileSync('./data/stars_sum.txt', (0, app_1.getStarsSum)(data).toString());
    const topFiveText = JSON.stringify((0, app_1.getTopFiveRepos)(data));
    fs.writeFileSync('./data/top_five_data.json', topFiveText);
    const sortedText = JSON.stringify((0, app_1.removeReposWithLetter)((0, app_1.sortReposAlpha)(data)));
    fs.writeFileSync('./data/sorted_alpha_data.json', sortedText);
}))();
