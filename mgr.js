define(["managerAPI"], function (Manager) {
  let API = new Manager();

  API.setName("mgr");
  API.addSettings("skip", false);

  // Define the tasks
  API.addTasksSet({
    iat: [
      {
        type: "time",
        name: "iat",
        scriptUrl: "careeriat.js",
      },
    ],

    score: [
      {
        type: "time",
        name: "score",
        scriptUrl: "score.js",
      },
    ],
  });

  // Define the sequence of tasks
  API.addSequence([{ inherit: "iat" }, { inherit: "score" }]);

  return API.script;
});
