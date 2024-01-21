import { Todo } from "@/types/todo";
import { Component } from "react";

type TabListItemProps = Todo & {
    onChangeStatus: (todoId: string) => void;
};
type TabListItemState = {
    todo: Todo;
};

export class TabListItem extends Component<TabListItemProps, TabListItemState> {
    constructor(props: TabListItemProps) {
        super(props);
        this.state = {
            todo: {} as Todo,
        };
    }

    componentDidMount() {
        const { todoId, todoContent, status } = this.props;

        this.setState({ todo: { todoId, todoContent, status } });
    }

    render() {
        const { todoId, todoContent, status } = this.state.todo;
        const { onChangeStatus } = this.props;

        return (
            <li data-todo-id={todoId} className="flex flex-col gap-4">
                <div className="flex gap-4">
                    <input
                        type="checkbox"
                        checked={status === "COMPLETED"}
                        onChange={() => {
                            onChangeStatus(todoId);
                            this.setState({
                                todo: {
                                    ...this.state.todo,
                                    status:
                                        this.state.todo.status === "ACTIVE"
                                            ? "COMPLETED"
                                            : "ACTIVE",
                                },
                            });
                        }}
                    />
                    <p>{todoContent}</p>
                </div>
                <div className="flex gap-4">
                    <button
                        title={todoContent}
                        data-edit
                        className="bg-slate-700 w-40 truncate p-2 rounded"
                    >
                        Edit {todoContent}
                    </button>
                    <button
                        title={todoContent}
                        data-remove
                        className="bg-slate-700 w-40 truncate p-2 rounded"
                    >
                        Delete <span>{todoContent}</span>
                    </button>
                </div>
            </li>
        );
    }
}
