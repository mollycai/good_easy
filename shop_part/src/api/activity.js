/**
 * 活动信息相关的接口模块
 */
import mockRequests from './mockRequest';

// 获取活动列表的数据
export const reqActivityList = () => mockRequests.get('/activity');