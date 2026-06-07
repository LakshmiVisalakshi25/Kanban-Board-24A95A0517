const cron = require(
  "node-cron"
);

const Task = require(
  "../models/Task"
);

const User = require(
  "../models/User"
);

const {
  sendReminder,
} = require("../utils/emailService");

cron.schedule(
  "0 9 * * *",
  async () => {
    console.log(
      "Checking reminders..."
    );

    const tasks =
      await Task.find({
        status: {
          $ne: "done",
        },
      }).populate(
        "assignee"
      );

    const today =
      new Date();

    for (const task of tasks) {
      if (
        !task.dueDate ||
        !task.assignee
      )
        continue;

      const diff =
        Math.ceil(
          (new Date(
            task.dueDate
          ) -
            today) /
            (1000 *
              60 *
              60 *
              24)
        );

      if (diff === 5) {
        await sendReminder(
          task.assignee
            .email,

          task,

          diff
        );
      }
    }
  }
);