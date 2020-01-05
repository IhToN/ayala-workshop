const graphOptions = {
    author: "ATAlgaba <atalgaba@gmail.com>"
};

Reveal.addEventListener('first-slide', () => {
    initPresentation();
});


const initPresentation = () => {
    if (!this.rendered) {
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
        this.rendered = true;
    }
};


const refreshLayout = () => {
    setTimeout(() => {
        Reveal.layout();
    }, 5);
};
