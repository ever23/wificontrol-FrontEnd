import beep from '../audio/beep.mp3'
var audio = new Audio(beep);
const Toast = Swal.mixin({
	toast: true,
	position: 'top-end',
	showConfirmButton: false,
	timer: 5000,
	timerProgressBar: true,
	didOpen: (toast) => {
		toast.addEventListener('mouseenter', Swal.stopTimer)
		toast.addEventListener('mouseleave', Swal.resumeTimer)
	}
})


export default function (info, type) {
	setTimeout(()=>audio.play(), 0);

	Toast.fire(info,type)
	
	//return $.notify(info,type);
}
