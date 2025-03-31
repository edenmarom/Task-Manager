import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksComponent } from './tasks.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { selectTasks } from '../../state/selectors/tasks.selectors';
import { TasksApiActions } from '../../state/actions/tasks.actions';
import { Task } from '../../interfaces/task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let store: MockStore;
  let mockTasks: Task[];

  beforeEach(async () => {
    mockTasks = [
      { _id: '1', title: 'Task 1', status: 'To Do', description: 'a' },
      { _id: '2', title: 'Task 2', status: 'In Progress', description: 'b' },
      { _id: '3', title: 'Task 3', status: 'Done', description: 'c' },
    ];

    await TestBed.configureTestingModule({
        imports: [CommonModule, FormsModule, TasksComponent, HttpClientTestingModule],
        providers: [
          provideMockStore({
            selectors: [{ selector: selectTasks, value: mockTasks }],
          }),
          TasksService,
        ],
      }).compileComponents();
    });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadTasks on init', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(TasksApiActions.loadTasks());
  });

  it('should filter tasks correctly', (done) => {
    component.toDoTasks$.subscribe((tasks) => {
      expect(tasks.length).toBe(1);
      expect(tasks[0].status).toBe('To Do');
    });

    component.inProgressTasks$.subscribe((tasks) => {
      expect(tasks.length).toBe(1);
      expect(tasks[0].status).toBe('In Progress');
    });

    component.doneTasks$.subscribe((tasks) => {
      expect(tasks.length).toBe(1);
      expect(tasks[0].status).toBe('Done');
      done();
    });
  });

  it('should open and close edit modal', () => {
    const taskToEdit = mockTasks[0];
    component.openEditModal(taskToEdit);
    expect(component.selectedTask).toEqual(taskToEdit);
    expect(component.isEditModalOpen).toBeTruthy();

    component.closeEditModal();
    expect(component.selectedTask).toBeNull();
    expect(component.isEditModalOpen).toBeFalsy();
  });

  it('should dispatch updateTask action on save', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.selectedTask = mockTasks[0];

    component.saveEditedTask();
    expect(dispatchSpy).toHaveBeenCalledWith(
      TasksApiActions.updateTask({ updatedTask: mockTasks[0] })
    );
  });

  it('should dispatch deleteTask action', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.deleteTask(mockTasks[0]);

    expect(dispatchSpy).toHaveBeenCalledWith(
      TasksApiActions.deleteTask({ taskId: mockTasks[0]._id })
    );
  });
});
