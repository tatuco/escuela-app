const { format } = require('date-fns')

export class ScheduleService {
    static makeDays = (withHours = false) => {
        const days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes']
        return days.map((day, index) => {
            let item = {
                id: index + 1,
                day
            }
            if (withHours)
                item['hours'] = ScheduleService.makeHours()
            return item;
        })
    }

    static makeHours = () => {
        return ['06:00', '07:00', '08:00', '09:00', '09:15', '10:15', '11:15', '12:15'].map((hour, i) => {
            return {
                id: i + 1,
                hour
            }
        })
    }

    static searchDay = (id) => ScheduleService.makeDays().find(day => day.id === Number(id))

    static searchHour = (id) => ScheduleService.makeHours().find(hour => hour.id === Number(id))

    static dayOfWeek = () =>  format(new Date(), 'i')
}
