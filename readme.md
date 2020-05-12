# node logger

    import Logger from 'better-loger';
    import FileAppender from 'better-loger/file_appender';
    import ConsoleAppender from 'better-loger/console_appender';

    // 日志输出到文件,配置logrotate:
    const fileAppender = new FileAppender({
      // 标准输出目标
      locate: 'access.log',
      // 错误输出目标
      errorLocate: 'error.log',
      // rotate保留最多3个文件
      keepLogNum: 3,
      // 每天做一次rotate
      rotateInterval: 24 * 60 * 60 * 1000,
      // 当使用级别>=info时候,才输出到文件
      threshold: 'info',
      // 做rotate的最小大小:200Mb
      thresholdSize: 200 * 1024 * 1024,
    });

    // 输出到console
    const consoleAppender = new ConsoleAppender({
      threshold: 'debug'
    });

    // 获取logger对象,唯一key,默认集成了consoleAppender
    const logger = Logger.get('uniqId');
    // 设置日志等级,当方法等级超过设置的等级且超过了appender等级,才会输出
    logger.setLevel('debug')
    // 设置appender为console
    logger.setAppender(consoleAppender);
    // 添加文件appender
    logger.addAppender(fileAppender);

    // 使用默认模板
    logger.debug('这是一条debug消息');
    // 自定义模板,用来记录访问日志
    // %e表示logger实例化时候时间,%i表示实例化时候生成的6位随机id,n表示从实例化到当前过了多少毫秒
    // 全部定义见formatter.help(方法)
    logger.info(`%e|%i|%4m|%60m|%7m|%5n`, [
      'GET',
      'http://www.yourdomain.com/path',
      'success',
    ]);
