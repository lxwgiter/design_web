// src/eventBus.js
import mitt from 'mitt';

const eventBus = mitt(); // 创建事件总线实例

export default eventBus; // 导出事件总线实例