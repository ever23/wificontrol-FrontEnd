export default {
    horaFloat(time) {

        let tiempoSplit = time.split(":")
        return Number(tiempoSplit[0]) + (Number(tiempoSplit[1]) / 60)
    },
    calcularProgreso(tiempo, cierre) {

        let tiempoFloat = this.horaFloat(tiempo)
        let horaFloat = this.horaFloat(DateTime.now().toFormat('HH:mm'))
        let cierreFloat = this.horaFloat(cierre)
        let diferencia = cierreFloat - horaFloat;

        if (diferencia > 0) {

            return (diferencia / tiempoFloat) * 100
        }
        return 0

    },
    tiempo(equipo, hora = null) {
        let time;
        if (hora == null) {
            time = DateTime.now()
        } else {
            time = DateTime.fromFormat(hora, 'HH:mm')
        }

        let tiempoSplit = [],
            horaFloat = 0,
            apertura = time.toFormat("HH:mm");
        if (equipo.tiempo == "Indefinido") {
            tiempoSplit = ['00', '00']
            equipo.cierre = "Indefinido"
        } else {
            tiempoSplit = equipo.tiempo.split(":")
            horaFloat = Number(tiempoSplit[0]) + (Number(tiempoSplit[1]) / 60)
            // let cierre = new Date(time.getTime() + (horaFloat * 3600000))
            equipo.cierre = time.plus({
                hours: tiempoSplit[0],
                minutes: tiempoSplit[1]
            }).toFormat("HH:mm");
        }

        equipo.costo = horaFloat * 3
        equipo.apertura = apertura
        return equipo

    }
}