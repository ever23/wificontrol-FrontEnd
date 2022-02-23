export default function calcularTraferencia(datos) {
    let numberFormat = new Intl.NumberFormat('en-EN', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
    })
    if (datos < 1024) {
        return datos + " B/s"
    } else if (datos < 1000000) {
        return numberFormat.format(datos / 1024) + " KB/s"
    } else {
        return numberFormat.format(datos / 1000000) + " MB/s"
    }
}