app.post('/dev/apply', async (request, response) => {
    const { dev } = request.query;
    const application = await applyDevAsync(dev);
    response.json(application.problemIsSolved);
});

// Perhaps?

const context = Promise.createContext('express-apply-dev')

app.post('/dev/apply', context.wrap(async (request, response) => {
    const { dev } = request.query;
    const application = await applyDevAsync(dev);
    response.json(application.problemIsSolved);
}));

console.log(context.pending); // [Promise, Promise, Promise]