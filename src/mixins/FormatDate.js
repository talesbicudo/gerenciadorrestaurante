
const twoDigits = number =>
    ('0' + number).slice(-2)

export default {
    filters: {
        date: function (date) {
            const data = new Date(date),
                dia = data.getDate().toString(),
                diaF = (dia.length === 1) ? '0' + dia : dia,
                mes = (data.getMonth() + 1).toString(),
                mesF = (mes.length === 1) ? '0' + mes : mes,
                anoF = data.getFullYear();
            return diaF + "/" + mesF + "/" + anoF;
        },
        time: function (rawDate) {
            const date = new Date(rawDate);
            return `${twoDigits(date.getHours())}:${twoDigits(date.getMinutes())}`
        }
    }
}

