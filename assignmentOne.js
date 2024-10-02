const readline = require('readline');

// Initialize readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let todoList = [];

// Function to add a task
function addTask(task) {
    todoList.push({ task: task, completed: false });
    console.log(`Task "${task}" added!`);
}

// Function to view all tasks
function viewTasks() {
    if (todoList.length === 0) {
        console.log("Your todo list is empty.");
    } else {
        console.log("Your Todo List:");
        todoList.forEach((item, index) => {
            console.log(`${index + 1}. ${item.task} [${item.completed ? "Completed" : "Not Completed"}]`);
        });
    }
}

// Function to mark a task as complete
function completeTask(index) {
    if (index > 0 && index <= todoList.length) {
        todoList[index - 1].completed = true;
        console.log(`Task ${index} marked as completed.`);
    } else {
        console.log("Invalid task number.");
    }
}

// Simulating async behavior (e.g., saving to database)
function saveTasksAsync(callback) {
    console.log("Saving tasks...");
    setTimeout(() => {
        console.log("Tasks saved successfully.");
        callback();
    }, 2000); // 2-second delay to simulate async operation
}

// Main function to interact with the user
function mainMenu() {
    rl.question(`
Choose an option:
1. Add a task
2. View tasks
3. Complete a task
4. Exit
> `, (choice) => {
        switch (choice.trim()) {
            case '1':
                rl.question("Enter the task: ", (task) => {
                    addTask(task);
                    mainMenu(); // Go back to main menu after adding the task
                });
                break;
            case '2':
                viewTasks();
                mainMenu(); // Go back to main menu after viewing tasks
                break;
            case '3':
                rl.question("Enter the task number to mark as complete: ", (num) => {
                    completeTask(parseInt(num));
                    mainMenu(); // Go back to main menu after completing a task
                });
                break;
            case '4':
                console.log("Exiting...");
                saveTasksAsync(() => {
                    rl.close(); // End the program after saving tasks
                });
                break;
            default:
                console.log("Invalid choice. Please choose a valid option.");
                mainMenu(); // Show the menu again if the choice is invalid
        }
    });
}

// Start the application
mainMenu();

