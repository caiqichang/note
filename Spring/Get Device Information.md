# Get Device Information

Reference to Spring Boot Actuator.

```java
@Controller
@RequestMapping("/appInfo")
public class AppInfoController {
    private static final Logger logger = LoggerFactory.getLogger(AppInfoController.class);

    private static final SimpleDateFormat yyyyMMddHHmm = new SimpleDateFormat("yyyy-MM-dd HH:mm");

    private static final BigDecimal gb = new BigDecimal(1024 * 1024 * 1024);

    @Value("${build-time}")
    private String buildTime;

    @Autowired
    private DataSource dataSource;
    @Value("${spring.datasource.url}")
    private String spring_datasource_url;

    @GetMapping
    @ResponseBody
    public ResponseEntity<String> state() {
        Map<String, String> infoMap = new LinkedHashMap<>();

        String pidAndDeviceName = ManagementFactory.getRuntimeMXBean().getName();
        if (StringUtils.hasText(pidAndDeviceName)) {
            String[] temp = pidAndDeviceName.split("@");
            infoMap.put("pid", temp[0]);
            if (temp.length > 1) infoMap.put("Device Name", temp[1]);
        }

        // Get information of each disk.
//        FileSystems.getDefault().getRootDirectories().forEach(root -> {
//            try {
//                FileStore fileStore = Files.getFileStore(root);
//                logger.info("Disk Symbol: {}", root);
//                logger.info("Disk Name: {}", fileStore.name());
//                logger.info("Disk Type: {}", fileStore.type());
//                logger.info("Readonly: {}", fileStore.isReadOnly());
//                logger.info("Total: {}", fileStore.getTotalSpace());
//                logger.info("Usable:  {}", fileStore.getUsableSpace());
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//        });
        try {
            Path path = new File(".").toPath();
            FileStore fileStore = Files.getFileStore(path);
            infoMap.put("Disk Type", fileStore.type());
            infoMap.put("Disk Readonly", fileStore.isReadOnly() ? "Yes" : "No");
            infoMap.put("Disk Total", BigDecimal.valueOf(fileStore.getTotalSpace()).divide(gb).setScale(2, RoundingMode.HALF_UP) + " GB");
            infoMap.put("Disk Usable", BigDecimal.valueOf(fileStore.getUsableSpace()).divide(gb).setScale(2, RoundingMode.HALF_UP) + " GB");
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Because OperatingSystemMXBean is included in com.sun.management, it may disable in some system (like Android) or higer version of java. 
        OperatingSystemMXBean os = (OperatingSystemMXBean) ManagementFactory.getOperatingSystemMXBean();
        infoMap.put("Memory Total", BigDecimal.valueOf(os.getTotalPhysicalMemorySize()).divide(gb).setScale(2, RoundingMode.HALF_UP) + " GB");
        infoMap.put("Memory Usable", BigDecimal.valueOf(os.getFreePhysicalMemorySize()).divide(gb).setScale(2, RoundingMode.HALF_UP) + " GB");
        infoMap.put("CPU Rate", BigDecimal.valueOf(os.getSystemCpuLoad() * 100).setScale(2, RoundingMode.HALF_UP) + " %");

        infoMap.put("Project Loacation", new File("").getAbsolutePath());

        // Reference to DataSourceHealthIndicator of Spring Boot Actuator.
        infoMap.put("Database URL", spring_datasource_url);
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        Boolean isDbValid = jdbcTemplate.execute((ConnectionCallback<Boolean>) connection ->  {
            infoMap.put("Database Name", connection.getMetaData().getDatabaseProductName());
            infoMap.put("Database Version", connection.getMetaData().getDatabaseProductVersion());
            return connection.isValid(0);
        });
        infoMap.put("Database Status", Optional.ofNullable(isDbValid).orElse(false) ? "Enable" : "Disable");

        infoMap.put("Server Time", yyyyMMddHHmm.format(new Date()));

        StringBuilder infoStr = new StringBuilder();
        infoMap.forEach((k, v) -> {
            infoStr.append(k).append(": ").append(v).append("\n");
        });

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set(HttpHeaders.CONTENT_TYPE, "text/plain;charset=UTF-8");
        return ResponseEntity.ok()
                .headers(responseHeaders)
                .body(infoStr.toString());
    }
}
```

