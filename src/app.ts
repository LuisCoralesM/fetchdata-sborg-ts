import * as fs from 'fs';
import axios from 'axios'
import { RepoData, APIResponse } from './interfaces';

// Fetch the API url
async function fetchData(url: string): Promise<APIResponse[]> {
    const response = await axios.get(url);
    return response.data;
}

// Get the stars sum of all repos
export function getStarsSum(data: RepoData[]): number {
    return data.reduce((sum, repo) => sum + repo.stars, 0);
}

// Get the 5 latest updated repos
export function sortReposByUpdateDate(data: RepoData[]): RepoData[] {
    return data.sort((a, b) => {
        return Number(new Date(b.updated_at)) - Number(new Date(a.updated_at));
    }).slice(0, 5);
}

// Get repos with more than 5 stars
export function getReposWithFiveStars(data: RepoData[]): RepoData[] {
    return data.filter(data => data.stars > 5);
}

// Get top 5 repos with more stars
export function getTopFiveRepos(data: RepoData[]): RepoData[] {
    return data.sort((a,b) => b.stars - a.stars).slice(0,5);
}

// Sort repos alphabetically
export function sortReposAlpha(data: RepoData[]): RepoData[] {
    return data.sort((a, b) => a.repo_name.localeCompare(b.repo_name));
}

// Remove repos that starts by "h" or any passed letter
export function removeReposWithLetter(data: RepoData[], letter: string = "h"): RepoData[] {
    return data.filter(data => {
        return !(data.repo_name.toLowerCase().indexOf(letter) === 0);
    });
}

// From thedata.repo_name.toLowerCase().indexOf(letter) === 0 GitHub API response, get the needed data
export async function getRepoData(url: string): Promise<RepoData[]> {
    let urlBuilder = (page: number) => url + `?per_page=100&page=${page}`;

    async function recursiveData(page: number = 1, dataFetch: APIResponse[]): Promise<APIResponse[]> {   
        const fetchedData = await fetchData(urlBuilder(page));

        if (fetchedData.length === 0) return dataFetch;

        return recursiveData(page + 1, dataFetch.concat(fetchedData));
    }

    const fetchedData = await recursiveData(1, []);

    return fetchedData.map((repo: APIResponse): RepoData => {
        return {
            repo_name: repo.full_name.split("/")[1],
            url: repo.html_url,
            updated_at: repo.updated_at,
            stars: repo.stargazers_count
        }
    });
}

// From the mock files path (ONLY FOR TESTING TO AVOID REQUESTS LIMIT FROM API)
export function getMockedRepoData(dire: string): RepoData[] {
    let path = (page: number) => dire + page + ".json";

    function recursiveData(page: number = 1, dataFetch: RepoData[]): RepoData[] {  
        const getData = fs.readFileSync(path(page));
        const data = JSON.parse(getData.toString());

        if (data.length === 0) return dataFetch;

        return recursiveData(page + 1, dataFetch.concat(data));
    }

    return recursiveData(1, []);
}