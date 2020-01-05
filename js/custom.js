const graphOptions = {
    author: "ATAlgaba <atalgaba@gmail.com>"
};

const slides = {};

Reveal.addEventListener('first-slide', () => {
    console.log("Starting first-slide");
    initPresentation();
});

Reveal.addEventListener('git-history', () => {
    console.log("Starting git-history");
    gitHistory();
});

const refreshLayout = () => {
    setTimeout(() => {
        Reveal.layout();
    }, 5);
};

const gitAdd = (callback, timeout = 1000) => {
    return new Promise(resolve => {
        setTimeout(() => {
            callback();
            refreshLayout();
            resolve();
        }, timeout);
    });
};


const initPresentation = () => {
    if (!initPresentation.rendered) {
        const customGraphOptions = {
            orientation: "vertical-reverse"
        };

        const graphContainer = document.getElementById("first-slide");
        const gitgraph = GitgraphJS.createGitgraph(graphContainer, Object.assign({}, graphOptions, customGraphOptions));

        const master = gitgraph.branch("master");

        master.commit("Initial commit");
        refreshLayout();

        setTimeout(() => {
            master.commit("Start presentation");
            refreshLayout();

            setTimeout(() => {
                master.commit({
                    subject: "Questions",
                    dotText: "❤️"
                });
                refreshLayout();
            }, 1000);
        }, 1000);
        initPresentation.rendered = true;
    }
};

const gitHistory = () => {
    if (!gitHistory.rendered) {
        const customGraphOptions = {
            orientation: "vertical"
        };

        const graphContainer = document.getElementById("git-history");
        const gitgraph = GitgraphJS.createGitgraph(graphContainer, Object.assign({}, graphOptions, customGraphOptions));

        const master = gitgraph.branch("master");
        const ex1 = gitgraph.branch("excercise-one");
        const ex2 = gitgraph.branch("excercise-two");

        master.commit("Initial commit");

        ex1.merge(master);

        refreshLayout();

        gitAdd(() => {
            ex1.commit("Solve Excercise #1")
        })
            .then(() => gitAdd(() => {
                master.merge(ex1)
                ex2.merge(master);
                ex2.commit("Start Excercise #2")
            }))
            .then(() => gitAdd(() => ex2.commit("Solve Excercise #2")))
            .then(() => gitAdd(() => master.merge(ex2)));

        gitHistory.rendered = true;
    }
};
