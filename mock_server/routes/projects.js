module.exports = function(app, db, config) {
  app.post("/projects", (req, res) => {
    setTimeout(() => {
      res.status(200).json(req.body);
    }, config.timeout);
  });

  app.get("/projects", (req, res) => {
    setTimeout(() => {
      let projects = [];
      for (i = 0; i < 3; i++) {
        projects.push({
          id: Math.floor(Math.random() * 1000000000000),
          picture:
            "https://picsum.photos/400/400/?image=" +
            Math.floor(Math.random() * 200),
          title: "Sela Platform Project " + i,
          description: "Sela description " + i,
          tasks: Math.floor(Math.random() * 30),
          percentage: Math.floor(Math.random() * 100)
        });
      }
      res.status(200).json(projects);
    }, config.timeout);
  });

  app.get("/project/:id/tasks", (req, res) => {
    setTimeout(() => {
      let tasks = [];
      res.status(200).json(tasks);
    }, config.timeout);
  });

  app.get("/project/:id", (req, res) => {
    setTimeout(() => {
      res.status(200).json({
        name: "K-Dere Cleanup",
        start_date: new Date("December 17, 2017 03:24:00"),
        end_date: new Date("December 17, 2018 03:24:00"),
        progress: 40,
        status: "In Progress",
        photos: [
          "https://picsum.photos/800/1000/?image=" +
            Math.floor(Math.random() * 300),
          "https://picsum.photos/800/1000/?image=" +
            Math.floor(Math.random() * 300),
          "https://picsum.photos/800/1000/?image=" +
            Math.floor(Math.random() * 300),
          "https://picsum.photos/800/1000/?image=" +
            Math.floor(Math.random() * 300),
          "https://picsum.photos/800/1000/?image=" +
            Math.floor(Math.random() * 300)
        ],
        tasks: [
          {
            name: "Survey K-Dere for buried oil",
            task_created: new Date("March 17, 2018 03:24:00"),
            deadline: new Date("December 17, 2018 03:24:00"),
            contractor_assigned: "Dotun Longe",
            status: "in-progress",
            evaluation_submissions: [
              {
                name: "Task 1",
                type: "document",
                status: "good",
                src: "http://www.pdf995.com/samples/pdf.pdf"
              },
              {
                name: "Task 2",
                type: "document",
                status: "bad",
                src: "http://www.pdf995.com/samples/pdf.pdf"
              },
              {
                name: "Task 3",
                type: "video",
                status: "bad",
                src:
                  "https://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_5mb.mp4"
              },
              {
                name: "Task 4",
                type: "video",
                status: "good",
                src:
                  "https://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_10mb.mp4"
              }
            ]
          },
          {
            name: "Cleanup Oil Spill",
            task_created: new Date("March 17, 2018 03:24:00"),
            deadline: new Date("December 17, 2018 03:24:00"),
            contractor_assigned: "Dotun Longe",
            status: "complete",
            evaluation_submissions: [
              {
                name: "Task 1",
                type: "document",
                status: "good",
                src: "http://www.pdf995.com/samples/pdf.pdf"
              },
              {
                name: "Task 2",
                type: "document",
                status: "bad",
                src: "http://www.pdf995.com/samples/pdf.pdf"
              },
              {
                name: "Task 3",
                type: "video",
                status: "bad",
                src:
                  "https://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_10mb.mp4"
              }
            ]
          },
          {
            name: "Sensitize Villagers On Waste Processing Methods",
            task_created: new Date("March 17, 2018 03:24:00"),
            deadline: new Date("December 17, 2018 03:24:00"),
            contractor_assigned: "Dotun Longe",
            status: "not-started",
            evaluation_submissions: [
              {
                name: "Task 1",
                type: "document",
                status: "good",
                src: "http://www.pdf995.com/samples/pdf.pdf"
              },
              {
                name: "Task 2",
                type: "document",
                status: "bad",
                src: "http://www.pdf995.com/samples/pdf.pdf"
              },
              {
                name: "Task 3",
                type: "video",
                status: "bad",
                src:
                  "https://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_10mb.mp4"
              }
            ]
          }
        ]
      });
    });
  });
};
