import { getRepoData, getReposWithFiveStars, getStarsSum, sortReposByUpdateDate, removeReposWithLetter, getTopFiveRepos, sortReposAlpha, getMockedRepoData } from "./app";
import * as fs from 'fs';

const url: string = "https://api.github.com/orgs/stackbuilders/repos";
const mockPath: string = "./data/mock/3_entries/data"; // To avoid requests limit timers using getMockedRepoData function

(async () => {
    const data = await getRepoData(url);

    // Write whole data json
    const wholeDataText = JSON.stringify(data);
    fs.writeFileSync('./data/whole_data.json', wholeDataText);

    // Write only the 5 repos (5)
    const updatedRecentlyText = JSON.stringify(sortReposByUpdateDate(data));
    fs.writeFileSync('./data/sorted_by_update_data.json', updatedRecentlyText);

    // Write only repos with more than 5 stars
    const fiveStarsText = JSON.stringify(getReposWithFiveStars(data));
    fs.writeFileSync('./data/five_stars_data.json', fiveStarsText);

    // Write only the total stars
    fs.writeFileSync('./data/stars_sum.txt', getStarsSum(data).toString());

    // Write only top five repos with more stars
    const topFiveText = JSON.stringify(getTopFiveRepos(data));
    fs.writeFileSync('./data/top_five_data.json', topFiveText);

    // Write only repos sorted by alpha and no repo that starts with "h"
    const sortedText = JSON.stringify(removeReposWithLetter(sortReposAlpha(data)));
    fs.writeFileSync('./data/sorted_alpha_data.json', sortedText);
})();