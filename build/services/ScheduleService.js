"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { format } = require('date-fns');
class ScheduleService {
}
exports.ScheduleService = ScheduleService;
ScheduleService.makeDays = (withHours = false) => {
    const days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];
    return days.map((day, index) => {
        let item = {
            id: index + 1,
            day
        };
        if (withHours)
            item['hours'] = ScheduleService.makeHours();
        return item;
    });
};
ScheduleService.makeHours = () => {
    return ['06:00', '07:00', '08:00', '09:00', '09:15', '10:15', '11:15', '12:15'].map((hour, i) => {
        return {
            id: i + 1,
            hour
        };
    });
};
ScheduleService.searchDay = (id) => ScheduleService.makeDays().find(day => day.id === Number(id));
ScheduleService.searchHour = (id) => ScheduleService.makeHours().find(hour => hour.id === Number(id));
ScheduleService.dayOfWeek = () => format(new Date(), 'i');
//# sourceMappingURL=ScheduleService.js.map