import Task from '../task/Task';

const tasks: Task<any>[] = [];

/**
 * Creates a new task channel.
 * @param name The name of the task.
 * @returns The task channel.
 */
export function task<MessagesType extends Object>(name: string) {
	const task = new Task<MessagesType>(name);

	tasks.push(task);
	return task;
}
