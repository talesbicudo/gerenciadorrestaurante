export default {
    filters: {
        twoDigits: number =>
            ('0' + number).slice(-2)
    }

}