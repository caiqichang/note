# Schedule Task

1. Configuration
```java
@Configuration
@EnableScheduling
public class ScheduleConfig {}
```

2. Task
- `@Scheduled`
  - cron --  cron expression
  - zone -- zone of cron
  - fixedDelay -- seconds between end of current and start of next
  - fixedRate -- seconds between start of each two times
  - initialDelay -- seconds delay before first time 
```java
@Scheduled
public void task() {}
```

- `ThreadPoolTaskScheduler` (recommand)
```java
@Component
public class ScheduleManage {
    // current task list
    private Map<String, ScheduledFuture<?>> currentTasks;
    // thread pool of schedule task
    private ThreadPoolTaskScheduler threadPoolTaskScheduler;

    public ScheduleManage() {
        this.currentTasks = new HashMap<>();
        this.threadPoolTaskScheduler = new ThreadPoolTaskScheduler();
        this.threadPoolTaskScheduler.initialize();
    }

    public boolean isTaskRunning(String taskId) {
        return currentTasks.containsKey(taskId);
    }

    /**
     * stop and remove task
     */
    public void removeTask(String taskId) {
        ScheduledFuture<?> scheduledFuture = currentTasks.get(taskId);
        if (scheduledFuture != null) scheduledFuture.cancel(true);
        currentTasks.remove(taskId);
    }

    /**
     * add cron task (remove first if exist)
     */
    public void addCronTask(String taskId, Runnable task, String corn) {
        if (currentTasks.containsKey(taskId)) removeTask(taskId);
        currentTasks.put(taskId, threadPoolTaskScheduler.schedule(task, new CronTrigger(corn)));
    }

    /**
     * add once task with start time (remove first if exist)
     */
    public void addOnceTask(String taskId, Runnable task, Date startTime) {
        if (currentTasks.containsKey(taskId)) removeTask(taskId);
        currentTasks.put(taskId, threadPoolTaskScheduler.schedule(task, startTime));
    }

    /**
     * add fixed rate task (remove first if exist)
     * @param period seconds between each start of two times
     */
    public void addFixedRateTask(String taskId, Runnable task, long period) {
        if (currentTasks.containsKey(taskId)) removeTask(taskId);
        currentTasks.put(taskId, threadPoolTaskScheduler.scheduleAtFixedRate(task, period));
    }

    /**
     * add fixed rate task with start time (remove first if exist)
     * @param period seconds between each start of two times
     */
    public void addFixedRateTask(String taskId, Runnable task, long period, Date startTime) {
        if (currentTasks.containsKey(taskId)) removeTask(taskId);
        currentTasks.put(taskId, threadPoolTaskScheduler.scheduleAtFixedRate(task, startTime, period));
    }

    /**
     * add fixed delay task (remove first if exist)
     * @param period seconds between end of current and start of next
     */
    public void addFixedDelayTask(String taskId, Runnable task, long period) {
        if (currentTasks.containsKey(taskId)) removeTask(taskId);
        currentTasks.put(taskId, threadPoolTaskScheduler.scheduleWithFixedDelay(task, period));
    }

    /**
     * add fixed rate task with start time (remove first if exist)
     * @param period seconds between end of current and start of next
     */
    public void addFixedDelayTask(String taskId, Runnable task, long period, Date startTime) {
        if (currentTasks.containsKey(taskId)) removeTask(taskId);
        currentTasks.put(taskId, threadPoolTaskScheduler.scheduleWithFixedDelay(task, startTime, period));
    }
}
```