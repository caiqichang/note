# Spring Boot 定时任务

## 1. 启动定时任务
```java
@Configuration
@EnableScheduling
public class ScheduleConfig {}
```

## 2. 注解定义定时任务
```java
// cron cron表达式
// zone cron的时区
// fixedDelay 本次结束和下一次开始的时间间隔，单位毫秒
// fixedRate 本次开始和下一次开始的时间间隔，单位毫秒
// initialDelay 初始延迟，单位毫秒
@Scheduled
public void task() {}
```

## 3. 通常使用线程池管理定时任务
```java
@Component
public class ScheduleManage {
    // 当前运行的定时任务列表
    private Map<String, ScheduledFuture<?>> currentTasks;
    // 定时任务线程池
    private ThreadPoolTaskScheduler threadPoolTaskScheduler;

    public ScheduleManage() {
        this.currentTasks = new HashMap<>();
        this.threadPoolTaskScheduler = new ThreadPoolTaskScheduler();
        this.threadPoolTaskScheduler.initialize();
    }

    /**
     * 定时任务是否正在运行
     *
     * @param taskId 任务id
     * @return true-是，false-否
     */
    public boolean isTaskRunning(String taskId) {
        return currentTasks.containsKey(taskId);
    }

    /**
     * 停止并移除定时任务
     *
     * @param taskId 任务id
     */
    public void removeTask(String taskId) {
        ScheduledFuture<?> scheduledFuture = currentTasks.get(taskId);
        if (scheduledFuture != null) scheduledFuture.cancel(true);
        currentTasks.remove(taskId);
    }

    /**
     * 添加cron任务，若任务存在，会先停止并移除旧任务
     *
     * @param taskId 任务id
     * @param task   任务
     * @param corn   cron表达式
     */
    public void addCronTask(String taskId, Runnable task, String corn) {
        if (currentTasks.containsKey(taskId)) removeTask(taskId);
        currentTasks.put(taskId, threadPoolTaskScheduler.schedule(task, new CronTrigger(corn)));
    }

    /**
     * 添加单次任务，若任务存在，会先停止并移除旧任务
     *
     * @param taskId    任务id
     * @param task      任务
     * @param startTime 开始时间
     */
    public void addOnceTask(String taskId, Runnable task, Date startTime) {
        if (currentTasks.containsKey(taskId)) removeTask(taskId);
        currentTasks.put(taskId, threadPoolTaskScheduler.schedule(task, startTime));
    }

    /**
     * 添加从startTime开始，每period毫秒执行的任务，若任务存在，会先停止并移除旧任务
     *
     * @param taskId    任务id
     * @param task      任务
     * @param startTime 开始时间
     * @param period    间隔时间，单位毫秒
     */
    public void addFixedRateTask(String taskId, Runnable task, Date startTime, long period) {
        if (currentTasks.containsKey(taskId)) removeTask(taskId);
        currentTasks.put(taskId, threadPoolTaskScheduler.scheduleAtFixedRate(task, startTime, period));
    }

    /**
     * 添加每period毫秒执行的任务，若任务存在，会先停止并移除旧任务
     *
     * @param taskId 任务id
     * @param task   任务
     * @param period 间隔时间，单位毫秒
     */
    public void addFixedRateTask(String taskId, Runnable task, long period) {
        if (currentTasks.containsKey(taskId)) removeTask(taskId);
        currentTasks.put(taskId, threadPoolTaskScheduler.scheduleAtFixedRate(task, period));
    }

    /**
     * 添加从startTime开始，每period毫秒（本次结束到下次开始）执行的任务，若任务存在，会先停止并移除旧任务
     *
     * @param taskId    任务id
     * @param task      任务
     * @param startTime 开始时间
     * @param period    间隔时间，单位毫秒
     */
    public void addFixedDelayTask(String taskId, Runnable task, Date startTime, long period) {
        if (currentTasks.containsKey(taskId)) removeTask(taskId);
        currentTasks.put(taskId, threadPoolTaskScheduler.scheduleWithFixedDelay(task, startTime, period));
    }

    /**
     * 添加每period毫秒（本次结束到下次开始）执行的任务，若任务存在，会先停止并移除旧任务
     *
     * @param taskId 任务id
     * @param task   任务
     * @param period 间隔时间，单位毫秒
     */
    public void addFixedDelayTask(String taskId, Runnable task, long period) {
        if (currentTasks.containsKey(taskId)) removeTask(taskId);
        currentTasks.put(taskId, threadPoolTaskScheduler.scheduleWithFixedDelay(task, period));
    }
}
```