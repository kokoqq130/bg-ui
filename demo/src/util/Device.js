/**
 * @Description: 设备信息方法类
 * @author 王发靖 Fajing.Wang@b-and-qchina.com
 * @date 2019/2/19
*/

import { enquireScreen } from 'enquire-js';


export default class Device {
    /**
     *  查询屏幕是否满足一定尺寸要求
     */
    static enquireScreen(cb, num) {
        const str = num ? `only screen and (max-width: ${num}px)` : null;
        return enquireScreen(cb, str);
    }
}
