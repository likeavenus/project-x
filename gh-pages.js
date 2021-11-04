const ghpages = require('gh-pages');
const NAME = 'project-x'; // repo name
const repositoryUrl = `https://github.com/likeavenus/${NAME}`; // Адрес репозитория, в который вы хотите сделать деплой, например: https://github.com/likeavenus/portfolio

ghpages.publish('build', {
    branch: 'gh-pages',
    repo: repositoryUrl
}, ()=> { console.log('Deploy is successful') });